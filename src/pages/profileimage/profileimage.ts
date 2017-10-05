import {IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http, Headers } from '@angular/http';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs/Subscription';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
/**
 * Generated class for the ProfileimagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profileimage',
  templateUrl: 'profileimage.html',
})
export class ProfileimagePage {
  profilepictureForm:any;
  image:any;
  user_detail:any;
  loading:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera:Camera, public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController, private storage: Storage,
    public toast: ToastController,
    private formBuilder: FormBuilder, 
    public laravel: LaravelProvider,
    public http: Http,private transfer: FileTransfer ) {
    this.user_detail= navParams.get('profileimageData');
    console.log(JSON.stringify(this.user_detail));
    // this.profilepictureForm = this.formBuilder.group({
    //   photo:['', Validators.required]});
  }

  ionViewDidLoad() {
    // this.user_detail.photo.setValue(this.user_detail.photo);
    console.log('ionViewDidLoad ProfileimagePage');
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose your Profile Picture',
      buttons: [
        {
          text: 'Choose from gallery',
          role: 'destructive',
          handler: () => {
             // this.openGallery();
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Take a photo',
          handler: () => {
            //  this.onCamera()
            console.log('Archive clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }
  onCamera(){
      const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image=base64Image;
    }, (err) => {
      // Handle error
    });
  }
  openGallery() {
    var options = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI
    };
    this.camera.getPicture(options).then((imageData) => {
      this.uploadImage(imageData);
    },(err) => {
      this.toast.create({
        message: 'Something went wrong. Please contact your app developer',
        duration:3000
      });
    });
  }
 
   uploadImage(fileUrl) {
    this.loading = this.loadingCtrl.create({
      content: 'Uploading File..'
    });
    this.loading.present();
    let token:string = this.laravel.getToken();
    const fileTransfer: FileTransferObject  = this.transfer.create();
    let options1: FileUploadOptions = {
      fileKey: 'image_upload_file',
      fileName: 'logo.jpg',
      headers:{'Authorization':token},
      chunkedMode: false,
    }
    fileTransfer.upload(fileUrl, this.laravel.getMemberApi(), options1)
    .then((data)=> {
      this.loading.dismiss();
      let response = JSON.parse(data.response);
      if(response.success){
        // this.addrequestForm.controls.requestimg.setValue(response.filename);
        // this.requestimg = this.laravel.getImageUrl(response.filename);
      }else{
        this.toast.create({
          message: 'Sorry we are experiencing some issue while uploading logo. Please contact your app developer',
          duration:3000
        });  
      }
    },(err) => {
      this.loading.dismiss();
      this.toast.create({
        message: 'Something went wrong. Please contact your app developer',
        duration:3000
      });
    });
  }
 
}
