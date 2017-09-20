import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,ModalController, LoadingController, ViewController } from 'ionic-angular';
import { Http,Headers  } from '@angular/http';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from '@angular/forms';
/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  addcommentForm:any;
  database:any;
  submitAttempt: boolean = false;
  comments:any;
  comment={};
  request_id:any;
  loading:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public http: Http,
    public laravel:LaravelProvider,
    public storage: Storage,
    public toast: ToastController,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController ) {
      this.addcommentForm =this.formBuilder.group({        
        message: ['',Validators.required]
      });
      this.request_id= navParams.get('requestId');
      console.log('request_id', navParams.get('requestId')); 
  }

  
  addcomm(){
    this.submitAttempt = true;
    console.log(this.addcommentForm);
    if(this.addcommentForm.valid){
      let data = {
        'requestId': this.request_id,
        'message': this.addcommentForm.controls.message.value,
      }
      let headers = new Headers();
      let token:string = this.laravel.getToken();
      console.log(token);
      headers.append('Authorization', token);
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      this.loading.present();
      this.http.post(this.laravel.getAddCommentApi(),data,{
        headers: headers
      }).map(res => res.json())
      .subscribe(res => {
        //success
        this.navCtrl.setRoot('HomePage');
        if(res.success){
          this.navCtrl.setRoot('HomePage');
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
  ionViewDidLoad() {
  //   this.loading = this.loadingCtrl.create({
  //     content: 'Please wait...'
  // });
  // this.loading.present();
  // this.http.get(this.laravel.getRequestApi()).subscribe(res => {
  //   this.storage.set('surakshadal_userTokenInfo', res.json().token_type+' '+res.json().access_token)
  //     .then(
  //         data => {
  //           this.comments=res.json()
  //           // console.log(JSON.stringify(this.comments))
  //           this.loading.dismiss();

  //         },
  //         error => {
  //           this.loading.dismiss();
  //           this.toast.create({
  //             message: 'Something went wrong. Please contact your app developer',
  //             duration: 3000
  //           }).present();
  //       });

  //     })
 }

  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}