import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Message } from 'src/assets/models/message.class';
import { User } from 'src/assets/models/user.class';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, flatMap } from 'rxjs/operators';
import { Thread } from 'src/assets/models/thread.class';
import { FireService } from '../fire.service';
import { ThreadMessage } from 'src/assets/models/threadMessage.class';
import * as Emojis from '../../assets/emojis.json';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @ViewChild('input') input!: ElementRef;
  public inputField: string = '';
  public isEmojiPickerVisible: boolean;
  public addEmoji(event: any) {
    this.inputField = `${this.inputField}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  getAuth = getAuth();
  fireAuthUser = this.getAuth.currentUser;

  formatting: boolean = true;

  functionText = false;
  codeblock = false;

  @Input() component: any;
  @Input() curentThread: Thread = new Thread();

  user!: User;
  message: Message = new Message();
  newThread: Thread = new Thread();

  // file upload
  fileName: any = '';
  fb: any;
  selectedFile: any;
  downloadURL: any = Observable<string>;
  showPreview: boolean = false;
  //

  constructor(
    private firestore: Firestore,
    private storage: AngularFireStorage,
    public auth: AuthService,
    public fire: FireService
  ) {}

  emojis: any = Emojis;
  ngOnInit(): void {
    this.getUser();
  }

  sendMessage() {
    if (this.component.name == 'output') {
      this.sendMessageToMessages();
      this.showPreview = false;
    }
    if (this.component.name == 'thread') {
      this.sendMessageToThread();
      this.showPreview = false;
    }
  }

  sendMessageToThread() {
    this.curentThread.threadMessages.push(this.updateThread());
    this.fire.updateDocData(
      this.fire.actChannel,
      this.fire.actMessID,
      this.curentThread
    );
    this.input.nativeElement.value = '';
  }

  sendMessageToMessages() {
    this.setMessage();
    this.setNewThread();
    this.input.nativeElement.value = '';
    this.fire.updateDocData(
      this.fire.actChannel,
      this.message.ID,
      this.message.toJson()
    );
    this.fire.updateDocData(
      this.fire.actChannel + 'Threads',
      this.message.ID,
      this.newThread.toJson()
    );
  }

  updateMessages() {
    const mesRef = collection(this.firestore, 'messages');
    setDoc(doc(mesRef, this.message.ID), this.message.toJson());
  }

  setMessage() {
    console.log('sendMessage');

    this.message = new Message();
    this.message.userName = this.user.displayName;
    this.message.ID = this.message.createID(20);
    this.message.message = this.input.nativeElement.value;
    this.message.timeStamp = new Date().getTime();
    this.message.channel = this.fire.actChannel;
    this.message.pictureUrl = this.fb ? this.fb : '';
    this.message.threadMessages = [];
  }

  setNewThread() {
    this.newThread = new Thread({
      message: this.message.toJson(),
      threadMessages: [],
    });
  }

  updateThread() {
    return new ThreadMessage({
      timeStamp: new Date().getTime(),
      userName: this.user.displayName,
      profilePic: this.user.profilePic,
      message: this.input.nativeElement.value,
    }).toJson();
  }

  toggleFormatting() {
    this.formatting = !this.formatting;
  }

  getUser() {
    if (this.fireAuthUser !== null) {
      this.user = new User({
        uid: this.fireAuthUser.uid,
        displayName: this.fireAuthUser.displayName,
        profilePic: 'suit_women.png',
        email: this.fireAuthUser.email,
        channels: ['Angular', 'JavaSkript'],
        directMessages: [],
      });
    }
  }

  // upload file to storage
  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = `uploadedImages/${
      file.name + Math.floor(Math.random() * 1000000000)
    }`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.fileName = file.name;
    task
      .snapshotChanges()
      .pipe(finalize(() => this.getUrl(fileRef)))
      .subscribe((url) => {
        if (url) {
          this.emptyTask(task);
        }
      });
  }

  emptyTask(task: any) {
    task = '';
  }

  deleteImgStorage(fb: any) {
    this.storage.storage.refFromURL(fb).delete();
    this.fb = '';
    this.showPreview = false;
  }

  textToFunction() {
    this.functionText = !this.functionText;
  }

  textToCodeblock() {}

  getUrl(fileRef) {
    fileRef.getDownloadURL().subscribe((url) => {
      this.fb = url;
      if (url) {
        this.showPreview = true;
      }
    });
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
}
