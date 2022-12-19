import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { App } from 'src/assets/models/app.class';

@Component({
  selector: 'app-add-app',
  templateUrl: './add-app.component.html',
  styleUrls: ['./add-app.component.scss']
})
export class AddAppComponent implements OnInit {
  app = new App();

  constructor(private firestore: AngularFirestore,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addApp() {
    this.firestore
    .collection('apps')
    .add(this.app.toJson())
    .then((result: any) => {
      console.log('app added', result);
    })
  }

}
