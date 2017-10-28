import { Http,Headers } from '@angular/http';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ToastController, LoadingController,ModalController } from 'ionic-angular';

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
  userdetails  = {
    first_name:'',
    photo:''
  };
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
    this.storage.get('surakshadal_userDetails').then(userdetails => {
      if(userdetails){
        this.userdetails = userdetails;
        let headers = new Headers();
        let token:string = this.laravel.getToken();
        headers.append('Authorization', token);
        this.http.get(this.laravel.getProfileDetailApi(),{
          headers: headers
        }).subscribe(res => {
          this.loading.dismiss();
          this.user_detail = res.json();
        },
        error => {
          this.loading.dismiss();
        });
      }else{
        this.loading.dismiss();
      }
    },error=>{
      this.loading.dismiss();
    });
     
      
    }
    goToLoginPage(){
      
      this.storage.remove('surakshadal_userTokenInfo').then(()=>{
        this.storage.remove('surakshadal_userDetails').then(() => {
          
          this.navCtrl.parent.parent.setRoot('LoginPage');
        });
      });
      // window.location.reload(true)
    }
   changePass(){
     this.navCtrl.push('ChangepasswordPage')
    }
      openProfileImage() {
        this.navCtrl.push('ProfileimagePage', {profileimageData:this.user_detail['user_detail'], photo:this.user_detail.photo});
      }
      openPersonal() {
        this.navCtrl.push('PersonaldetailPage',{userDetailsData:this.user_detail['user_detail'],idproof_types:this.user_detail.id_types});
      }
      
      openAddress() {
        this.navCtrl.push('AddressdetailPage',{userAddressData:this.user_detail['user_detail'],states:this.user_detail.states,districts:this.user_detail.district,tehsils:this.user_detail.tehsil});
      }
      openFamily() {
        this.navCtrl.push('FamilydetailPage',{userFamilyData:this.user_detail['familydata'],relations:this.user_detail.relations, user_id:this.user_detail['user_detail']['id']});
      }
}