import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-app-singup',
  templateUrl: './app-singup.component.html',
  styleUrls: ['./app-singup.component.css']
})
export class AppSingupComponent implements OnInit {
  public plan:any;
  public url:any;
  constructor(
    public authService: AuthService,
    private rutaActiva: ActivatedRoute
  ) { }
  ngOnInit() {
    this.plan= this.rutaActiva.snapshot.params['plan'],
    this.url= this.rutaActiva.snapshot.params['url']
  }
}
