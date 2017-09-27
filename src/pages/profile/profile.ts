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
  name:any;
  photo:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toast: ToastController,
    public laravel: LaravelProvider,
    public loadingCtrl: LoadingController,
    public http: Http,
    public modalCtrl: ModalController,
    private storage: Storage
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
         localStorage['name']=this.user_detail['user_detail'].first_name;
         localStorage['photo']=this.user_detail['user_detail'].photo;
       this.photo=localStorage['photo'];
       this.name=localStorage['name'];
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
    }
    goToLoginPage(){
      localStorage.clear();
      this.storage.remove('surakshadal_userTokenInfo')
      this.navCtrl.setRoot('LoginPage')
      window.location.reload(true)
    }
      openProfileImage() {
        //let profileimage = this.modalCtrl.create('ProfileimagePage', {profileimageData:this.user_detail['user_detail'], photo:this.user_detail.photo});
        //profileimage.present();
        this.navCtrl.push('ProfileimagePage', {profileimageData:this.user_detail['user_detail'], photo:this.user_detail.photo});
      }
      openPersonal() {
        // let personalModal = this.modalCtrl.create('PersonaldetailPage',{userDetailsData:this.user_detail['user_detail'],idproof_types:this.user_detail.id_types});
        // personalModal.present();
        this.navCtrl.push('PersonaldetailPage',{userDetailsData:this.user_detail['user_detail'],idproof_types:this.user_detail.id_types});
      }
      
      openAddress() {
        // let addressModal = this.modalCtrl.create('AddressdetailPage',{userAddressData:this.user_detail['user_detail'],states:this.user_detail.states,districts:this.user_detail.district,tehsils:this.user_detail.tehsil});
        // addressModal.present();
        this.navCtrl.push('AddressdetailPage',{userAddressData:this.user_detail['user_detail'],states:this.user_detail.states,districts:this.user_detail.district,tehsils:this.user_detail.tehsil});
      }
      openFamily() {
        // let familyModal = this.modalCtrl.create('FamilydetailPage',{userFamilyData:this.user_detail['user_detail'],relations:this.user_detail.relations});
        // familyModal.present();
        this.navCtrl.push('FamilydetailPage',{userFamilyData:this.user_detail['familydata'][0],relations:this.user_detail.relations});
      }
}
