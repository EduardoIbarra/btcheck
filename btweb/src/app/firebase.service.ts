import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database/database';

@Injectable()
export class AttendancesService {
    uid: string = null;
    constructor(public afDB: AngularFireDatabase) {
        this.uid = localStorage.getItem('uid');
    }
    attendances = [];
    public getAttendances() {
        return this.afDB.list(localStorage.getItem('uid') + '/' + 'attendances/');
    }
    public getAttendance(id) {
        return this.afDB.object(localStorage.getItem('uid') + '/' + 'attendances/' + id);
    }
    public createAttendance(attendance) {
        return this.afDB.database.ref(localStorage.getItem('uid') + '/' + 'attendances/' + attendance.attendance_id).set(attendance);
    }
    public editAttendance(attendance) {
        this.afDB.database.ref(localStorage.getItem('uid') + '/' + 'attendances/' + attendance.attendance_id).set(attendance);
    }
    public deleteAttendance(attendance) {
        this.afDB.database.ref(localStorage.getItem('uid') + '/' + 'attendances/' + attendance.attendance_id).remove();
    }
}
