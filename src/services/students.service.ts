import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";

@Injectable()
export class StudentsService{
    constructor(public afDB: AngularFireDatabase){}
    students = [];
    public getStudents(){
        return this.afDB.list('notas/');
    }
    public getStudent(id){
        return this.afDB.object('notas/'+id);
    }
    public createStudent(student){
        return this.afDB.database.ref('notas/'+student.school_id).set(student);
    }
    public editStudent(student){
        this.afDB.database.ref('notas/'+student.school_id).set(student);
    }
    public deleteStudent(student){
        this.afDB.database.ref('notas/'+student.school_id).remove();
    }
}