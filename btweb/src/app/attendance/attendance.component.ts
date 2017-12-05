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
    globalAttendance: any;
    constructor(
        public attendancesService: AttendancesService,
        public classesService: ClassesService
    ) {
        attendancesService.getAttendances().valueChanges()
            .subscribe((result) => {
                this.attendances = result;
                console.log(this.attendances);
            }, (error) => {
                alert('Ocurrió un error');
                console.log(error);
            });
        classesService.getClasses().valueChanges()
            .subscribe((result) => {
                this.classes = result;
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
            this.attendancesService.getAttendance(attendance.attendance_id)
                .valueChanges().subscribe( (attendance) => {
                    console.log(attendance);
                    this.globalAttendance = attendance;
                });
        });
        console.log(this.qrUrl);
    }
    openAttendance(attendance) {
        this.globalAttendance = attendance;
        this.class = this.globalAttendance.class;
    }
}
