import { Component } from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {HomePage} from "../home/home";
import {AttendancePage} from "../attendance/attendance";
import {ClassesPage} from "../classes/classes";
import {AboutPage} from "../about/about";
@IonicPage()
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class TabsPage {
    homePage = HomePage;
    attendancePage = AttendancePage;
    classesPage = ClassesPage;
    aboutPage = AboutPage;
}
