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
 * Generated class for the FamilydetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-familydetail',
  templateUrl: 'familydetail.html',
})
export class FamilydetailPage {
  familydetailForm:any;
  user_detail:any;
  member: boolean = false;
  familymobile: boolean = false;
  familydetail: boolean = false;
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
    private storage: Storage) {

      this.user_detail= navParams.get('userDetailsData');
      console.log(JSON.stringify(this.user_detail));
      this.familydetailForm = this.formBuilder.group({
        member:['', Validators.required]   ,
        familymobile: ['', Validators.compose([Validators.required, NumberValidator.isValid])],
        familydetail: ['', Validators.required]
      });
  }
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
  ionViewDidLoad() {
    // this.familydetailForm.controls.name.setValue(this.user_detail.first_name);
    // this.familydetailForm.controls.fatherName.setValue(this.user_detail.father_name);
    // this.familydetailForm.controls.motherName.setValue(this.user_detail.mother_name);
    // this.familydetailForm.controls.email.setValue(this.user_detail.email);
    console.log('ionViewDidLoad FamilydetailPage');
  }
  save(){
    this.submitAttempt = true;
    if (this.familydetailForm.valid){
      let profileData = {
        'member': this.familydetailForm.controls.member.value,
        'familynumber': this.familydetailForm.controls.familynumber.value,
        'familydetail': this.familydetailForm.controls.familydetail.value
      }
  
      let headers = new Headers();
      let token:string = this.laravel.getToken();
      headers.append('Authorization', token);
      this.loading = this.loadingCtrl.create({
        content: 'Please Wait'
      })
      this.loading.present();
      this.http.post(this.laravel.getUpdateFamilyDetail(),profileData,{
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
elementChanged(input){
  let field = input.ngControl.name;
  this[field + "Changed"] = true;
}
  
}
