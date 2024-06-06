
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ServicioBibliotecaOnline';
  loading = false;

  constructor(private ngZone: NgZone,private router: Router, private translocoService: TranslocoService, private cookieService: CookieService) { }

  ngOnInit() {
    const selectedLanguage = this.cookieService.get('selectedLanguage'); // Lee el idioma seleccionado de la cookie
    if (selectedLanguage) {
      this.translocoService.setActiveLang(selectedLanguage); // Establece el idioma seleccionado como idioma activo
    }
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
      } else {
        this.loading = true; // Mostrar el loader
        setTimeout(() => {
          // Cargar datos aquí
          this.ngZone.run(() => {
            this.loading = false; // Ocultar el loader
          });
        }, 1500); // Retrasar la carga de los datos por 2 segundos (por ejemplo)
        
      }
    });
    
  }
  
}
