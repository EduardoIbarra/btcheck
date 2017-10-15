import { Component } from '@angular/core';
import {IonicPage, NavParams, Platform, ViewController} from 'ionic-angular';

/**
 * Generated class for the AttendanceModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-attendance-modal',
    templateUrl: 'attendance-modal.html',
})
export class AttendanceModalPage {
    attendance:any;
    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController
    ){
        this.attendance = this.params.get('data');
        console.log(this.attendance);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AttendanceModalPage');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
