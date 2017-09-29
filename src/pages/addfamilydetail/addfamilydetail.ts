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
 * Generated class for the AddfamilydetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addfamilydetail',
  templateUrl: 'addfamilydetail.html',
})
export class AddfamilydetailPage {
  familydetailForm:any;
  user_detail:any;
  member: boolean = false;
  familymobile: boolean = false;
  familydetail: boolean = false;
  submitAttempt: boolean = false;
  loading:any;
  relations=[];
  user_id:any;
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
      this.user_id=navParams.get('user_id')
      console.log('mm'+JSON.stringify(this.user_detail));
      console.log(JSON.stringify(this.user_id));
      this.familydetailForm = this.formBuilder.group({
        member:['', Validators.required],
        familymobile: ['', Validators.compose([Validators.required, NumberValidator.isValid])],
        relation:[''],
        user_id:['']    
      });
  }
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
  ionViewDidLoad() {
    this.familydetailForm.controls.user_id.setValue(this.user_id);
    console.log('ionViewDidLoad FamilydetailPage');
  }
  save(){
    this.submitAttempt = true;
    if (this.familydetailForm.valid){
      let profileData = {
        'name': this.familydetailForm.controls.member.value,
        'contact_no': this.familydetailForm.controls.familymobile.value,
        'relation': this.familydetailForm.controls.relation.value,
        'user_id': this.familydetailForm.controls.user_id.value
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
        if(res.succes){
          this.navCtrl.pop().then(()=>{
            this.navParams.get('parentPage').ionViewDidLoad()
          });
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
// save(){
//   this.navCtrl.pop();
// }
// .then(()=>{
//   this.navParams.get('parentPage').ionViewDidLoad()
// });
elementChanged(input){
  let field = input.ngControl.name;
  this[field + "Changed"] = true;
}
  
}