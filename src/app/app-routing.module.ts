import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import {
  redirectLoggedInTo,
  canActivate,
  redirectUnauthorizedTo,
  AuthGuard,
} from '@angular/fire/auth-guard';
import { OutputComponent } from './output/output.component';

const routes: Routes = [
  //for sign-in
  { path: '', redirectTo: 'output', pathMatch: 'full' },
  {
    path: 'signin',
    component: SignInComponent,
    ...canActivate(() => redirectLoggedInTo(['output'])),
  },
  {
    path: 'signup',
    component: SignUpComponent,
    ...canActivate(() => redirectLoggedInTo(['output'])),
  },
  {
    path: 'output',
    component: OutputComponent,
    //canActivate: [AuthGuard],
    //data: {
    //  AuthGuardPipe: () => redirectUnauthorizedTo(['signin']),
    //},
    ...canActivate(() => redirectUnauthorizedTo(['signin'])),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
