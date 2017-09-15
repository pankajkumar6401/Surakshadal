import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the AddressdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addressdetail',
  templateUrl: 'addressdetail.html',
})
export class AddressdetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressdetailPage');
  }

}
