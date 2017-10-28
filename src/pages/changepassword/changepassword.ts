import { Component } from '@angular/core';
import { PasswordValidator } from './../../validators/password';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  changePassForm:any;
  passwordChanged:boolean = false;
  confirmPasswordChanged:boolean = false;
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
    private storage: Storage) {
      this.changePassForm = this.formBuilder.group({
        passwordGroup: this.formBuilder.group({
          password: ['',Validators.required],
          confirmPassword: ['',Validators.required]
        },PasswordValidator.MatchPassword)
      });  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }
  elementChanged(input){
    let field = input.ngControl.name;
    this[field + "Changed"] = true;
  }

  savePass(){
      this.submitAttempt = true;
      console.log(this.changePassForm);
      if(this.changePassForm.valid){
        let data = {
          'password': this.changePassForm.controls.passwordGroup.controls.password.value,
          'password_confirmation': this.changePassForm.controls.passwordGroup.controls.confirmPassword.value,
        }
        let headers = new Headers();
        let token:string = this.laravel.getToken();
        console.log(token);
        headers.append('Authorization', token);
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        this.loading.present();
        this.http.post(this.laravel.getchangePassApi(),data,{  headers: headers})
        .map(res => res.json())     
        .subscribe(res => {
          this.loading.dismiss(); 
          if(res.success){
            this.navCtrl.push('ProfilePage');
            
            // this.navCtrl.parent.select(0); 
          }
          else{
            this.toast.create({
              message: 'Oops! Something went wrong. Please try again' ,
              duration:0
            }).present();
          }
        },
        error => {
          this.loading.dismiss().then(()=>{
            this.toast.create({
              message: 'Something went wrong. Please contact your app developer',
              duration: 3000
            }).present();
          });
        }      
        );
      }
   }

}

