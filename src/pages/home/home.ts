import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,ModalController, LoadingController} from 'ionic-angular';
import { Http, Headers} from '@angular/http';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    requests:any;
    loading:any;
    sychedData:boolean = false;
   
   request:any;
    request_id:any; 
    request_image=[]; 
    constructor(
       public navCtrl: NavController, 
       public navParams:NavParams, 
       public http: Http,
       public laravel:LaravelProvider,
       public loadingCtrl: LoadingController,
       public toast: ToastController,
       public modalCtrl: ModalController ,
       private admobFree : AdMobFree
    
      ) {   
        this.getData();
      
         }
        
         addComments(request_id,comments) {          
          let modal = this.modalCtrl.create('CommentsPage', {requestId:request_id,comments:comments});
          modal.present();

        }
        ionViewDidLoad() {       

          console.log('ionViewDidLoad HomePage');
            }

          getData(refresher=null) {
            if(!this.loading){
              this.loading = this.loadingCtrl.create({
                content: 'Please wait...'
              });
              this.loading.present();
            }
            let headers = new Headers();
            let token:string = this.laravel.getToken();
            console.log(token);
            headers.append('Authorization', token);
            this.http.get(this.laravel.getRequestApi(),{
              headers: headers
            })
            .subscribe(res => {
              this.requests = res.json();
              this.sychedData = true;
              this.loading.dismiss();
              if(refresher != null){
                refresher.complete();
              }
            },
                error => {
                  this.loading.dismiss();
                  if(refresher != null){
                    refresher.complete();
                  }
                  this.sychedData = true;
                  this.toast.create({
                    message: 'Something went wrong. Please contact your app developer',
                    duration: 1000
                  }).present();
              });
            }

            addLike(id){            
              let headers = new Headers();
              let token:string = this.laravel.getToken();
              headers.append('Authorization', token);
              this.loading = this.loadingCtrl.create({
                content: 'Please wait...'
              });
              this.loading.present();
              this.http.get(this.laravel.getLikeApi(id),{
                headers: headers
                  }).map(res => res.json())
                  .subscribe(res => {
                    this.getData();
                  },
                  error => {
                    this.loading.dismiss();
                    let errorMsg = 'Something went wrong.';
                    this.toast.create({
                      message: (error.hasOwnProperty('message')) ? error.message:errorMsg ,
                      duration:0
                    }).present();
                  });
            
              }
            addDisLike(id){              
              let headers = new Headers();
              let token:string = this.laravel.getToken();
              headers.append('Authorization', token);
              this.loading = this.loadingCtrl.create({
                content: 'Please wait...'
              });
              this.loading.present();
              this.http.get(this.laravel.getDisLikeApi(id),{
                headers: headers
                  }).map(res => res.json())
                  .subscribe(res => {
                    this.getData();                        
                  },
                  error => {
                    this.loading.dismiss();
                    let errorMsg = 'Something went wrong.';
                    this.toast.create({
                      message: (error.hasOwnProperty('message')) ? error.message:errorMsg ,
                      duration:0
                    }).present();
                  });
              
              }
              doRefresh(refresher) {
                this.getData(refresher)
              }
            
            
        // goToLoginPage(){
        //   // this.storage.remove('surakshadal_userTokenInfo')
        //   this.app.getRootNav().setRoot('LoginPage');
        //   // window.location.reload(true)
        // }
        
    
     }
