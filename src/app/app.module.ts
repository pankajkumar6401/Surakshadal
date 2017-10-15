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


import { Globalization } from '@ionic-native/globalization';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { TranslateLoader, TranslateStaticLoader } from 'ng2-translate/src/translate.service';

import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { Calendar } from '@ionic-native/calendar';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http,'assets/i18n','.json');
}

@NgModule({
  declarations: [
    MyApp  
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
    MyApp    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
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
    AdMobFree
  ]
})
export class AppModule {}
