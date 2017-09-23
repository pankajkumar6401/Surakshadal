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
  user_detail: any;
  nameChanged: boolean = false;
  fatherNameChanged: boolean = false;
  mobileChanged: boolean = false;
  emailChanged: boolean = false;
  submitAttempt: boolean = false;
  loading:any;
  idproof_types=[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController, 
    public toast: ToastController,
    private formBuilder: FormBuilder, 
    public laravel: LaravelProvider,
    public loadingCtrl: LoadingController,
    public http: Http,
    private storage: Storage) 
    {
      this.user_detail= navParams.get('userDetailsData');
      this.idproof_types= navParams.get('idproof_types');
      console.log(JSON.stringify(this.user_detail));
      this.profiledetailForm = this.formBuilder.group({
      name:['', Validators.compose([Validators.required, NameValidator.isValid])],
      fatherName: ['', Validators.compose([Validators.required, NameValidator.isValid])],
      motherName: ['', Validators.compose([Validators.required, NameValidator.isValid])],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      mobile_no: ['', Validators.compose([Validators.required, NumberValidator.isValid])],
      phone: ['', Validators.compose([Validators.required, NumberValidator.isValid])],
      aadhar:['', Validators.compose([Validators.required, NumberValidator.isValid])],
      id_type: ['', Validators.required],          
      dob: ['', Validators.required]          

    });  
  }
  ionViewDidLoad() {
     this.profiledetailForm.controls.name.setValue(this.user_detail.first_name);
        this.profiledetailForm.controls.fatherName.setValue(this.user_detail.father_name);
        this.profiledetailForm.controls.motherName.setValue(this.user_detail.mother_name);
        this.profiledetailForm.controls.email.setValue(this.user_detail.email);
        this.profiledetailForm.controls.mobile_no.setValue(this.user_detail.mobile);
        this.profiledetailForm.controls.phone.setValue(this.user_detail.phone);
        this.profiledetailForm.controls.aadhar.setValue(this.user_detail.aadhar);
        this.profiledetailForm.controls.id_type.setValue(this.user_detail.idproof_type);
        this.profiledetailForm.controls.dob.setValue(this.user_detail.dob);
    console.log('ionViewDidLoad PersonaldetailPage');
  }

    save(){
      this.submitAttempt = true;
      if (this.profiledetailForm.valid){
        let profileData = {
          'first_name': this.profiledetailForm.controls.name.value,
          'father_name': this.profiledetailForm.controls.fatherName.value,
          'mother_Name': this.profiledetailForm.controls.motherName.value,
          'email': this.profiledetailForm.controls.email.value,
          'phone': this.profiledetailForm.controls.phone.value,
          'mobile_no': this.profiledetailForm.controls.mobile_no.value,
          'aadhar': this.profiledetailForm.controls.aadhar.value,
          'dob': this.profiledetailForm.controls.dob.value,
          'id_type': this.profiledetailForm.controls.id_type.value,
        }
        let headers = new Headers();
        let token:string = this.laravel.getToken();
        console.log(token);
        headers.append('Authorization', token);
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        this.loading.present();
        this.http.post(this.laravel.getUpdatePersonalDetail(),profileData,{
          headers: headers
        }).map(res => res.json())
        .subscribe(res => {
          //success
          // this.navCtrl.setRoot('HomePage'); it's not required here 
          /// now we have to dismiss loading if we got any response from back-end 
          this.loading.dismiss(); 
          if(res.success){
            this.navCtrl.setRoot('PersonaldetailPage');
          }else{
            this.toast.create({
              message: 'Something went wrong. Please contact your app developer' ,
              duration:3000
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
  elementChanged(input){
    let field = input.ngControl.name;
    this[field + "Changed"] = true;
  }

}