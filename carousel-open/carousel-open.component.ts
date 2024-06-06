import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-carousel-open',
  templateUrl: './carousel-open.component.html',
  styleUrls: ['./carousel-open.component.css']
})
export class CarouselOpenComponent {
  @Input() books:any[] = [];
  constructor(){}

  
}
