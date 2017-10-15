import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";

@Injectable()
export class AttendancesService{
    uid:string = null;
    constructor(public afDB: AngularFireDatabase){
        this.uid = localStorage.getItem('uid');
    }
    attendances = [];
    public getAttendances(){
        return this.afDB.list(this.uid+'/'+'attendances/');
    }
    public getAttendance(id){
        return this.afDB.object(this.uid+'/'+'attendances/'+id);
    }
    public createAttendance(attendance){
        return this.afDB.database.ref(this.uid+'/'+'attendances/'+attendance.attendances_id).set(attendance);
    }
    public editAttendance(attendance){
        this.afDB.database.ref(this.uid+'/'+'attendances/'+attendance.attendances_id).set(attendance);
    }
    public deleteAttendance(attendance){
        this.afDB.database.ref(this.uid+'/'+'attendances/'+attendance.attendances_id).remove();
    }
}