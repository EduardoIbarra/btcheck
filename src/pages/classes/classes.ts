import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GroupPage} from "../group/group";
import {ClassesService} from "../../services/classes.service";

/**
 * Generated class for the ClassesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-classes',
    templateUrl: 'classes.html',
})
export class ClassesPage {
    classes:any = [];
    groupPage = GroupPage;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public classesService: ClassesService
    ) {
        classesService.getClasses()
            .subscribe((response)=>{
                this.classes = response;
                console.log(this.classes);
            });
    }
    showAddClass(){
        this.navCtrl.push(this.groupPage);
    }
}
