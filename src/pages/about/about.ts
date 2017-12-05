import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AuthorizationService} from "../../services/authorization.service";
import {LoginModalPage} from "../login-modal/login-modal";
import {AttendancesService} from "../../services/attendance.service";

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public attendancesService: AttendancesService,
              public modalCtrl: ModalController,
              public authorizationService: AuthorizationService) {
      let modal = this.modalCtrl.create(LoginModalPage);
      this.authorizationService.isLogged().subscribe((result) => {
          if(result && result.uid){
              console.log('User is logged in');
          }else{
              modal.present().then(() => {
                  attendancesService.getAttendances()
                      .subscribe((result)=>{
                          console.log('User is logged in');
                      }, (error)=>{
                          alert('Ocurrió un error');
                          console.log(error);
                      });
              })
          }
      }, (error) => {
          modal.present().then(() => {
              attendancesService.getAttendances()
                  .subscribe((result)=>{
                      console.log('User is logged in');
                  }, (error)=>{
                      alert('Ocurrió un error');
                      console.log(error);
                  });
          })
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }
  logout(){
      this.authorizationService.logout();
  }

}
