import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {BLE} from "@ionic-native/ble";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {StudentsService} from "../services/students.service";
import {AttendancePage} from "../pages/attendance/attendance";
import {TabsPage} from "../pages/tabs/tabs";
import {ClassesPage} from "../pages/classes/classes";
import {GroupPage} from "../pages/group/group";
import {ClassesService} from "../services/classes.service";
import {CheckPage} from "../pages/check/check";

export const firebaseConfig = {
    apiKey: "AIzaSyClGHAxQZ_4h7h31tuLfrMxmPNeyskDWP8",
    authDomain: "btcheck-2fe40.firebaseapp.com",
    databaseURL: "https://btcheck-2fe40.firebaseio.com",
    projectId: "btcheck-2fe40",
    storageBucket: "btcheck-2fe40.appspot.com",
    messagingSenderId: "576305456501"
};

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        AttendancePage,
        TabsPage,
        ClassesPage,
        GroupPage,
        CheckPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        AttendancePage,
        TabsPage,
        ClassesPage,
        GroupPage,
        CheckPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        BLE,
        StudentsService,
        ClassesService
    ]
})
export class AppModule {}
