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
  request_id:any;
  loading:any;
  loggedUserImage:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public http: Http,
    public laravel:LaravelProvider,
    private storage: Storage,
    public toast: ToastController,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController ) {
     this.loggedUserImage=localStorage['photo']
      this.addcommentForm =this.formBuilder.group({        
        message: ['',Validators.required]
      });
      this.request_id= navParams.get('requestId');
      this.comments= navParams.get('comments');
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
        // this.navCtrl.setRoot('HomePage'); it's not required here 
        /// now we have to dismiss loading if we got any response from back-end 
        this.loading.dismiss(); 
        if(res.success){
          this.navCtrl.setRoot('TabRootPage');
        }else{
          this.toast.create({
            message: 'Updated comment' ,
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
 }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
