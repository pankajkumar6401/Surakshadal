import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonaldetailPage } from './personaldetail';

@NgModule({
  declarations: [
    PersonaldetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonaldetailPage),
  ],
})
export class PersonaldetailPageModule {}
