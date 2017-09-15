import { EmailValidator } from './../../validators/email';
import { NameValidator } from './../../validators/name';
import { NumberValidator } from './../../validators/number';
import { Http } from '@angular/http';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { Calendar } from '@ionic-native/calendar';



/**
 * Generated class for the PersonaldetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personaldetail',
  templateUrl: 'personaldetail.html',
})
export class PersonaldetailPage {
  public registerForm;
  nameChanged: boolean = false;
  fatherNameChanged: boolean = false;
  mobileChanged: boolean = false;
  emailChanged: boolean = false;
  submitAttempt: boolean = false;
  database: any;
  client_secret:string = '8FG7veWcZ140lgCJGFfUhqXGm3LjDqu71SbQWEUy';
  client_id = 2;
  loading:any;
  visiblePass:boolean = false;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController, 
    public toast: ToastController,
    private formBuilder: FormBuilder, 
    public laravel: LaravelProvider,
    public loadingCtrl: LoadingController,
    public http: Http,
    private calendar: Calendar,
    public storage: Storage) 
    {
    this.registerForm = this.formBuilder.group({
      mobile:['', Validators.compose([Validators.required, NumberValidator.isValid])],
      password: ['',Validators.required],
      name:['', Validators.compose([Validators.required, NameValidator.isValid])],
      fatherName: ['', Validators.compose([Validators.required, NameValidator.isValid])],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],

    });
  }
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
  elementChanged(input){
    let field = input.ngControl.name;
    this[field + "Changed"] = true;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonaldetailPage');
  }
  goToDate(){
  this.calendar.createCalendar('MyCalendar').then(
    (msg) => { console.log(msg); },
    (err) => { console.log(err); }
  );
}
  register(){
    this.submitAttempt = true;
    if (this.registerForm.valid){
      let credential = {
          username :this.registerForm.controls.email.value,
          password : this.registerForm.controls.password.value,
        };
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        this.loading.present();
        this.http.post(this.laravel.getRegistrationApi(),{
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
          console.log(error.json().message);
          this.loading.dismiss();
          let errorMsg = 'Something went wrong. Please contact your app developer';
          this.toast.create({
            message: (error.json().hasOwnProperty('message')) ? error.json().message:errorMsg ,
            duration:3000
          }).present();
        });
    }
  }
}
