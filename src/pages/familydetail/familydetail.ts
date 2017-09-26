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
  relations=[];
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

      this.user_detail= navParams.get('userFamilyData');
      this.relations= navParams.get('relations');
      console.log(JSON.stringify(this.user_detail));
      this.familydetailForm = this.formBuilder.group({
        member:['', Validators.required]   ,
        familymobile: ['', Validators.compose([Validators.required, NumberValidator.isValid])],
        familydetail: ['', Validators.required],
        relation:['']
      });
  }
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FamilydetailPage');
  }
  save(){
    this.submitAttempt = true;
    if (this.familydetailForm.valid){
      let profileData = {
        'name': this.familydetailForm.controls.member.value,
        'contact_no': this.familydetailForm.controls.familymobile.value,
        'relation_type': this.familydetailForm.controls.relation.value
      }
  
      let headers = new Headers();
      let token:string = this.laravel.getToken();
      console.log(token);
      headers.append('Authorization', token);
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();
      this.http.post(this.laravel.getUpdateFamilyDetail(),profileData,{
        headers: headers
      }).map(res => res.json())
      .subscribe(res => {
        
        this.loading.dismiss();
        if(res.success){
          this.navCtrl.setRoot('FamilydetailPage');
        }else{
          this.toast.create({
            message: 'family Detail added' ,
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
