import { Component } from '@angular/core';
import {AuthorizationService} from '../services/authorization.service';

/**
 * Generated class for the LoginModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'app-component',
    templateUrl: 'login.component.html',
})
export class LoginComponent {
    formHelper: any = {
        name: null,
        school: null,
        email: null,
        password: null
    };
    isRegistered = false;
    constructor(public authorizationService: AuthorizationService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginModalPage');
    }

    loginWithFacebook(){
        this.authorizationService.loginWithFacebook()
            .then((data) => {
                alert('Loggeado con éxito!');
                console.log(data);
            })
            .catch((error) => {
                alert('Hubo un error!');
                console.log(error);
            });
    }
    ok(){
        if (this.isRegistered){
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
                console.log(response);
                localStorage.setItem('uid', response.uid);
            })
            .catch((error) => {
                alert('Ocurrió un error');
                console.log(error);
            });
    }
}
