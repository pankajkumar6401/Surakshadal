import { NumberValidator } from './../../validators/number';
import { Http } from '@angular/http';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Network } from '@ionic-native/network';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm;
  mobileChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  database: any;
  client_secret:string = '8FG7veWcZ140lgCJGFfUhqXGm3LjDqu71SbQWEUy';
  client_id = 2;
  loading:any;
  visiblePass:boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toast: ToastController,
    private network: Network,
    private formBuilder: FormBuilder,
    public laravel: LaravelProvider,
    public loadingCtrl: LoadingController,
    public http: Http,
    public storage: Storage
  ) {
    this.loginForm = this.formBuilder.group({
      mobile:['', Validators.compose([Validators.required, NumberValidator.isValid])],
      password: ['',Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  elementChanged(input){
    let field = input.ngControl.name;
    this[field + "Changed"] = true;
  }

  login(){
    this.submitAttempt = true;
    if (this.loginForm.valid){
      console.log('Hello');
      let credential = {
        username :this.loginForm.controls.mobile.value,
          password : this.loginForm.controls.password.value,
        };
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        this.loading.present();
        this.http.post(this.laravel.getLoginApi(),{
          grant_type: 'password',
          client_id: 2,
          client_secret:this.client_secret,
          username:credential.username,
          password:credential.password,
          scope:'*'
        }).subscribe(res => {
          this.storage.set('surakshadal_userTokenInfo', res.json().token_type+' '+res.json().access_token)
            .then(
                data => {
                  this.laravel.setToken(res.json().token_type+' '+res.json().access_token);
                  this.loading.dismiss();
                  this.navCtrl.setRoot('TabRootPage');
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

  goToResetPassword(){
    this.navCtrl.push('LoginPage');
  }
  goToRegister(){
    this.navCtrl.push('RegisterPage')
  }

}
