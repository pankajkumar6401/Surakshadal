import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ActionSheetController, } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http, Headers } from '@angular/http';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

/**
 * Generated class for the AddrequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addrequest',
  templateUrl: 'addrequest.html',
})
export class AddrequestPage {
   image:any;
   addrequestForm:any;
   types:any;
   submitAttempt: boolean = false;
   loading:any;
   name:any;
   photo:any;
   user_detail:any;
   tehsil_name:any;
   district_name:any;
   state_name:any;
   userdetails=[];
   requestimg: string = 'assets/images/add-icon.png';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera:Camera, 
    // private transfer: FileTransfer,
    public actionSheetCtrl: ActionSheetController,
    public toast: ToastController,
    private formBuilder: FormBuilder,
    public laravel: LaravelProvider,
    public loadingCtrl: LoadingController,
    public http: Http,
    private storage: Storage) {
      this.addrequestForm =this.formBuilder.group({
        type: ['',Validators.required],
        message: ['',Validators.required],
        requestimg:['']
      });
  }
  ionViewDidLoad() {
    let headers = new Headers();
    let token:string = this.laravel.getToken();
    headers.append('Authorization', token);

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    /*Ajax Request to get Request Types*/
    this.http.get(this.laravel.getRequestType(),{
      headers: headers
    })
    .subscribe(res => {
      this.types= res.json();
    });

    this.storage.get('surakshadal_userDetails').then(userdetails => {         
      this.loading.dismiss();
      this.userdetails = userdetails;
       },error=>{
      this.loading.dismiss();
    });
    console.log('ionViewDidLoad AddrequestPage');
  }
  elementChanged(input){
    let field = input.ngControl.name;
    this[field + "Changed"] = true;
  }
  addreq(){
    this.submitAttempt = true;
    console.log(this.addrequestForm);
    if(this.addrequestForm.valid){
      let data = {
        'type': this.addrequestForm.controls.type.value,
        'message': this.addrequestForm.controls.message.value,
        requestimg: (this.requestimg == 'assets/images/no_image_available.png')? '': this.requestimg
      }
      let headers = new Headers();
      let token:string = this.laravel.getToken();
      console.log(token);
      headers.append('Authorization', token);
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();
      this.http.post(this.laravel.getAddRequestApi(),data,{
        headers: headers
      }).map(res => res.json())
      .subscribe(res => {
        //success
        // this.navCtrl.setRoot('HomePage');
        this.loading.dismiss();
        if(res.success){
        
          this.navCtrl.setRoot('HomePage');
        }else{
          this.toast.create({
            message: 'Something went wrong. Please contact your app developer' ,
            duration:3000
          }).present();
        }
      },
      error => {
        this.loading.dismiss();
        let errorMsg = 'Something went wrong. Please contact your app developer';
        this.toast.create({
          message: (error.hasOwnProperty('message')) ? error.message:errorMsg ,
          duration:3000
        }).present();
      });
    }

  }
  takepictue() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Images',
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
  // openGallery() {
  //   var options = {
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     destinationType: this.camera.DestinationType.FILE_URI
  //   };
  //   this.camera.getPicture(options).then((imageData) => {
  //     this.uploadImage(imageData);
  //   },(err) => {
  //     this.toast.create({
  //       message: 'Something went wrong. Please contact your app developer',
  //       duration:3000
  //     });
  //   });
  // }
 
  //  uploadImage(fileUrl) {
  //   this.loading = this.loadingCtrl.create({
  //     content: 'Uploading File..'
  //   });
  //   this.loading.present();
  //   let token:string = this.laravel.getToken();
  //   const fileTransfer: FileTransferObject  = this.transfer.create();
  //   let options1: FileUploadOptions = {
  //     fileKey: 'image_upload_file',
  //     fileName: 'logo.jpg',
  //     headers:{'Authorization':token},
  //     chunkedMode: false,
  //   }
  //   fileTransfer.upload(fileUrl, this.laravel.(), options1)
  //   .then((data)=> {
  //     this.loading.dismiss();
  //     let response = JSON.parse(data.response);
  //     if(response.success){
  //       this.addrequestForm.controls.requestimg.setValue(response.filename);
  //       // this.requestimg = this.laravel.getImageUrl(response.filename);
  //     }else{
  //       this.toast.create({
  //         message: 'Sorry we are experiencing some issue while uploading logo. Please contact your app developer',
  //         duration:3000
  //       });  
  //     }
  //   },(err) => {
  //     this.loading.dismiss();
  //     this.toast.create({
  //       message: 'Something went wrong. Please contact your app developer',
  //       duration:3000
  //     });
  //   });
  // }

}
