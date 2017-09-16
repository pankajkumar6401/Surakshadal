import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http,Headers  } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   requests:any;
   request={     
     userId:1,
     id: 1,
     title: 'Neha',
     body:'Hello!!'
   }
   
  constructor(public navCtrl: NavController, public navParams:NavParams, public http: Http, public laravel:LaravelProvider,) {
    this.requests={}
    this.requests= this.request;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  //   let token:string = this.laravel.getToken();
  //   if(token){
  //     let headers = new Headers();
  //     headers.append('Authorization', token);

  //     this.http.get(this.laravel.getRequestApi(),{
  //       headers: headers
  //     }).subscribe(response => {
  //       this.requestData = response.json().requests;
  //       this.requests = this.requestData;     
  //     })
  //   }
  // }
    
}
