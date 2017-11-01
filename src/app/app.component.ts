import { Component } from '@angular/core';
import {ModalController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {LoginModalPage} from "../pages/login-modal/login-modal";
import {AuthorizationService} from "../services/authorization.service";
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = TabsPage;

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        public modalCtrl: ModalController,
        public authorizationService: AuthorizationService) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
            // let modal = this.modalCtrl.create(LoginModalPage);
            // this.authorizationService.isLogged().subscribe((result) => {
            //     if(result && result.uid){
            //         console.log('User is logged in');
            //     }else{
            //         modal.present();
            //     }
            // }, (error) => {
            //     modal.present();
            // });
        });
    }
}