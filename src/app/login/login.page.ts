import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  validation_messages = {
    email:[
      { type: 'required', message: 'El email es requerido'},
      {type:'pattern', message: 'Email no es válido'}
    ],
    password:[
      { type: 'required', message: 'La contraseña es requerida'},
      {type:'minLength', message: 'Mínimo 6 caracteres '}
    ]
  };

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({

      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    })
  }
 
  ngOnInit() {
  }
  loginUser(credentials){
    console.log(credentials);
    this.router.navigateByUrl('/home')
  }
}
