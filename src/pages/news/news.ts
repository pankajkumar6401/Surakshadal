import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
  tab1 = 'HomePage';
  tab2 = 'AddnewsPage';
  tab3 = 'ProfilePage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }
  goToNewsPage(){
    this.navCtrl.pop()
  }
}
