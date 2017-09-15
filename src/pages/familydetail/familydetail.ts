import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';

/**
 * Generated class for the FamilydetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-familydetail',
  templateUrl: 'familydetail.html',
})
export class FamilydetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FamilydetailPage');
  }
  
}
