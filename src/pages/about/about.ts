import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthorizationService} from "../../services/authorization.service";

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
              public authorizationService: AuthorizationService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }
  logout(){
      this.authorizationService.logout();
  }

}
