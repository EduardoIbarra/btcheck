import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CheckPage} from "../check/check";

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
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
    ) {
    }
    showCheck(){
        this.navCtrl.push(this.checkPage);
    }
}
