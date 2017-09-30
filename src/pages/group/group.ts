import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ClassesService} from "../../services/classes.service";
import {StudentsService} from "../../services/students.service";

/**
 * Generated class for the GroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-group',
    templateUrl: 'group.html',
})
export class GroupPage {
    group:any = {
        class_id: null,
        name: '',
        description: ''
    };
    students:any = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public classesService: ClassesService,
        public studentsService: StudentsService
    ) {
        studentsService.getStudents()
            .subscribe((response)=>{
                this.students = response;
            });
    }
    save(){
        this.group.students = this.students.filter((s)=>{return s.selected === true}) || [];
        this.group.class_id = Date.now();
        this.classesService.createClass(this.group)
            .then((response)=>{
                console.log(response);
                alert('El grupo '+this.group.name+' fue guardado con éxito');
                this.navCtrl.pop();
            })
            .catch((error)=>{
                console.log(error);
                alert('Ha ocurrido un error!');
            })
    }
    toggleSelection(student){
        student.selected = (!student.selected);
    }

}
