import { EmailValidator } from './../../validators/email';
import { NameValidator } from './../../validators/name';
import { NumberValidator } from './../../validators/number';
import { Http } from '@angular/http';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  public registerForm;
  passwordChanged: boolean = false;
  nameChanged: boolean = false;
  fatherNameChanged: boolean = false;
  mobileChanged: boolean = false;
  submitAttempt: boolean = false;
  database: any;
  client_secret:string = 'UhDETDVn2B88pkXNiI4zETsWwbc9sXGXYupAbHgb';
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
    public modalCtrl: ModalController,
    public storage: Storage
  ) {
    this.registerForm = this.formBuilder.group({
      mobile:['', Validators.compose([Validators.required, NumberValidator.isValid])],
      password: ['',Validators.required],
      name:['', Validators.compose([Validators.required, NameValidator.isValid])],
      fatherName: ['', Validators.compose([Validators.required, NameValidator.isValid])],
    });
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
    console.log('ionViewDidLoad RegisterPage');
  }
  elementChanged(input){
    let field = input.ngControl.name;
    this[field + "Changed"] = true;
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
  goTologinPage(){
  this.navCtrl.pop()
}
}
