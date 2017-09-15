import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabRootPage } from './tab-root';

@NgModule({
  declarations: [
    TabRootPage,
  ],
  imports: [
    IonicPageModule.forChild(TabRootPage),
  ],
})
export class TabRootPageModule {}
