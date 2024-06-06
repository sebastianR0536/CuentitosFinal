import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {

  @Output() usersClicked = new EventEmitter<boolean>();

  enviar(state:boolean) {
    this.usersClicked.emit(state);
  }


}
