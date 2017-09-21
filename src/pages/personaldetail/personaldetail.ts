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
  profiledetailForm:any;
  user_detail: any= {
      first_name:'',
      father_Name:'',
      mother_Name:'',
      email:''
  }
  nameChanged: boolean = false;
  fatherNameChanged: boolean = false;
  mobileChanged: boolean = false;
  emailChanged: boolean = false;
  submitAttempt: boolean = false;
  loading:any;

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
    this.profiledetailForm = this.formBuilder.group({
      name:['', Validators.compose([Validators.required, NameValidator.isValid])],
      fatherName: ['', Validators.compose([Validators.required, NameValidator.isValid])],
      motherName: ['', Validators.compose([Validators.required, NameValidator.isValid])],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],

    });  
    this.getProfileDetails();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonaldetailPage');
  }
  getProfileDetails(){
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
        this.user_detail = res.json().user_detail;
        this.profiledetailForm.controls.name.setValue(this.user_detail.first_name);
        this.profiledetailForm.controls.fatherName.setValue(this.user_detail.father_Name);
        this.profiledetailForm.controls.motherName.setValue(this.user_detail.mother_Name);
        this.profiledetailForm.controls.email.setValue(this.user_detail.email);
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

  calender(){
  this.calendar.createCalendar('MyCalendar').then(
    (msg) => { console.log(msg); },
    (err) => { console.log(err); }
  );
}
  // dismiss(data) {
  //   this.viewCtrl.dismiss(data);
  // }
  elementChanged(input){
    let field = input.ngControl.name;
    this[field + "Changed"] = true;
  }
  

  // ionViewDidLoad() {         
  //   // this.loading = this.loadingCtrl.create({
  //   // content: 'Please wait...'
  //   // });
  // }
}

