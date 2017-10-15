import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {CheckPage} from "../check/check";
import {AttendancesService} from "../../services/attendance.service";
import {AttendanceModalPage} from "../attendance-modal/attendance-modal";

/**
 * Generated class for the AttendancePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-attendance',
    templateUrl: 'attendance.html',
})
export class AttendancePage {
    checkPage = CheckPage;
    attendances:any [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public attendancesService: AttendancesService,
        public modalCtrl: ModalController
    ) {
        attendancesService.getAttendances()
            .subscribe((result)=>{
                this.attendances = result;
                console.log(this.attendances);
            }, (error)=>{
                alert('Ocurrió un error');
                console.log(error);
            })
    }
    showCheck(){
        this.navCtrl.push(this.checkPage);
    }
    openAttendance(attendance) {
        let modal = this.modalCtrl.create(AttendanceModalPage, attendance);
        modal.present();
    }
}
