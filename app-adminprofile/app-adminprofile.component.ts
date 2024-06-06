import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Book } from '../services/interfaces/book';
import { User } from '../services/interfaces/user';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service';
import { BookDescriptionService } from '../services/book-description.service'
import { NgForm } from '@angular/forms'
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-app-adminprofile',
  templateUrl: './app-adminprofile.component.html',
  styleUrls: ['./app-adminprofile.component.css']
})
export class AppAdminprofileComponent implements OnInit {

  booksClicked: boolean;
  public books: any;
  public users: any;
  selectedBooks: Array<any> = [];
  public currentBook: any;
  public currentUser: any;



  constructor(public firestoreService: FirestoreService, public bookDescriptionService: BookDescriptionService, public router: Router, public authService: AuthService) {
    this.booksClicked = true;
    this.currentBook = "";
    this.currentUser = "";
  }

  ngOnInit(): void {
    this.authService.isAdmin.subscribe(isAdmin => {
      console.log(isAdmin)
      !isAdmin ? this.router.navigate(['/']) : null
    });

    this.books = sessionStorage.getItem("books");
    this.books = JSON.parse(this.books);
    //Obtenemos Coleccion Libros
    this.firestoreService.getBooks().subscribe((catsSnapshot) => {
      this.books = [];
      catsSnapshot.forEach((catData: any) => {
        this.books.push({

          id: catData.payload.doc.id,
          title: catData.payload.doc.data().title,
          sinopsis: catData.payload.doc.data().sinopsis,
          author: catData.payload.doc.data().author,
          publicationDate: catData.payload.doc.data().publicationDate,
          uploadDate: catData.payload.doc.data().uploadDate,
          editorial: catData.payload.doc.data().editorial,
          isbn: catData.payload.doc.data().isbn,
          reviews: catData.payload.doc.data().reviews,
          comments: catData.payload.doc.data().comments,
          genre: catData.payload.doc.data().genre,
          url: catData.payload.doc.data().url,
          read: catData.payload.doc.data().read,
          imageURL: this.embeddingDriveImg(catData.payload.doc.data().imageURL.split("/")[5]),
          pages: catData.payload.doc.data().pages,
          lan: catData.payload.doc.data().lan
        });
        sessionStorage.setItem('books', JSON.stringify(this.books))
      })
    });
    console.log(this.books);


    //Obtenemos Coleccion Usuarios
    this.firestoreService.getUsers().subscribe((catsSnapshot) => {
      this.users = [];
      catsSnapshot.forEach((catData: any) => {
        this.users.push({
          id: catData.payload.doc.id,
          uid: catData.payload.doc.data().uid,
          email: catData.payload.doc.data().email,
          displayName: catData.payload.doc.data().displayName,
          photoURL: catData.payload.doc.data().photoURL,
          emailVerified: catData.payload.doc.data().emailVerified,
          plan: catData.payload.doc.data().plan,
          favoriteBooksList: catData.payload.doc.data().favoriteBooksList,
          followers: catData.payload.doc.data().followers,
          following: catData.payload.doc.data().following,
          readingHistory: [],
          rol: catData.payload.doc.data().rol,
          notifications: catData.payload.doc.data().notifications
        });
        sessionStorage.setItem('users', JSON.stringify(this.users))
      })
    });
    this.users = sessionStorage.getItem("users");
    this.users = JSON.parse(this.users);
    console.log(this.users);
  }

  addBook(title: string,
    sinopsis: string,
    author: string,
    publicationDate: string,
    uploadDate: string,
    editorial: string,
    isbn: string,
    genre: string,
    url: string,
    imageURL: string,
    pages: string,
    lan:string) {
    const numberisbn = parseInt(isbn)
    const numberpages = parseInt(pages)
    const book: Book = {
      title: title, sinopsis: sinopsis, author: author, publicationDate: publicationDate, uploadDate: uploadDate,
      editorial: editorial, isbn: numberisbn, reviews: [], comments: [], genre: genre, url: url, read: [], imageURL: imageURL, pages: numberpages, lan:lan
    }

    this.firestoreService.createBook(book)
    this.clearModal()
  }

  addUser(email: string,
    displayName: string,
    photoURL: string,
    plan: string) {

    const user: User = {
      uid: this.generateRandomId(),
      email: email,
      displayName: displayName,
      photoURL: photoURL,
      emailVerified: true,
      plan: plan,
      favoriteBooksList: [],
      followers: [],
      following: [],
      readingHistory: [],
      rol: 'USER',
      notifications: []
    }

    this.firestoreService.createUser(user);
    this.clearModal();
  }

  generateRandomId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 28; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  embeddingDriveImg(data: string) {
    return "https://drive.google.com/uc?export=view&id=" + data
  }

  clearModal() {
    //(<HTMLInputElement> document.querySelector('title')).value=''
    let n = document.getElementsByTagName('input').length
    let inputs = document.getElementsByTagName('input')

    for (let i = 0; i < n; i++) {
      inputs[i].value = ''
    }

  }

  changestate(state: boolean) {
    this.booksClicked = state;
    console.log(this.booksClicked);
  }

  deleteSelectedBooks() {
    for (let book of this.books) {
      let checkbox = document.getElementById(`checkbox_${book.id}`) as HTMLInputElement;
      if (checkbox.checked) {
        this.firestoreService.deleteBook(book.id)
      }
    }
  }

  deleteSelectedUsers() {
    for (let user of this.users) {
      let checkbox = document.getElementById(`checkbox_${user.id}`) as HTMLInputElement;
      if (checkbox.checked) {
        this.firestoreService.deleteUser(user.id)
      }
    }
  }

  viewBook(id: Book) {
    this.bookDescriptionService.updateDescripcion(id)
    this.router.navigate(['BOOKDESCRIPTION']);

  }

  getCurrentBook(a: Book) {
    this.currentBook = a;
  }

  getCurrentUser(a: User) {
    this.currentUser = a;
  }

  editBookForm(editForm: NgForm, title: string, sinopsis: string, author: string, publicationDate: string,
    uploadDate: string, editorial: string, isbn: string, genre: string, url: string, imageURL: string, pages: string, lan:string): void {

    var fieldValues = [title, sinopsis, author, publicationDate, uploadDate, editorial, isbn, genre, url, imageURL, pages]

    const book: Book = {
      title: fieldValues[0], sinopsis: fieldValues[1], author: fieldValues[2], publicationDate: fieldValues[3], uploadDate: fieldValues[4],
      editorial: fieldValues[5], isbn: parseInt(fieldValues[6]), reviews: this.currentBook.reviews, comments: this.currentBook.comments, genre: fieldValues[7],
      url: fieldValues[8], read: this.currentBook.read, imageURL: fieldValues[9], pages: parseInt(fieldValues[10]), lan: lan
    }
    console.log(book)
    this.firestoreService.updateBook(this.currentBook.id, book)
  }

  editUserForm(editForm: NgForm, email: string, displayName: string, plan: string, photoUrl: string): void {
    var fieldValues = [email, displayName, photoUrl, plan];

    const user: User = {
      uid: this.currentUser.uid, email: fieldValues[0], displayName: fieldValues[1], photoURL: fieldValues[2], emailVerified: this.currentUser.emailVerified,
      plan: fieldValues[3], favoriteBooksList: this.currentUser.favoriteBooksList, followers: this.currentUser.followers, following: this.currentUser.following,
      readingHistory: this.currentUser.readingHistory, rol: 'USER', notifications: []
    }
    console.log(user)
    this.firestoreService.updateUser(this.currentUser.id, user)
  }

}
