import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {AuthorizationService} from "../../services/authorization.service";

/**
 * Generated class for the LoginModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login-modal',
    templateUrl: 'login-modal.html',
})
export class LoginModalPage {
    formHelper:any = {
        name: null,
        school: null,
        email: null,
        password: null
    };
    isRegistered: boolean = false;
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public authorizationService: AuthorizationService,
                public viewCtrl: ViewController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginModalPage');
    }

    loginWithFacebook(){
        this.authorizationService.loginWithFacebook()
            .then((data)=>{
                alert('Loggeado con éxito!');
                console.log(data);
                this.dismiss();
            })
            .catch((error)=>{
                alert('Hubo un error!');
                console.log(error);
            });
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    ok(){
        if(this.isRegistered){
            this.signInWithEmailAndPassword();
        }else{
            this.registerWithEmailAndPassword();
        }
    }
    toggleRegistered(){
        this.isRegistered = !this.isRegistered;
    }
    registerWithEmailAndPassword(){
        this.authorizationService.registerWithEmailAndPassword(this.formHelper)
            .then((response) => {
                this.authorizationService.addUserDetails(this.formHelper, response);
                alert('Registrado Correctamente');
                console.log(response);
                localStorage.setItem('uid', response.uid);
                this.authorizationService.getUser(response.uid).subscribe((response)=>{
                    console.log(response);
                    localStorage.setItem('user', JSON.stringify(response));
                });
                this.dismiss();
            })
            .catch((error) => {
                alert('Ocurrió un error');
                console.log(error);
            });
    }
    signInWithEmailAndPassword(){
        this.authorizationService.signInWithEmailAndPassword(this.formHelper)
            .then((response) => {
                alert('Loggeado Correctamente');
                localStorage.setItem('uid', response.uid);
                this.authorizationService.getUser(response.uid).subscribe((response)=>{
                    console.log(response);
                    localStorage.setItem('user', JSON.stringify(response));
                });
                this.dismiss();
            })
            .catch((error) => {
                alert('Ocurrió un error');
                console.log(error);
            });
    }
}
