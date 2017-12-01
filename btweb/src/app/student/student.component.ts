import { Component } from '@angular/core';
import {ClassesService} from '../services/classes.service';
import {StudentsService} from "../services/students.service";

@Component({
    selector: 'app-student',
    templateUrl: 'student.component.html'
})
export class StudentComponent {
    students: any [];
    classes: any [];
    class: any;
    date: number;
    qrUrl: string;
    constructor(
        public studentsService: StudentsService,
        public classesService: ClassesService
    ) {
        studentsService.getStudents().valueChanges()
            .subscribe((result) => {
                this.students = result;
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
        const student = {
            student_id: this.date,
            class: this.class,
            qrUrl: this.qrUrl,
            qrCode: qrCode
        };
        console.log(this.class);
        this.studentsService.createStudent(student).then((result) => {
            alert('Pase de lista en curso...');
        });
        console.log(this.qrUrl);
    }
    openStudent(student) {
    }
}
