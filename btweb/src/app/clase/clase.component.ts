import { Component } from '@angular/core';
import {ClassesService} from '../services/classes.service';

@Component({
    selector: 'app-clase',
    templateUrl: 'clase.component.html'
})
export class ClaseComponent {
    clases: any [];
    classes: any [];
    class: any;
    date: number;
    qrUrl: string;
    clase: any = {
        school_id: null,
        firstName: null,
        lastName: null
    };
    constructor(
        public classesService: ClassesService
    ) {
        classesService.getClasses().valueChanges()
            .subscribe((result) => {
                this.clases = result;
            }, (error) => {
                alert('Ocurrió un error');
                console.log(error);
            });
        classesService.getClasses().valueChanges()
            .subscribe((result) => {
                this.classes = result;
                console.log(result);
            });
    }
    getQR() {
        this.date = Date.now();
        const qrCode = localStorage.getItem('uid') + '||' + this.date;
        this.qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=900x900&data=' + qrCode;
        const clase = {
            clase_id: this.date,
            class: this.class,
            qrUrl: this.qrUrl,
            qrCode: qrCode
        };
        console.log(this.class);
        this.classesService.createClass(clase).then((result) => {
            alert('Pase de lista en curso...');
        });
        console.log(this.qrUrl);
    }
    openClase(clase) {
    }
    saveClase(){
        this.classesService.createClass(this.clase).then((result) => {
            alert('Estudiante guardado con éxito');
        });
    }
    editClase(s){
        this.clase = s;
    }
    deleteClase(s){
        this.classesService.deleteClass(s).then(()=>{
            alert('Estudiante eliminado con éxito');
        });
    }
}
