import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {AttendanceComponent} from './attendance/attendance.component';
import {AttendancesService} from './firebase.service';
import {FormsModule} from '@angular/forms';
import {ClassesService} from './services/classes.service';
import {AuthorizationService} from './services/authorization.service';
import {LoginComponent} from './login/login.component';
import {StudentsService} from "./services/students.service";
import {StudentComponent} from "./student/student.component";
import {ClaseComponent} from "./clase/clase.component";

export const firebaseConfig = {
    apiKey: 'AIzaSyClGHAxQZ_4h7h31tuLfrMxmPNeyskDWP8',
    authDomain: 'btcheck-2fe40.firebaseapp.com',
    databaseURL: 'https://btcheck-2fe40.firebaseio.com',
    projectId: 'btcheck-2fe40',
    storageBucket: 'btcheck-2fe40.appspot.com',
    messagingSenderId: '576305456501',
};

const appRoutes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'attendance', component: AttendanceComponent},
    {path: 'student', component: StudentComponent},
    {path: 'clase', component: ClaseComponent},
    {path: 'login', component: LoginComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        AttendanceComponent,
        StudentComponent,
        LoginComponent,
        ClaseComponent
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        RouterModule.forRoot(appRoutes),
        FormsModule
    ],
    providers: [AttendancesService, ClassesService, AuthorizationService, AttendancesService, StudentsService],
    bootstrap: [AppComponent]
})
export class AppModule { }
