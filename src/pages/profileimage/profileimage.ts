import {IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { Camera } from '@ionic-native/camera';
import { Http } from '@angular/http';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
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
    public viewCtrl: ViewController,
    public toast: ToastController,
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
  takepicture() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose your Profile Picture',
      buttons: [
        {
          text: 'Choose from gallery',
          role: 'destructive',
          handler: () => {
             this.openGallery();
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Take a photo',
          handler: () => {
             this.onCamera()
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
    var options = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      saveToPhotoAlbum:true
    };
    this.camera.getPicture(options).then((imageData)=>{
      this.uploadImage(imageData);
    },(err) => {
      this.toast.create({
        message: 'Something went wrong. Please contact your app developer',
        duration:3000
      });
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
      fileKey: 'photo',
      fileName: 'logo.jpg',
      headers:{'Authorization':token},
      chunkedMode: false,
    }
    fileTransfer.upload(fileUrl, this.laravel.getProfileImageApi(), options1)
    .then((data)=> {
      this.loading.dismiss();
      let response = JSON.parse(data.response);
      if(response.success){
        // this.addrequestForm.controls.requestimg.setValue(response.filename);
        // this.requestimg = this.laravel.getProflieImagePath(response.filename);
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
