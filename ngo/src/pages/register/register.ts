import { EmailValidator } from './../../validators/email';
import { NameValidator } from './../../validators/name';
import { NumberValidator } from './../../validators/number';
import { PasswordValidator } from './../../validators/password';
import { Http } from '@angular/http';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

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
    todo: any;
    registerForm:FormGroup;

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
    this.todo= {};
    this.registerForm = formBuilder.group({
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
    console.log(JSON.stringify(this.todo))
  }

  goToNewsPage(){
    this.navCtrl.push('NewsPage');    
  }
  goTologinPage(){
    this.navCtrl.pop()
  }
 
}
