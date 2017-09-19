import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
