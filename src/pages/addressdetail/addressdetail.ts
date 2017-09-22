import { EmailValidator } from './../../validators/email';
import { NameValidator } from './../../validators/name';
import { NumberValidator } from './../../validators/number';
import { Http, Headers } from '@angular/http';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
/**
 * Generated class for the AddressdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addressdetail',
  templateUrl: 'addressdetail.html',
})
export class AddressdetailPage {
  profiledetailForm:any;
  user_detail:any;
  submitAttempt: boolean = false;
  loading:any;
  states=[];
  districts=[];
  tehsils=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private formBuilder: FormBuilder,
    public toast: ToastController,   
    public laravel: LaravelProvider,
    public loadingCtrl: LoadingController,
    public http: Http, ) {
      this.user_detail= navParams.get('userAddressData');
     this.states = navParams.get('states');
     this.districts = navParams.get('districts');
     this.tehsils = navParams.get('tehsils');
      console.log(JSON.stringify(this.user_detail));
      this.profiledetailForm = this.formBuilder.group({
        aadhar:['', Validators.compose([Validators.required, NumberValidator.isValid])],
        pincode: ['', Validators.compose([Validators.required, NumberValidator.isValid])],
        mobile: ['', Validators.compose([Validators.required, NumberValidator.isValid])],
        phone: ['', Validators.compose([Validators.required, NumberValidator.isValid])],
        address_1: ['', Validators.required],
        address_2: ['', Validators.required],
        state: ['', Validators.required],       
        district: ['', Validators.required] ,      
        tehsil: ['', Validators.required]       
  
      });  
  }
  ionViewDidLoad() {
    this.profiledetailForm.controls.aadhar.setValue(this.user_detail.aadhar);
    this.profiledetailForm.controls.pincode.setValue(this.user_detail.pincode);
    this.profiledetailForm.controls.mobile.setValue(this.user_detail.mobile);
    this.profiledetailForm.controls.phone.setValue(this.user_detail.phone);
    this.profiledetailForm.controls.address_1.setValue(this.user_detail.address_1);
    this.profiledetailForm.controls.address_2.setValue(this.user_detail.address_2);
    this.profiledetailForm.controls.state.setValue(this.user_detail.state_id);
    this.profiledetailForm.controls.district.setValue(this.user_detail.district_id);
    this.profiledetailForm.controls.tehsil.setValue(this.user_detail.tehsil_id);
    console.log('ionViewDidLoad AddressdetailPage');
  }
  save(){
    this.submitAttempt = true;
    if (this.profiledetailForm.valid){
      let profileData = {
        'first_name': this.profiledetailForm.controls.name.value,
        'father_Name': this.profiledetailForm.controls.fatherName.value,
        'mother_Name': this.profiledetailForm.controls.motherName.value,
        'email': this.profiledetailForm.controls.email.value
      }
  
      let headers = new Headers();
      let token:string = this.laravel.getToken();
      headers.append('Authorization', token);
      this.loading = this.loadingCtrl.create({
        content: 'Please Wait'
      })
      this.loading.present();
      this.http.post(this.laravel.getProfileDetailApi(),profileData,{
        headers: headers
      }).subscribe(res=>{
        this.loading.dismiss();
        if(res.json().success){
          this.navCtrl.setRoot('PersonaldetailPage');
        }else{
          let errorMsg = 'Something went wrong. Please contact your app developer';
          if(res.json().hasOwnProperty('msg')){
            if(res.json().msg instanceof String){
              errorMsg = res.json().msg
            }else{
              errorMsg = res.json().msg.join();
            }
          }
          this.toast.create({
            message: errorMsg,
            duration: 3000
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

}
