import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  tab2 = 'AddnewsPage';
  tab3 = 'ProfilePage'; 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabRootPage');
  }

}
