import { PincodeValidator } from './../../validators/pincode';
import { Http, Headers } from '@angular/http';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController } from 'ionic-angular';
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
  addressdetailForm:any;
  user_detail:any;
  submitAttempt: boolean = false;
  loading:any;
  states=[];
  districts=[];
  tehsils=[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public formBuilder: FormBuilder,
    public toast: ToastController,   
    public laravel: LaravelProvider,
    public loadingCtrl: LoadingController,
    public http: Http ) 
    {
        this.user_detail= navParams.get('userAddressData');
        this.states = navParams.get('states');
        this.districts = navParams.get('districts');
        this.tehsils = navParams.get('tehsils');  
        console.log(JSON.stringify(this.user_detail));
        this.addressdetailForm = this.formBuilder.group({        
        pincode: ['', Validators.compose([ PincodeValidator.isValid])],       
        address_1: ['',Validators.required],
        address_2: [''],
        state: ['',Validators.required],       
        district: ['',Validators.required] ,      
        tehsil: ['',Validators.required],
        user_id:['']     
      });  
  }
  ionViewDidLoad() {
   
    this.addressdetailForm.controls.pincode.setValue(this.user_detail.pincode);    
    this.addressdetailForm.controls.address_1.setValue(this.user_detail.address_1);
    this.addressdetailForm.controls.address_2.setValue(this.user_detail.address_2);
    this.addressdetailForm.controls.state.setValue(this.user_detail.state_id);
    this.addressdetailForm.controls.district.setValue(this.user_detail.district_id);
    this.addressdetailForm.controls.tehsil.setValue(this.user_detail.tehsil_id);
    this.addressdetailForm.controls.user_id.setValue(this.user_detail.id);
    console.log('ionViewDidLoad AddressdetailPage');
  }
  save(){
    this.submitAttempt = true;
    if (this.addressdetailForm.valid){
      let profileData = {
       
        'pincode': this.addressdetailForm.controls.pincode.value,
        'address_line_1': this.addressdetailForm.controls.address_1.value,
        'address_line_2': this.addressdetailForm.controls.address_2.value,
        'state': this.addressdetailForm.controls.state.value,
        'distric': this.addressdetailForm.controls.district.value,
        'tehsil': this.addressdetailForm.controls.tehsil.value,
        'user_id': this.addressdetailForm.controls.user_id.value
  
      }
      let headers = new Headers();
      let token:string = this.laravel.getToken();
      console.log(token);
      headers.append('Authorization', token);
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();
      this.http.post(this.laravel.getUpdateAddressDetail(),profileData,{
        headers: headers
      }).map(res => res.json())
      .subscribe(res => {
        //success
        // this.navCtrl.setRoot('HomePage'); it's not required here 
        /// now we have to dismiss loading if we got any response from back-end 
        this.loading.dismiss(); 
        if(res.success){
          this.navCtrl.setRoot('ProfilePage');
        }else{
          this.navCtrl.setRoot('ProfilePage');
          this.toast.create({
            message: 'Address has been Updated' ,
            duration:3000
          }).present();
        }
      },
      error => {
        this.loading.dismiss();
        let errorMsg = 'Something went wrong.';
        this.toast.create({
          message: (error.hasOwnProperty('message')) ? error.message:errorMsg ,
          duration:3000
        }).present();
      });
      
    }
    
}
elementChanged(input){
  let field = input.ngControl.name;
  this[field + "Changed"] = true;
}
    getDist(){
      // alert( this.addressdetailForm.controls.state.value)
         let headers = new Headers();
      let token:string = this.laravel.getToken();
      console.log(token);
      headers.append('Authorization', token);
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
       this.loading.present();
      this.http.get(this.laravel.getStateId(this.addressdetailForm.controls.state.value),{
        headers: headers
      }).map(res => res.json())
      .subscribe(res => {
        this.loading.dismiss();
        this.districts=res;
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
    getTehsil(){
        //alert( this.addressdetailForm.controls.district.value)
         let headers = new Headers();
      let token:string = this.laravel.getToken();
      console.log(token);
      headers.append('Authorization', token);
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
       this.loading.present();
      this.http.get(this.laravel.getTehsil(this.addressdetailForm.controls.district.value),{
        headers: headers
      }).map(res => res.json())
      .subscribe(res => {
        this.loading.dismiss();
        this.tehsils=res;
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

