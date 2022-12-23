import { Component, OnInit } from '@angular/core';
import { Channel } from 'src/assets/models/channel.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss']
})
export class AddChannelComponent implements OnInit {
  channel = new Channel();

  constructor(private firestore: AngularFirestore,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addChannel() {
    this.firestore
      .collection('channels')
      .add(this.channel.toJson())
      .then((result: any) => {
        console.log('channel added', result);
      })
  }
}
