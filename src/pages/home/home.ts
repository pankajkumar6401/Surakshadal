import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,ModalController, LoadingController , ViewController} from 'ionic-angular';
import { Http, Headers} from '@angular/http';
import { Storage } from '@ionic/storage';
import {App} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    requests:any;
    loading:any;
    // request={ };
    // request_id:any;  
    constructor(
       public navCtrl: NavController, 
       public navParams:NavParams, 
       public http: Http,
       public laravel:LaravelProvider,
       public loadingCtrl: LoadingController,
       public toast: ToastController,
       public modalCtrl: ModalController,
       private storage: Storage,
       private app:App,
       private viewCtrl:ViewController) {
         }
         addComments(request_id,comments) {          
          let modal = this.modalCtrl.create('CommentsPage', {requestId:request_id,comments:comments});
          modal.present();

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
        this.http.get(this.laravel.getProfileDetailApi(),{
          headers: headers
        })
        .subscribe(res => {
          this.loading.dismiss();
          this.requests = res.json();

                },
                error => {
                  this.loading.dismiss();
                  this.toast.create({
                    message: 'Something went wrong. Please contact your app developer',
                    duration: 3000
                  }).present();
              });
   
            }
          
        goToLoginPage(){
          // this.storage.remove('surakshadal_userTokenInfo')
          this.app.getRootNav().setRoot('LoginPage');
          // window.location.reload(true)
        }
        
    
     }
