import {Component, NgZone} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import {ClassesService} from "../../services/classes.service";
import {BLE} from "@ionic-native/ble";

/**
 * Generated class for the CheckPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-check',
    templateUrl: 'check.html',
})
export class CheckPage {
    classes:any = [];
    class:any = null;
    devices: any[] = [];
    statusMessage: string;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public classesService: ClassesService,
        private toastCtrl: ToastController,
        private ble: BLE,
        private ngZone: NgZone,
        private alertCtrl: AlertController,
    ) {
        classesService.getClasses()
            .subscribe((result)=>{
                this.classes = result;
            })
    }
    classChanged(){
    }
    scan() {
        this.setStatus('Scanning for Bluetooth LE Devices');
        this.devices = [];  // clear list

        this.ble.scan([], 5).subscribe(
            device => this.onDeviceDiscovered(device),
            error => this.scanError(error)
        );

        setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
    }
    setStatus(message) {
        console.log(message);
        this.ngZone.run(() => {
            this.statusMessage = message;
        });
    }
    onDeviceDiscovered(device) {
        console.log('Discovered ' + JSON.stringify(device, null, 2));
        this.ngZone.run(() => {
            this.devices.push(device);
        });
    }

    // If location permission is denied, you'll end up here
    scanError(error) {
        this.setStatus('Error ' + error);
        let toast = this.toastCtrl.create({
            message: 'Error scanning for Bluetooth low energy devices',
            position: 'middle',
            duration: 5000
        });
        toast.present();
    }
}
