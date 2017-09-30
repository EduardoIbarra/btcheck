import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";

@Injectable()
export class AttendancesService{
    constructor(public afDB: AngularFireDatabase){}
    attendances = [];
    public getAttendances(){
        return this.afDB.list('attendances/');
    }
    public getAttendance(id){
        return this.afDB.object('attendances/'+id);
    }
    public createAttendance(attendance){
        return this.afDB.database.ref('attendances/'+attendance.school_id).set(attendance);
    }
    public editAttendance(attendance){
        this.afDB.database.ref('attendances/'+attendance.school_id).set(attendance);
    }
    public deleteAttendance(attendance){
        this.afDB.database.ref('attendances/'+attendance.school_id).remove();
    }
}