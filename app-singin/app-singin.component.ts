import { Component,OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-app-singin',
  templateUrl: './app-singin.component.html',
  styleUrls: ['./app-singin.component.css']
})
export class AppSinginComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() { }
}