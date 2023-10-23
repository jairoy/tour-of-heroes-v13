import { Component} from '@angular/core';
import { MenuItem } from './core/models/menu-item.model';
import { AuthService } from './auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn$: Observable<boolean>;
  menuItems: MenuItem[] = [
    {
      matIcon: 'dashboard',
      routerLink:'/dashboard',
      toolTipText: 'Dashboard'
    },
    {
      fasIcon: 'mask',
      routerLink:'/heroes',
      toolTipText: 'Heroes'
    }
  ]
  
  title = 'Tour Of Heroes';
  
  constructor(private authService: AuthService){
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  onLogout(): void{
    this.authService.logout();
  }
}