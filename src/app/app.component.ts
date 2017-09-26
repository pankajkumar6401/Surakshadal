import { LaravelProvider } from './../providers/laravel/laravel';
import { Storage } from '@ionic/storage';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  loading:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private storage: Storage,
    private laravel: LaravelProvider,
    public loadingCtrl: LoadingController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.loading = this.loadingCtrl.create({
        content: 'Authenticating please wait...'
      });
      this.loading.present();

      this.storage.get('surakshadal_userTokenInfo').then((val) => {
        // alert(val)
        // let myVal=localStorage['surakshadal_userTokenInfo']
        if(val){
          console.log(val);
          this.loading.dismiss();
          this.laravel.setToken(val);
          this.nav.setRoot('TabRootPage');
        }else{
          this.loading.dismiss();
          this.nav.setRoot('LoginPage');
          
        }
      },(error)=>{
        this.loading.dismiss();
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

