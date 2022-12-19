import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SideInfoComponent } from './side-info/side-info.component';
import { SideToppingsComponent } from './side-toppings/side-toppings.component';
import { InputComponent } from './input/input.component';
import { OutputComponent } from './output/output.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThreadComponent } from './thread/thread.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { FormComponent } from './auth/form/form.component';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { AddChannelComponent } from './add-channel/add-channel.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AddAppComponent } from './add-app/add-app.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    FormComponent,
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    SideInfoComponent,
    SideToppingsComponent,
    InputComponent,
    OutputComponent,
    ThreadComponent,
    AddChannelComponent,
    AddAppComponent,
  ],
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatSidenavModule,
    MatFormFieldModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    CommonModule,
    MatDividerModule,
    RouterModule,
    MatSnackBarModule,
    HttpClientModule,
    MatDialogModule,
    PickerModule,
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    InputComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
