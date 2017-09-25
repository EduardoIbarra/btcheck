import { Component, NgZone } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import {StudentsService} from "../../services/students.service";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    devices: any[] = [
        {
            name: 1,
            id: 1,
            rssi: 1
        },
        {
            name: 2,
            id: 2,
            rssi: 2
        },
        {
            name: 3,
            id: 3,
            rssi: 3
        }
    ];
    statusMessage: string;
    students: any[] = [];

    constructor(public navCtrl: NavController,
                private toastCtrl: ToastController,
                private ble: BLE,
                private ngZone: NgZone,
                private alertCtrl: AlertController,
                private studentsService: StudentsService) {
    }

    ionViewDidEnter() {
        console.log('ionViewDidEnter');
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

    setStatus(message) {
        console.log(message);
        this.ngZone.run(() => {
            this.statusMessage = message;
        });
    }

    presentPrompt(id) {
        let alert = this.alertCtrl.create({
            title: 'Login',
            inputs: [
                {
                    name: 'matricula',
                    placeholder: 'Matrícula'
                },
                {
                    name: 'name',
                    placeholder: 'Nombre'
                },
                {
                    name: 'last_name',
                    placeholder: 'Apellido'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Guardar',
                    handler: data => {
                        this.studentsService.createStudent({bluetooth_id: id, school_id: data.matricula, name: data.name, last_name: data.last_name})
                            .then((result)=>{
                                console.log(result);
                                let alert = this.alertCtrl.create({
                                    title: 'Éxito',
                                    subTitle: 'Dado de alta con éxito',
                                    buttons: ['Ok']
                                });
                                alert.present();
                            })
                            .catch((error)=>{
                                console.log(error);
                                let alert = this.alertCtrl.create({
                                    title: 'Oops!',
                                    subTitle: 'Ocurrió un error',
                                    buttons: ['Ok']
                                });
                                alert.present();
                            });
                    }
                }
            ]
        });
        alert.present();
    }

}