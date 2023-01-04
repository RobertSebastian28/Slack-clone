import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Message } from 'src/assets/models/message.class';
import { Thread } from 'src/assets/models/thread.class';
import { FireService } from '../fire.service';
import * as Emojis from '../../assets/emojis.json';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
})
export class OutputComponent implements OnInit {
  @ViewChild('content') private content: ElementRef;

  emojis: any = Emojis;
  index = '';
  hoverReact = false;
  showFiller = false;

  component: object = {
    name: 'output',
    textPlaceholder: 'Nachricht an # ',
    channel: this.fire.actChannel,
  };
  message: Message;
  curentThread: Message = new Message();
  currentThreadHeadder: string = 'Undifined';

  channel: any = [];

  constructor(
    private firestore: Firestore,
    public fire: FireService,
    private inputComponent: InputComponent
  ) { }

  functionText = this.inputComponent.functionText;
  seen: number = 1;

  ngOnInit(): void { }

  scrollToBottom(): void {
    try {
      this.content.nativeElement.scrollTop =
        this.content.nativeElement.scrollHeight;
    } catch (err) {
      console.log('output', err);
    }
  }

  openDialog() {
    let id: any = 'dialog';
    let dialogContainer: any = document.getElementById(id);
    dialogContainer.style.display = 'flex';
    dialogContainer.innerHTML = 'Diese Function wurde noch nicht Implementiert';

    setTimeout(() => {
      dialogContainer.style.display = 'none';
    }, 1800);
  }

  openThread(messageID: any) {
    this.fire.actMessID = messageID;
    this.fire
      .getDocData(this.fire.actChannel, messageID)
      .subscribe((doc: any) => {
        this.curentThread = doc;
        this.currentThreadHeadder = this.curentThread.channel;
      });
  }

  updateChannel(channel: string) {
    this.channel = channel;
    setTimeout(() => {
      this.scrollToBottom();
    }, 1);
  }

  /**
   *
   * @param timeStamp in milliseconds
   * @returns 24Hours-Time in Hours:Minuts + 'Uhr'
   */
  convertTimeStamp(timeStamp: any) {
    let date = new Date(timeStamp),
      min = ('0' + (date.getMinutes() + 1)).slice(-2),
      hr = ('0' + (date.getHours() + 1)).slice(-2);

    return [hr, min].join(':') + ' Uhr';
  }

  seenReact(i) {
    document.getElementById("emoji-container-seen" + i).classList.remove("hidden");
  }

  showResponsiveSideBar() {
    let sidebarContainer = document.getElementById('sidebar-container');
    sidebarContainer.style.display = 'flex';
  }

  hideResponsiveSideBar() {
    if (window.innerWidth <= 920) {
      let sidebarContainer = document.getElementById('sidebar-container');
      sidebarContainer.style.display = 'none';
    }
  }
}
