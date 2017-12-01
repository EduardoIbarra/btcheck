import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database/database';

@Injectable()
export class ClassesService{
    uid: string = null;
    constructor(public afDB: AngularFireDatabase){
        this.uid = localStorage.getItem('uid');
    }
    classes = [];
    public getClasses(){
        return this.afDB.list(this.uid + '/' + 'classes/');
    }
    public getClass(id){
        return this.afDB.object(this.uid + '/' + 'classes/' + id);
    }
    public createClass(my_class){
        return this.afDB.database.ref(this.uid + '/' + 'classes/' + my_class.class_id).set(my_class);
    }
    public editClass(my_class){
        this.afDB.database.ref(this.uid + '/' + 'classes/' + my_class.class_id).set(my_class);
    }
    public deleteClass(my_class){
        return this.afDB.database.ref(this.uid + '/' + 'classes/' + my_class.class_id).remove();
    }
}
