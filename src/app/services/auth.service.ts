import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router:Router
  ) { }

  login(){

  }

  logout(){
    this.router.navigate(['/login'])
  }

}


