import { Http, Headers } from '@angular/http';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ViewController,AlertController } from 'ionic-angular';


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
  user_detail:any;
  submitAttempt: boolean = false;
  loading:any;
  user_id:any;
  photo:any;
  name:any;
  members:any;
  member:any;
  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController, 
    public toast: ToastController,   
    public laravel: LaravelProvider,
    public loadingCtrl: LoadingController,
    public http: Http,
    public alertCtrl: AlertController) {

    
  }
  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    let headers = new Headers();
    let token:string = this.laravel.getToken();
    console.log(token);
    headers.append('Authorization', token);
    this.http.get(this.laravel.getMemberApi(),{
      headers: headers
    })
    .subscribe(res => {
      // this.loading.dismiss();
      this.members = res.json()['details'];      
        },
        error => {
          this.loading.dismiss();
          this.toast.create({
            message: 'Member not added',
            duration: 3000
          }).present();
      });

    this.http.get(this.laravel.getProfileDetailApi(),{
      headers: headers
    })
    .subscribe(res => {
       this.loading.dismiss();
       this.user_detail = res.json();
    },
    error => {
      this.loading.dismiss();
      let errorMsg = 'Something went wrong. Please contact your app developer';
      this.toast.create({
        message: (error.hasOwnProperty('message')) ? error.message:errorMsg ,
        duration:3000
      }).present();
    });
    console.log('ionViewDidLoad FamilydetailPage');
  }
addFamilyDetail(){
  let data = {
    relations:this.user_detail.relations,
    user_id:this.user_detail['user_detail']['id'],
    relation_id:this.user_detail['relations']['id'],
    parentPage:this
  }
  this.navCtrl.push('AddfamilydetailPage',data);
}
editMember(member){
  let data = {
    relations:this.user_detail.relations,
    user_id:this.user_detail['user_detail']['id'],
    relation_id:this.user_detail['relations']['id'],
    parentPage:this,
    member: member
  }
  this.navCtrl.push('AddfamilydetailPage',data);
   
  }
deleteMember(id){
  let confirm = this.alertCtrl.create({
    message: 'Are you sure to delete?',
    buttons: [
      {
        text: 'NO',
        handler: () => {
          this.ionViewDidLoad();
          console.log('NO clicked');
        }
      },
      {
        text: 'YES',
        handler: () => {
          let headers = new Headers();
            let token:string = this.laravel.getToken();
            console.log(token);
            headers.append('Authorization', token);
            
            this.http.get(this.laravel.deleteMember(id),{
              headers: headers
            })
            
        .subscribe(res => {
          this.loading.dismiss();
          this.ionViewDidLoad();
            },
            error => {
              this.loading.dismiss();
              this.toast.create({
                message: 'Member deleted',
                duration: 3000
              }).present();
          });
          console.log('YES clicked');
        }
      }
    ]
  });
  confirm.present();
}

elementChanged(input){
  let field = input.ngControl.name;
  this[field + "Changed"] = true;
}
   // this.user_detail= navParams.get('userFamilyData');
      // this.relations= navParams.get('relations');
      // this.user_id=navParams.get('user_id')
      // console.log('mm'+JSON.stringify(this.user_detail));
      // console.log(JSON.stringify(this.user_id));
}