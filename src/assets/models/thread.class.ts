import { objectVal } from '@angular/fire/database';
import { ThreadMessage } from '../models/threadMessage.class';
import { Message } from './message.class';

export class Thread {
  message: Message;
  threadMessages: any[];

  constructor(obj?: any) {
    this.threadMessages = obj
      ? obj.threadMessages
      : [new ThreadMessage().toJson(), new ThreadMessage().toJson()];
    this.message = obj
      ? obj.message
      : new Message({
          userName: 'Horst',
          profilePic: 'profile.png',
          ID: 'rwghngbfgefxxxxx',
          message: 'das funktioniert schonmal',
          timeStamp: 4589658789654,
          channel: 'Angular',
          pictureUrl: '',
        }).toJson();
  }

  toJson() {
    return {
      message: this.message,
      threadMessages: this.threadMessages,
    };
  }
}
