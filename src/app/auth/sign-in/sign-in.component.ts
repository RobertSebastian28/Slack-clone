import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { getExperimentalSetting } from '@firebase/util';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [Validators.minLength(6)]),
    });
  }

  signIn() {
    this.auth.signIn(this.form.value).subscribe({
      next: () => this.router.navigate(['output']),
      error: (error) => this.snackbar.open(error.message),
    });
    setTimeout(() => {
      this.snackbar.dismiss();
    }, 2000);
  }

  switchToSignUp() {
    this.router.navigate(['signup']);
  }

  guestLogin() {
    this.form = new FormGroup({
      email: new FormControl('guest@gmail.com', [Validators.email]),
      password: new FormControl('GastLogin', [Validators.minLength(6)]),
    });
    this.auth.signIn(this.form.value).subscribe({
      next: () => this.router.navigate(['output']),
    });
  }
}
