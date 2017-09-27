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
import { LoginPage} from '../pages/login/login';


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
// import { SwiperModule } from 'ngx-swiper-wrapper';
// import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http,'assets/i18n','.json');
}
// const SWIPER_CONFIG: SwiperConfigInterface = {
//   direction: 'horizontal',
//   slidesPerView: 'auto',
//   keyboardControl: true
// };

@NgModule({
  declarations: [
    MyApp  
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    // SwiperModule.forRoot(SWIPER_CONFIG),
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
