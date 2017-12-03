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
        return this.afDB.list(localStorage.getItem('uid')+'/'+'attendances/');
    }
    public getAttendance(id){
        return this.afDB.object(localStorage.getItem('uid')+'/'+'attendances/'+id);
    }
    public getAttendanceForCheck(teacherId, id){
        return this.afDB.object(teacherId+'/'+'attendances/'+id);
    }
    public createAttendance(attendance){
        return this.afDB.database.ref(localStorage.getItem('uid')+'/'+'attendances/'+attendance.attendances_id).set(attendance);
    }
    public editAttendance(attendance){
        return this.afDB.database.ref(localStorage.getItem('uid')+'/'+'attendances/'+attendance.attendances_id).set(attendance);
    }
    public deleteAttendance(attendance){
        this.afDB.database.ref(localStorage.getItem('uid')+'/'+'attendances/'+attendance.attendances_id).remove();
    }
}
