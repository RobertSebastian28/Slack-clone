import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

import { updateProfile } from '@firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { BehaviorSubject, forkJoin, from, switchMap } from 'rxjs';
import { SigninCredentials, SignupCredentials } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = new BehaviorSubject<Object | null>(null);

  readonly isLoggedIn$ = authState(this.auth);

  userRef: any;

  constructor(private auth: Auth, private firestore: Firestore) {
    this.userRef = collection(this.firestore, 'users');
  }

  getCurrentUser() {
    return this.auth.currentUser!;
  }

  signIn({ email, password }: SigninCredentials) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signUp({ email, password, displayName }: SignupCredentials) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap(({ user }) =>
        forkJoin([
          updateProfile(user, { displayName }),
          //ToDo
          setDoc(doc(this.userRef), { user: 'user' }),
        ])
      )
    );
  }

  signOut() {
    return from(this.auth.signOut());
  }

  createFirestoreUser(user: any) {
    setDoc(doc(this.userRef), user);
  }
}
