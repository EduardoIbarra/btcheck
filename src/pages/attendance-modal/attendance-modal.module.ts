import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceModalPage } from './attendance-modal';

@NgModule({
  declarations: [
    AttendanceModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceModalPage),
  ],
})
export class AttendanceModalPageModule {}
