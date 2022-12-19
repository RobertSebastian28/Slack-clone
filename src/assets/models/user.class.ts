export class User {
  uid!: any;
  displayName!: any;
  email!: any;
  profilePic!: any;
  channels!: any[];
  directMessages!: any[];

  constructor(obj?: any) {
    this.displayName = obj ? obj.displayName : 'User' + this.createID(5);
    this.email = obj ? obj.email : 'email';
    this.uid = obj ? obj.uid : 'uid';
    this.profilePic = obj ? obj.profilePic : 'profile.png';
    this.channels = obj ? obj.channels : '[]';
    this.directMessages = obj ? obj.directMessages : '[]';
  }

  toJson() {
    return {
      displayName: this.displayName,
      email: this.email,
      uid: this.uid,
      profilePic: this.profilePic,
      channels: this.channels,
      directMessages: this.directMessages,
    };
  }

  createID(length: number) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength)); // adding one random character of characters to result
    }
    return result;
  }
}
