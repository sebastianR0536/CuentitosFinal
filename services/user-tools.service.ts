import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from './interfaces/user';
import { Book } from './interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class UserToolsService {


  constructor(private firestore: AngularFirestore) { }
  page = 0

  public updateMarker(idUser: string, page: string, idBook:number) {
    const docRef = this.firestore.collection('USUARIOS').doc(idUser);

    docRef.get().toPromise().then((docSnapshot: any | undefined) => {
      if (docSnapshot.exists) {
        const data = docSnapshot.data();
        const contacts = data.readingHistory || []; // Si no hay contactos previos, crea un array vacío
        // Busca el objeto por su ID
        const existingContactIndex = contacts.findIndex((contact: any) => contact.id === idBook);
        if (existingContactIndex !== -1) {
          const updatedContacts = contacts.map((contact: any, index: number) => {
            if (index === existingContactIndex) return { ...contact, page: page };
            return contact;
          });
          docRef.update({ readingHistory: updatedContacts })
        }else{
          const fieldValue = data.readingHistory;
          const newArray = contacts.concat({ id: idBook, page: page }); // Agrega el nuevo contacto al array existente
          docRef.update({ readingHistory: newArray })
        }
      }
    });






  }

  public getMarkerF(idUser: string, idBook:number): Promise<number> {
    const docRef = this.firestore.collection('USUARIOS').doc(idUser);
    return docRef.get().toPromise().then((docSnapshot: any | undefined) => {
      if (docSnapshot.exists) {
        const data = docSnapshot.data();
        const readingHistory = data.readingHistory || [];
        const readingItem = readingHistory.find((item: { id: number; }) => item.id === idBook);
        const page = readingItem ? readingItem.page : 1;
        return page;
      } else {
        return 1;
      }
    });
  }
  
  public async getMarker(idUser: string, idBook:number): Promise<number>{
    const page = await this.getMarkerF(idUser,idBook);
    this.page = page;
    return page;
  }

  public getUser(id: string): Observable<any>{
    return this.firestore.doc(`USUARIOS/${id}`).snapshotChanges();
  }

  public updateUser(user: User){
    this.firestore.doc(`USUARIOS/${user.uid}`).update(user);
  }

  public updateFavoritesBooks(iduser: string, favbooks: string[]){
    this.firestore.doc(`USUARIOS/${iduser}`).update({
      favoriteBooksList: favbooks
    });
  }

  public updatePendingBooks(iduser: string, pengbooks: string[]){
    this.firestore.doc(`USUARIOS/${iduser}`).update({
      pendingBooksList: pengbooks
    });
  }

  public updateReadingBooks(iduser: string, readbooks: string[]){
    this.firestore.doc(`USUARIOS/${iduser}`).update({
      readingBooksList: readbooks
    });
  }

  public updateFinishedBooks(iduser: string, finbooks: string[]){
    this.firestore.doc(`USUARIOS/${iduser}`).update({
      finishedBooksList: finbooks
    });
  }

  public getBookforISBN(isbn: number): Observable<any> {
    return this.firestore.collection('LIBROS', ref => ref.where('isbn', '==', isbn)).snapshotChanges()
  }


}

