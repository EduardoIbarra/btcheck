import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";

@Injectable()
export class StudentsService{
    uid:string = null;
    constructor(public afDB: AngularFireDatabase){
        this.uid = localStorage.getItem('uid');
    }
    students = [];
    public getStudents(){
        return this.afDB.list(this.uid+'/'+'students/');
    }
    public getStudent(id){
        return this.afDB.object(this.uid+'/'+'students/'+id);
    }
    public createStudent(student){
        return this.afDB.database.ref(this.uid+'/'+'students/'+student.school_id).set(student);
    }
    public editStudent(student){
        this.afDB.database.ref(this.uid+'/'+'students/'+student.school_id).set(student);
    }
    public deleteStudent(student){
        return this.afDB.database.ref(this.uid+'/'+'students/'+student.school_id).remove();
    }
}