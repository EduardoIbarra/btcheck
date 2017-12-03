import { Component } from '@angular/core';
import {AttendancesService} from '../firebase.service';
import {ClassesService} from '../services/classes.service';

@Component({
    selector: 'app-attendance',
    templateUrl: 'attendance.component.html'
})
export class AttendanceComponent {
    attendances: any [];
    classes: any [];
    class: any;
    date: number;
    qrUrl: string;
    constructor(
        public attendancesService: AttendancesService,
        public classesService: ClassesService
    ) {
        attendancesService.getAttendances().valueChanges()
            .subscribe((result) => {
                this.attendances = result;
            }, (error) => {
                alert('Ocurrió un error');
                console.log(error);
            });
        classesService.getClasses().valueChanges()
            .subscribe((result) => {
                this.classes = result;
                console.log(result);
            });
    }
    getQR() {
        this.date = Date.now();
        const qrCode = localStorage.getItem('uid') + '||' + this.date;
        this.qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=900x900&data=' + qrCode;
        const attendance = {
            attendance_id: this.date,
            class: this.class,
            qrUrl: this.qrUrl,
            qrCode: qrCode,
            students: []
        };
        console.log(this.class);
        this.attendancesService.createAttendance(attendance).then((result) => {
            alert('Pase de lista en curso...');
        });
        console.log(this.qrUrl);
    }
    openAttendance(attendance) {
    }
}
