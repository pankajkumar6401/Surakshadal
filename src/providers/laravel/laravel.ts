import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LaravelProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LaravelProvider {

  url:string = 'http://surakshadal.loc/';
  token:string = '';
  isProduction:boolean = true; 

  constructor(public http: Http) {
    console.log('Hello LaravelProvider Provider');
  }

  getUrl(){
    return (this.isProduction)?'http://webapp.surakshadal.com/':'http://webapp.surakshadal.loc/';
  }

  getLoginApi(){
    return this.getUrl() + 'oauth/token';
  }

  getRegistrationApi() {
    return this.getUrl() + 'api/user/register';
  }
  getRequestApi(){
    return this.getUrl() + 'api/request/data';
  }
  getProfileDetailApi(){
    return this.getUrl() + 'api/home';
  }
  getAddRequestApi(){
    return this.getUrl() + 'api/add';
  }
  getAddCommentApi(){
    return this.getUrl() + 'api/post/comment';
  }
  getProflieImagePath(imagefile){
    return this.getUrl() + 'storage/images/profile/' + imagefile;
  }
  getRequestImagePath(imagefile){    
        return this.getUrl() + 'storage/images/request_images/' + imagefile;
  }
  getUpdateProfileImage(){
    return this.getUrl() + 'api/update/profile/image';
  }
  getUpdatePersonalDetail(){
    return this.getUrl() + 'api/update/personal/detail';
  }
  getUpdateAddressDetail(){
    return this.getUrl() + 'api/update/address';
  } 
  getUpdateFamilyDetail(){
    return this.getUrl() + 'api/update/family/details' ;
  }  
  getStateId(id){
    return this.getUrl() + 'api/get/district/'+id;
  }
  getTehsil(id){
    return this.getUrl() + 'api/get/tehsil/'+id;
  }
  getRequestType(){
    return this.getUrl() +'api/get/request/type';
  }
  getLikeApi(id){
    return this.getUrl() +'api/addlike/' +id;
  }
  getDisLikeApi(id){
    return this.getUrl() +'api/dislike/' +id;
  }
  getUserDetail(){
    return this.getUrl() + 'api/user';
  }
  getMemberApi(){   
    return this.getUrl() +'api/member';
  }
  deleteMember(id){   
    return this.getUrl() +'api/delete/' +id;
  }
  setToken(val){
    this.token = val;
  }

  getToken(){
    return this.token;
  }

  removeToken(){
    this.token = '';
  }

}
