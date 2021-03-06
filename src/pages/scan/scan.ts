import { Component, NgZone } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import {AttendancesService} from "../../services/attendance.service";
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'page-scan',
    templateUrl: 'scan.html',
})
export class ScanPage {
    allEvents: any;
    thisAttendance: any = null;
    constructor(private qrScanner: QRScanner,
                private attendancesService: AttendancesService,
                public toastCtrl: ToastController,
                private navController: NavController,) {
        //this.checkQRIn('y4SI88qdR8bMlb8up5fvcFrd1X22||1512428600621');

        this.navController.viewWillLeave.subscribe((e) => {
            this.thisAttendance = null;
            console.log('unloading attendance');
        });
        this.navController.viewDidLeave.subscribe((e) => {
            this.thisAttendance = null;
            console.log('unloading attendance');
        });
        this.navController.viewWillUnload.subscribe((e) => {
            this.thisAttendance = null;
            console.log('unloading attendance');
        });
    }
    ionViewDidEnter() {
        this.thisAttendance = null;
        console.log('unloading attendance');
    }
    ionViewDidUnload() {
        this.thisAttendance = null;
        console.log('unloading attendance');
    }
    scan() {
        this.qrScanner.prepare()
            .then((status: QRScannerStatus) => {
                if (status.authorized) {
                    // camera permission was granted

                    // start scanning
                    let flag = 0;
                    let scanSub = this.qrScanner.scan().subscribe((text: string) => {
                        window.document.querySelector('ion-app').classList.remove('transparent-body');
                        console.log('Scanned something', text);
                        this.checkQRIn(text);
                        flag = 1;
                        this.qrScanner.hide(); // hide camera preview
                        scanSub.unsubscribe(); // stop scanning
                    });

                    // show camera preview

                    window.document.querySelector('ion-app').classList.add('transparent-body');
                    this.qrScanner.show()
                        .then((data : QRScannerStatus)=> {
                            console.log('datashowing', data.showing);
                            //alert(data.showing);
                        },err => {
                            //alert(err);

                        });

                    setTimeout(() => {
                        if(flag == 0){
                            window.document.querySelector('ion-app').classList.remove('transparent-body');
                            scanSub.unsubscribe(); // stop scanning
                            alert('Tiempo de espera excedido');
                            this.qrScanner.hide();
                        }
                    }, 5000);

                    // wait for user to scan something, then the observable callback will be called

                } else if (status.denied) {
                    // camera permission was permanently denied
                    // you must use QRScanner.openSettings() method to guide the user to the settings page
                    // then they can grant the permission from there
                } else {
                    // permission was denied, but not permanently. You can ask for permission again at a later time.
                }
            })
            .catch((e: any) => console.log('Error is', e));

        //setTimeout(this.setStatus.bind(this), 10000, 'Scan complete');
    }
    checkQRIn(qrString)
    {
        let segments = qrString.split('||');
        const firstObservable = this.attendancesService.getAttendanceForCheck(segments[0], segments[1])
            .subscribe((response) => {
                console.log(response);
                if(!response.students){
                    response.students = [];
                }else{
                    response.students = Object.keys(response.students).map(function (key) { return response.students[key]; });
                }
                let student = JSON.parse(localStorage.getItem('user'));
                if(response.students.filter((s)=>{ return s.school_id == student.school_id }).length > 0){
                    alert('Tu asistencia ya había sido registrada previamente');
                    return;
                }
                this.thisAttendance = response;
                firstObservable.unsubscribe();
                student.timestamp = Date.now();
                response.students.push(student);
                this.attendancesService.editAttendance(segments[0], response).then((result) => {
                    let toast = this.toastCtrl.create({
                        message: 'Asistencia Registrada Correctamente',
                        duration: 3000
                    });
                    toast.present();
                });
            });
    }

}
