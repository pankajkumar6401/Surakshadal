import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { Network } from '@ionic-native/network';
import { HttpModule } from '@angular/http';
import { LaravelProvider } from '../providers/laravel/laravel';
import { PersonaldetailPage } from '../pages/personaldetail/personaldetail';
import { FamilydetailPage } from '../pages/familydetail/familydetail';
import { AddressdetailPage } from '../pages/addressdetail/addressdetail';
import { ProfileimagePage } from '../pages/profileimage/profileimage';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { FileChooser } from '@ionic-native/file-chooser';
import { Calendar } from '@ionic-native/calendar';
@NgModule({
  declarations: [
    MyApp,
    PersonaldetailPage,
    AddressdetailPage,
    FamilydetailPage,
    ProfileimagePage


  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PersonaldetailPage,
    AddressdetailPage,
    FamilydetailPage,
    ProfileimagePage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    Calendar,
    FilePath,
    FileChooser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    LaravelProvider
  ]
})
export class AppModule {}
