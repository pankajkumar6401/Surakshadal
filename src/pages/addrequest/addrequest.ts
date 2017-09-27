import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ActionSheetController, } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http, Headers } from '@angular/http';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera:Camera, 
    public actionSheetCtrl: ActionSheetController,
    public toast: ToastController,
    private formBuilder: FormBuilder,
    public laravel: LaravelProvider,
    public loadingCtrl: LoadingController,
    public http: Http,
    private storage: Storage) {

      this.addrequestForm =this.formBuilder.group({
        type: ['',Validators.required],
        message: ['',Validators.required]
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

    this.http.get(this.laravel.getRequestType(),{
      headers: headers
    })
    .subscribe(res => {
      // console.log(res.json());
      this.loading.dismiss();
      this.types= res.json();
    });
    this.http.get(this.laravel.getProfileDetailApi(),{
      headers: headers
    })
    .subscribe(res => {
       this.loading.dismiss();
       this.user_detail = res.json();
       localStorage['name']=this.user_detail['user_detail'].first_name;
       localStorage['photo']=this.user_detail['user_detail'].photo;
       localStorage['tehsil_name']=this.user_detail['user_detail'].tehsil_name;
       localStorage['district_name']=this.user_detail['user_detail'].district_name;
       localStorage['state_name']=this.user_detail['user_detail'].state_name;
        this.photo=localStorage['photo'];
        this.name=localStorage['name'];
        this.tehsil_name=localStorage['tehsil_name'];
        this.district_name=localStorage['district_name'];
        this.state_name=localStorage['state_name'];
    //  +' '+this.user_detail['user_detail'].middle_name+' '+this.user_detail['user_detail'].last_name
    },
    error => {
      this.loading.dismiss();
      // let errorMsg = 'Something went wrong. Please contact your app developer';
      // this.toast.create({
      //   message: (error.hasOwnProperty('message')) ? error.message:errorMsg ,
      //   duration:3000
      // }).present();
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
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Images',
      buttons: [
        {
          text: 'Choose from gallery',
          role: 'destructive',
          handler: () => {
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
  

}
