import { ThreadMessage } from './threadMessage.class';

export class Message {
  userName: any;
  profilePic: any;
  ID: any;
  message: any;
  timeStamp: any;
  channel: any;
  pictureUrl: string;
  threadMessages: any[];

  constructor(obj?: any) {
    this.userName = obj ? obj.userName : 'User' + this.createID(5);
    this.profilePic = obj ? obj.profilePic : 'suit_women.png';
    this.ID = obj ? obj.ID : this.createID(20);
    this.message = obj
      ? obj.message
      : 'message message message message message message';
    this.timeStamp = obj ? obj.timeStamp : 9999999999999;
    this.channel = obj ? obj.channel : 'Test';
    this.pictureUrl = obj ? obj.pictureUrl : '';
    this.threadMessages = obj
      ? obj.threadMessages
      : [new ThreadMessage().toJson(), new ThreadMessage().toJson()];
  }

  toJson() {
    return {
      ID: this.ID,
      userName: this.userName,
      profilePic: this.profilePic,
      message: this.message,
      timeStamp: this.timeStamp,
      pictureUrl: this.pictureUrl,
      channel: this.channel,
      threadMessages: this.threadMessages,
    };
  }

  createID(length: number) {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength)); // adding one random character of characters to result
    }
    return result;
  }
}
