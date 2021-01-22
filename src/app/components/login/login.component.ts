import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})



export class LoginComponent implements OnInit {

  signInForm = {
    usuario:"",
    contrasena:""
  }

  signUpForm = {
    usuario:"",
    correo:"",
    contrasena:"",
  }

  



  signUp:boolean=false;

  constructor() { }


  changeClass(){
    this.signUp=!this.signUp;
  }
 

  ngOnInit(): void {
  }

  onSignIn(){
    console.log(this.signInForm)
  }

  onSignUp(){
    console.log(this.signUpForm)
  }

}
