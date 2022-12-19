export class ThreadMessage {
  timeStamp: number;
  userName: any;
  profilePic: any;
  message: any;

  constructor(obj?: any) {
    this.timeStamp = obj ? obj.timeStamp : 1669202478396;
    this.userName = obj ? obj.userName : 'Dieter';
    this.profilePic = obj ? obj.profilePic : 'suit_women.png';
    this.message = obj
      ? obj.message
      : 'Hallo Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid odit dignissimos repellendus.';
  }

  toJson() {
    return {
      timeStamp: this.timeStamp,
      userName: this.userName,
      profilePic: this.profilePic,
      message: this.message,
    };
  }
}
