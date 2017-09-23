import {IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http, Headers } from '@angular/http';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs/Subscription';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera:Camera, public actionSheetCtrl: ActionSheetController,public viewCtrl: ViewController, private storage: Storage,
    public toast: ToastController,
    private formBuilder: FormBuilder, 
    public laravel: LaravelProvider,
    public loadingCtrl: LoadingController,
    public http: Http, ) {
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
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Take a photo',
          handler: () => {
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
