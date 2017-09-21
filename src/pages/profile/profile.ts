import { Http } from '@angular/http';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ToastController, LoadingController,ModalController, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  loading:any;
  visiblePass:boolean = false;
  user_detail:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toast: ToastController,
    public laravel: LaravelProvider,
    public loadingCtrl: LoadingController,
    public http: Http,
    public modalCtrl: ModalController,
    public storage: Storage
  ) {
  }
  openProfileImage() {
    let profileimage = this.modalCtrl.create('ProfileimagePage');
    profileimage.present();
  }
  openPersonal() {
    let personalModal = this.modalCtrl.create('PersonaldetailPage');
    personalModal.present();
  }
  
  openAddress() {
    let addressModal = this.modalCtrl.create('AddressdetailPage');
    addressModal.present();
  }
  openFamily() {
    let familyModal = this.modalCtrl.create('FamilydetailPage');
    familyModal.present();
  }
  ionViewDidLoad() {
    }
    goToLoginPage(){
      this.storage.remove('surakshadal_userTokenInfo')
      this.navCtrl.setRoot('LoginPage')
      window.location.reload(true)
    }
}
