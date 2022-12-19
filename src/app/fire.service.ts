import { Injectable } from '@angular/core';
import { collectionData, docData } from '@angular/fire/firestore';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FireService {
  actChannel: string = 'Projektabgabe';
  actMessID: string;

  constructor(private fire: Firestore) {}

  getCollData(collPath: string) {
    return collectionData(this.setRef(collPath));
  }

  /**
   *
   * @param collPath A slash-separated path to a collection.
   * @param docPath A slash-separated path to a document.
   * @returns
   */
  getDocData(collPath: string, docPath: string) {
    return docData(doc(this.setRef(collPath), docPath));
  }

  /**
   *
   * @param collPath A slash-separated path to a collection.
   * @param docPath A slash-separated path to a document.
   * @param upData A map of the fields and values for the UPDATED document.
   */
  updateDocData(collPath: string, docPath: string, upData: object) {
    setDoc(doc(this.setRef(collPath), docPath), upData);
  }

  /**
   *
   * @param ref A slash-separated path to a collection.
   * @returns The CollectionReference instance.
   */
  setRef(ref: string) {
    return collection(this.fire, ref);
  }
}
