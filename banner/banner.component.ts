import { Component,Input} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent{
  public data:any;
  @Input() books:any[] = [];
  constructor(){ 

  }


  banner(d:string,title:string, des:string):void{
    this.data = "url('"+d+"'";
    (<HTMLInputElement>document.querySelector('#banner')).style.backgroundImage=this.data;
    (<HTMLInputElement>document.querySelector('.banner__title')).textContent = title;
    (<HTMLInputElement>document.querySelector('.banner__description')).textContent = des;
  }

}
