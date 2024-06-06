import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Book } from '../services/interfaces/book';
import { Audiobook } from '../services/interfaces/audiobook';
import { publishReplay } from 'rxjs';


interface Option {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-app-search',
  templateUrl: './app-search.component.html',
  styleUrls: ['./app-search.component.css']
})
export class AppSearchComponent {
  public books: any[] = [];
  public audiolibros: Audiobook[] = [];
  public searchResults: Book[] = [];
  public searchAudioBooks: Audiobook[] = [];
  public searchEnabled: boolean = false;
  public audioBooksEnabled: boolean = false;
  public genreResults: Book[] = [];
  public genreEnabled: boolean = false;
  public yearResults: Book[] = [];
  public yearEnabled: boolean = false;
  public selectedGenre!: string;
  public selectedYear!: string;
  years: Option[] = [];

  gnr: Option[] = [
    { value: 'Biografías y Memorias', viewValue: 'Biografías y Memorias' },
    { value: 'Economía', viewValue: 'Economía' },
    { value: 'Infantil', viewValue: 'Infantil' },
    { value: 'Misterio', viewValue: 'Misterio' },
    { value: 'Novela', viewValue: 'Novela' }
  ];

  constructor(
    private firestoreService: FirestoreService,
    public authService: AuthService
  ) {

    for (let year = 1980; year <= 2020; year++) {
      const option: Option = { value: year.toString(), viewValue: year.toString() };
      this.years.push(option);
    }

  }

  embeddingDriveImg(data: string) {
    return "https://drive.google.com/uc?export=view&id=" + data
  }

  ngOnInit() {

    //Obtenemos Coleccion Libros
    this.firestoreService.getBooks().subscribe((catsSnapshot) => {
      this.books = [];
      catsSnapshot.forEach((catData: any) => {
        this.books.push({

          //id: catData.payload.doc.id,
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
          lan: catData.payload.doc.data().lan,
        });
        sessionStorage.setItem('books', JSON.stringify(this.books))
      })
    });


    this.firestoreService.getAudioBooks().subscribe((catsSnapshot) => {
      catsSnapshot.forEach((catData: any) => {
        var p: Audiobook = catData.payload.doc.data()
        this.audiolibros.push(p)
      })
    })

  }

  search(form: NgForm, searchTerm: string) {
    this.searchResults = this.books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.publicationDate === searchTerm ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.searchResults = this.searchResults.filter((book, index, self) =>
      index === self.findIndex(b => b.isbn === book.isbn)
    );

    this.searchAudioBooks = this.audiolibros.filter(audio =>
      audio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audio.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.searchAudioBooks = this.searchAudioBooks.filter((audiobook, index, self) =>
      index === self.findIndex(b => b.title === audiobook.title)
    );

    this.searchEnabled = this.searchResults.length > 0;
    this.audioBooksEnabled = this.searchAudioBooks.length > 0;
    this.genreEnabled = false;
    this.yearEnabled = false;
  }

  category(form: NgForm, genre: string) {
    this.genreResults = this.books.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
    this.genreEnabled = true;

    this.searchEnabled = false;
    this.yearEnabled = false;
  }

  year(form: NgForm, year: string) {
    this.yearResults = this.books.filter(book => book.publicationDate === year);
    this.yearEnabled = true;

    this.searchEnabled = false;
    this.genreEnabled = false;

  }


}
