import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  validation_messages = {
    email: [{ type: 'required', message: 'El email es requerido' }, { type: 'pattern', message: 'Email no es válido' }],
    password: [{ type: 'required', message: 'La contraseña es requerida' }, { type: 'minLength', message: 'Mínimo 6 caracteres ' }]
  };

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private userService: UserService) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  ngOnInit() {}
  loginUser(credentials) {
    const grant_type = 'password';
    const client_id = '2';
    const client_secret = 'XrDnYGDzV8bLe0ZHWv71uKJP4vgYsCuvBQZ5fnpV';

    this.authService.login(grant_type, client_id, client_secret, credentials.email, credentials.password).subscribe(
      response => {
        console.log(response);

        this.authService.setItem('access_token', response.access_token);
        if (this.authService.getItem('access_token')) {
          this.getUser();
        } else {
          alert('Error en las credenciales. Volver a intentar.');
        }
      },
      error => {
        console.log(error, 'ghjkasdjasd');
        alert('Ingresar correo y/o contraseña válidos');
      }
    );
  }
  getUser() {
    this.userService.getUser().subscribe(user => {
      this.authService.setObject('user', user);
      console.log(this.authService.getObject('user'));
      this.router.navigate(['/home']);
    });
  }
}
