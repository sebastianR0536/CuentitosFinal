import { Injectable, NgZone } from '@angular/core';
import { User } from './interfaces/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Auth, updateEmail, updatePassword } from '@angular/fire/auth';
import { where } from "@angular/fire/firestore";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  DisplayName: any;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private afnewAuth: Auth
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.afs.collection<User>('USUARIOS')
              .doc(user.uid)
              .valueChanges()
              .pipe(
                map(user => user as User)
              ).subscribe(user => {
                if (user.plan == "sinPlan") {
                  this.router.navigate(['/PLAN', user.email, user.displayName])
                } else {
                  sessionStorage.setItem('user', JSON.stringify(user));
                  this.router.navigate(['/']);
                }
              })
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignUp(email: string, password: string, displayName: string, plan: string, url: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        //this.SendVerificationMail();
        this.DisplayName = displayName;
        this.SetUserData(result.user);
        console.log(result.user);
        sessionStorage.setItem('user', JSON.stringify(result.user));
        //this.router.navigate(['/']);
        var Url = url + "?prefilled_email=" + email
        location.href = Url
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    if (sessionStorage.getItem('user')) {
      var obj = sessionStorage.getItem('user');
      obj = JSON.parse(obj!);
      console.log(obj);
      return true;
    } else {
      return false;
    }
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `USUARIOS/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: this.DisplayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      plan: "Loading",
      favoriteBooksList: [],
      readingBooksList: [],
      finishedBooksList: [],
      pendingBooksList: [],
      followers: [],
      following: [],
      readingHistory: [],
      rol: 'USER',
      notifications: []
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  get isAdmin(): Observable<boolean> {
    const admin = sessionStorage.getItem('user');
    if (admin) {
      var obj = JSON.parse(admin);
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`USUARIOS/${obj.uid}`);

      // Obtener el valor del campo 'rol' del documento del usuario
      return userRef.valueChanges().pipe(
        map(rol => {
          return rol.rol === 'ADMIN';
        })
      );
    } else {
      return of(false);
    }
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      console.log("se elimina")
      sessionStorage.clear();
      this.router.navigate(['/']);
    });
  }

  UpdateEmail(email: string) {
    return updateEmail(this.afnewAuth.currentUser!, email)
  }

  UpdatePlan(plan: string, email: string) {
    const query = this.afs.collection('USUARIOS', ref => ref.where('email', '==', email.toLowerCase()));

    query.get().subscribe((querySnapshot) => {
      if (!querySnapshot.empty) {
        // Obtener el ID del documento del usuario
        const userId = querySnapshot.docs[0].id;

        // Actualizar el campo "plan" del usuario
        this.afs.collection('USUARIOS').doc(userId).update({ plan: plan })
          .then(() => {
            console.log('Campo "plan" actualizado correctamente.');
          })
          .catch((error) => {
            console.error('Error al actualizar el campo "plan":', error);
          });
      } else {
        console.log('No se encontró ningún usuario con el correo electrónico especificado.');
      }
    });

  }

  CurrencyUser() {
    return this.afnewAuth.currentUser;
  }

  UpdatePassword(newpassword: string) {
    return updatePassword(this.afnewAuth.currentUser!, newpassword);
  }

}
