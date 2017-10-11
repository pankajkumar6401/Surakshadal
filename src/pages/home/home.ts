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
       public admob: AdMobFree     
      ) {        
         }

        //  showBanner() {                
        //   let bannerConfig: AdMobFreeBannerConfig = {
        //       isTesting: true, // Remove in production
        //       autoShow: true,
        //       id: ca-app-pub-1742521438563963/6189760913
        //   };          
        //   this.admob.banner.config(bannerConfig);          
        //   this.admob.banner.prepare().then(() => {
        //       success
        //   }).catch(e => console.log(e));
        
        //    }
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
        this.http.get(this.laravel.getRequestApi(),{
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

            addLike(id){
            
              let headers = new Headers();
              let token:string = this.laravel.getToken();
              console.log(token);
              headers.append('Authorization', token);
              this.loading = this.loadingCtrl.create({
                content: 'Please wait...'
              });
              this.loading.present();
              this.http.get(this.laravel.getLikeApi(id),{
                  headers: headers
                    }).map(res => res.json())
                    .subscribe(res => {
                      this.loading.dismiss(); 
                      // if(res.success){
                      //   this.navCtrl.setRoot('HomePage');
                      // }else{
                        this.ionViewDidLoad();
                        // this.toast.create({
                        //   message: 'Address has been Updated' ,
                        //   duration:3000
                        // }).present();
                      
                   },
                    error => {
                      this.loading.dismiss();
                      let errorMsg = 'Something went wrong.';
                      this.toast.create({
                        message: (error.hasOwnProperty('message')) ? error.message:errorMsg ,
                        duration:3000
                      }).present();
                    });
            
            }
            addDisLike(id){
              
                let headers = new Headers();
                let token:string = this.laravel.getToken();
                console.log(token);
                headers.append('Authorization', token);
                this.loading = this.loadingCtrl.create({
                  content: 'Please wait...'
                });
                this.loading.present();
                this.http.get(this.laravel.getDisLikeApi(id),{
                    headers: headers
                      }).map(res => res.json())
                      .subscribe(res => {
                        this.loading.dismiss(); 
                        this.ionViewDidLoad();
                        // if(res.success){
                        //   this.navCtrl.setRoot('HomePage');
                        // }else{
                          // this.toast.create({
                          //   message: 'Address has been Updated' ,
                          //   duration:3000
                          // }).present();
                        
                     },
                      error => {
                        this.loading.dismiss();
                        let errorMsg = 'Something went wrong.';
                        this.toast.create({
                          message: (error.hasOwnProperty('message')) ? error.message:errorMsg ,
                          duration:3000
                        }).present();
                      });
              
              }
            
        // goToLoginPage(){
        //   // this.storage.remove('surakshadal_userTokenInfo')
        //   this.app.getRootNav().setRoot('LoginPage');
        //   // window.location.reload(true)
        // }
        
    
     }
