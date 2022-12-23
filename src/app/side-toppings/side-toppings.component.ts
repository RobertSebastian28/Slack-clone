import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Channel } from 'src/assets/models/channel.class';
import { DirectUserMessage } from 'src/assets/models/directUserMessage';
import { Message } from 'src/assets/models/message.class';
import { AddChannelComponent } from '../add-channel/add-channel.component';
import { FireService } from '../fire.service';

@Component({
  selector: 'app-side-toppings',
  templateUrl: './side-toppings.component.html',
  styleUrls: ['./side-toppings.component.scss'],
})
export class SideToppingsComponent implements OnInit {
  topics = ['Channels', 'Direktnachrichten'];

  @Output() newSideTopingEvent = new EventEmitter<any>();
  channelArray: any = [];
  userArray: any = [];

  channel = new Channel();
  allChannels = [];
  direktUserMessage = new DirectUserMessage();
  allDirektUserMessages = [];


  channelsActive = false;
  directmessagesActive = false;

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    public fire: FireService
  ) { }

  ngOnInit(): void {
    this.ChannelChanges();
    this.DirektMessageChanges();

    this.loadChannel(this.fire.actChannel);
  }

  ChannelChanges() {
    this.firestore
      .collection('channels')
      .valueChanges({ idField: 'id' })
      .subscribe((changes: any) => {
        this.allChannels = changes;
      });
  }

  DirektMessageChanges() {
    this.firestore
      .collection('Users')
      .valueChanges({ idField: 'id' })
      .subscribe((changes: any) => {
        this.allDirektUserMessages = changes;
      });
  }

  showChannels() {
    this.channelsActive = !this.channelsActive;
  }

  showDirectMessages() {
    this.directmessagesActive = !this.directmessagesActive;
  }

  openChannelDialog() {
    this.dialog.open(AddChannelComponent);
  }

  loadChannel(channel: string) {
    this.setChannel(channel);
    this.fire.actChannel = channel;
  }

  setChannel(channel: string) {
    this.fire.getCollData(channel).subscribe((CollData: any) => {
      this.channelArray = CollData.sort((a: Message, b: Message) => {
        return a.timeStamp - b.timeStamp;
      });
      this.newSideTopingEvent.emit(this.channelArray);
    });
  }

  loadDirektUserMessages(Users: string) {
    this.setDirectUserMessage(Users);
    this.fire.actChannel = Users;
  }

  setDirectUserMessage(Users: string) {
    this.fire.getCollData(Users).subscribe((CollData: any) => {
      this.userArray = CollData.sort((a: Message, b: Message) => {
        return a.timeStamp - b.timeStamp;
      });
      this.newSideTopingEvent.emit(this.userArray);
    });
  }
}
