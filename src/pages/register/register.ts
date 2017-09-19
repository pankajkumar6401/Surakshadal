import { NameValidator } from './../../validators/name';
import { NumberValidator } from './../../validators/number';
import { PasswordValidator } from './../../validators/password';
import { Http } from '@angular/http';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
 
  registerForm:any;
  passwordChanged:boolean = false;
  confirmPasswordChanged:boolean = false;
  nameChanged: boolean = false;
  fatherNameChanged: boolean = false;
  mobileChanged: boolean = false;
  submitAttempt: boolean = false;
  database: any;
  client_secret:string = '8FG7veWcZ140lgCJGFfUhqXGm3LjDqu71SbQWEUy';
  client_id = 2;
  loading:any;
  visiblePass:boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toast: ToastController,
    private formBuilder: FormBuilder,
    public laravel: LaravelProvider,
    public loadingCtrl: LoadingController,
    public http: Http,
    public storage: Storage
  ) {
  
    this.registerForm = this.formBuilder.group({
      mobile:['', Validators.compose([Validators.required, NumberValidator.isValid])],
      name:['', Validators.compose([Validators.required, NameValidator.isValid])],
      fatherName: ['', Validators.compose([Validators.required, NameValidator.isValid])],
      passwordGroup: this.formBuilder.group({
        password: ['',Validators.required],
        confirmPassword: ['',Validators.required]
      },PasswordValidator.MatchPassword)
    });  

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  elementChanged(input){
    let field = input.ngControl.name;
    this[field + "Changed"] = true;
  }
  
  register(){
    this.submitAttempt = true;
    console.log(this.registerForm);
    if(this.registerForm.valid){
      let data = {
        'first_name': this.registerForm.controls.name.value,
        'father_name': this.registerForm.controls.fatherName.value,
        'mobile_no': this.registerForm.controls.mobile.value,
        'password': this.registerForm.controls.passwordGroup.controls.password.value,
        'password_confirmation': this.registerForm.controls.passwordGroup.controls.confirmPassword.value,
        'client_id': this.client_id,
        'client_secret': this.client_secret
      }
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();
      this.http.post(this.laravel.getRegistrationApi(),data)
      .map(res => res.json())
    
      .subscribe(res => {
        this.storage.set('surakshadal_userTokenInfo', res.token_type+' '+res.access_token)
          .then(
              data => {
                this.laravel.setToken(res.token_type+' '+res.access_token);
                this.loading.dismiss();
                this.navCtrl.setRoot('HomePage');
              },
              error => {
                this.loading.dismiss();
                this.toast.create({
                  message: 'Something went wrong. Please contact your app developer',
                  duration: 3000
                }).present();
              }
        );
      },
      error => {
        this.loading.dismiss();
        let errorMsg = 'Something went wrong. Please contact your app developer';
        this.toast.create({
          message: (error.json().hasOwnProperty('message')) ? error.json().message:errorMsg ,
          duration:3000
        }).present();
      });
    }
    
  }
  goToNewsPage(){
    this.navCtrl.push('NewsPage');    
  }
  goTologinPage(){
    this.navCtrl.pop()
  }
 
}









      // .subscribe(
      //   response => {      
      //      if(response.success){
      //        if(response.token){
      //         //  this.storage.set('dsafasdf',response.token).then(()=>{
      //         //     this.navCtrl.setRoot('HomePage');
      //         //  });
      //        }
      //      }
                
      //   },
      //   error=> {
      //     // this.loading.dismiss();
      //     // this.toast.create({
      //     //   // message: 'Something went wrong. Please contact your app developer',
      //     //   duration: 3000
      //     // }).present();
      //     // this.navCtrl.setRoot('HomePage');
      //   }
      // );








