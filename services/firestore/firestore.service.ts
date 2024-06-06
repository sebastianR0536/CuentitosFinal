import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Book } from '../interfaces/book';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    private fire: Firestore
  ) {}
  //Crea un nuevo libro
  public createBook(book: Book) {
    return this.firestore.collection('LIBROS').add(book);
  }
  //Obtiene un libro
  public getBook(documentId: string) {
    return this.firestore.collection('LIBROS').doc(documentId).snapshotChanges();
  }
  //Elimina un libro
  public deleteBook(documentId: string) {
    return this.firestore.collection('LIBROS').doc(documentId).delete();
  }
  //Obtiene todos los libros
  public getBooks() {
    return this.firestore.collection('LIBROS').snapshotChanges();
  }
  //Actualiza un libro
  public updateBook(documentId: string, book: Book) {
    return this.firestore.collection('LIBROS').doc(documentId).set(book);
  }

  //Crea un nuevo usuario
  public createUser(user: User) {
    return this.firestore.collection('USUARIOS').add(user);
  }
  //Elimina un usuario
  public deleteUser(documentId: string) {
    return this.firestore.collection('USUARIOS').doc(documentId).delete();
  }
  //Obtiene todos los usuarios
  public getUsers() {
    return this.firestore.collection('USUARIOS').snapshotChanges();
  }

  //Actualiza un usuario
  public updateUser(documentId: string, user: User){
    return this.firestore.collection('USUARIOS').doc(documentId).set(user);
  }
  

  //Obtiene todos los audioLibros
  public getAudioBooks() {
    return this.firestore.collection('AUDIOLIBROS').snapshotChanges();
  }

  public getUser(uid: string){
    const documento = doc(this.fire, `USUARIOS/${uid}`)
    return docData(documento) as Observable<User>
  }
}