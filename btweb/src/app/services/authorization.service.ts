import { Injectable } from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth/auth";
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class AuthorizationService{
    constructor(private angularFireAuth: AngularFireAuth,
                public afDB: AngularFireDatabase){
        this.isLogged();
    }
    public registerWithEmailAndPassword = (user) => {
        return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    };
    public signInWithEmailAndPassword = (user) => {
        return this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    };
    loginWithFacebook(){
        return this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
    addUserDetails(user, fbUser){
        this.afDB.database.ref("users").child(fbUser.uid).set({name:user.name, school:user.school});
    }
    public logout(){
        this.angularFireAuth.auth.signOut();
    }
    public isLogged(){
        return this.angularFireAuth.authState;
    }
}