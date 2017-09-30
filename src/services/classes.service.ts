import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";

@Injectable()
export class ClassesService{
    constructor(public afDB: AngularFireDatabase){}
    classes = [];
    public getClasses(){
        return this.afDB.list('classes/');
    }
    public getClass(id){
        return this.afDB.object('classes/'+id);
    }
    public createClass(my_class){
        return this.afDB.database.ref('classes/'+my_class.class_id).set(my_class);
    }
    public editClass(my_class){
        this.afDB.database.ref('classes/'+my_class.class_id).set(my_class);
    }
    public deleteClass(my_class){
        this.afDB.database.ref('classes/'+my_class.class_id).remove();
    }
}