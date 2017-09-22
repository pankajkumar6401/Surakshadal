import { Http,Headers } from '@angular/http';
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
  ionViewDidLoad() {
     this.loading = this.loadingCtrl.create({
      content: 'Please Wait'
    });
    this.loading.present();
      let headers = new Headers();
      let token:string = this.laravel.getToken();
      console.log(token);
      headers.append('Authorization', token);
      this.http.get(this.laravel.getProfileDetailApi(),{
        headers: headers
      })
      .subscribe(res => {
         this.loading.dismiss();
         this.user_detail = res.json();

      },
      error => {
        this.loading.dismiss();
        // let errorMsg = 'Something went wrong. Please contact your app developer';
        // this.toast.create({
        //   message: (error.hasOwnProperty('message')) ? error.message:errorMsg ,
        //   duration:3000
        // }).present();
      });
    }
    goToLoginPage(){
      this.storage.remove('surakshadal_userTokenInfo')
      this.navCtrl.setRoot('LoginPage')
      window.location.reload(true)
    }
      openProfileImage() {
        let profileimage = this.modalCtrl.create('ProfileimagePage');
        profileimage.present();
      }
      openPersonal() {
        let personalModal = this.modalCtrl.create('PersonaldetailPage',{userDetailsData:this.user_detail['user_detail']});
        personalModal.present();
      }
      
      openAddress() {
        let addressModal = this.modalCtrl.create('AddressdetailPage',{userAddressData:this.user_detail['user_detail'],states:this.user_detail.states,districts:this.user_detail.districts,tehsils:this.user_detail.tehsils});
        addressModal.present();
      }
      openFamily() {
        let familyModal = this.modalCtrl.create('FamilydetailPage',{userFamilyData:this.user_detail['user_detail']});
        familyModal.present();
      }
}
