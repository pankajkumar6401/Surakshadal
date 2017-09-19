import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ViewController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  image:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private camera:Camera, public actionSheetCtrl: ActionSheetController,public viewCtrl: ViewController, ) {
  }
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
  ionViewDidLoad() {
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
