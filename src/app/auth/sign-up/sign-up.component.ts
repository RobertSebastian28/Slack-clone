import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { collection, doc, setDoc } from 'firebase/firestore';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      displayName: new FormControl('', [Validators.minLength(3)]),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(6)]),
    });
  }

  signUp() {
    this.auth.signUp(this.form.value).subscribe({
      next: () => this.router.navigate(['output']),
      //next: () => this.createFirestoreUser(user),
      error: (error) => this.snackbar.open(error.message),
    });
  }

  switchToSignIn() {
    this.router.navigate(['signin']);
  }

  createFirestoreUser(user: any) {
    const userRef = collection(this.firestore, 'users');
    setDoc(doc(userRef), user);
    console.log(user);
  }
}
