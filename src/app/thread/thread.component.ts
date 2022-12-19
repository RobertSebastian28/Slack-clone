import {
  Component,
  ElementRef,
  Injectable,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Message } from 'src/assets/models/message.class';
import { Thread } from 'src/assets/models/thread.class';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class ThreadComponent implements OnInit, OnChanges {
  @ViewChild('content') private content: ElementRef;
  @Input() curentThread: Message = new Message();
  component: object = {
    name: 'thread',
    textPlaceholder: 'Antworten...',
    channel: '',
  };

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      setTimeout(() => {
        this.scrollToBottom();
      }, 1);
    }
  }

  scrollToBottom(): void {
    try {
      this.content.nativeElement.scrollTop =
        this.content.nativeElement.scrollHeight;
    } catch (err) {
      console.log('thread', err);
    }
  }

  /**
   *
   * @param timeStamp in milliseconds
   * @returns 24Hours-Time in Hours:Minuts + 'Uhr' => 20:15 Uhr
   */
  convertTimeStamp(timeStamp: number) {
    let date = new Date(timeStamp),
      min = ('0' + (date.getMinutes() + 1)).slice(-2),
      hr = ('0' + (date.getHours() + 1)).slice(-2);

    return [hr, min].join(':') + ' Uhr';
  }
}
