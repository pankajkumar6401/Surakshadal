import { I18nPageModule } from './../pages/i18n/i18n.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { Network } from '@ionic-native/network';
import { HttpModule, Http  } from '@angular/http';
import { LaravelProvider } from '../providers/laravel/laravel';

import { PersonaldetailPage } from '../pages/personaldetail/personaldetail';
import { FamilydetailPage } from '../pages/familydetail/familydetail';
import { AddressdetailPage } from '../pages/addressdetail/addressdetail';
import { ProfileimagePage } from '../pages/profileimage/profileimage';

import { Globalization } from '@ionic-native/globalization';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { TranslateLoader, TranslateStaticLoader } from 'ng2-translate/src/translate.service';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { FileChooser } from '@ionic-native/file-chooser';
import { Calendar } from '@ionic-native/calendar';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http,'assets/i18n','.json');
}

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
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    I18nPageModule
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
    LaravelProvider,
    Globalization,
  ]
})
export class AppModule {}
