import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TabRootPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-root',
  templateUrl: 'tab-root.html',
})
export class TabRootPage {
  tab1 = 'HomePage';
  tab2 = 'AddrequestPage';
  tab3 = 'ProfilePage'; 
  tab4 ='';
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage) {
    
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad TabRootPage');
  // }

}
