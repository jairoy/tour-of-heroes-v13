import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Credentials } from '../models/credential.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router) { }

  login(credentials: Credentials): void{    
    localStorage.setItem('token', credentials.password);
    this.updateLoggeIn();
    this.router.navigate(['/dashboard'])
  }

  logout(): void{
    console.log('passei aqui')
    localStorage.clear();
    this.updateLoggeIn();
    this.router.navigate(['/login']);
  }

  updateLoggeIn(): void{
    const token = localStorage.getItem('token');
    if (token){
      this.loggedIn.next(true);      
    }else{
      this.loggedIn.next(false);
    }
  }
}