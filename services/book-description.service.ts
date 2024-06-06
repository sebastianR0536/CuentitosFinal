import { Injectable } from '@angular/core';
import { Book } from './interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookDescriptionService {

  private libro: Book | undefined

  constructor() { }

  public updateDescripcion(libro: Book) {
    this.libro = libro;
  }

  public getLibro() {
    return this.libro
  }

}
