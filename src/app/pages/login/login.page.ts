import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  validation_messages = {
    email: [
      { type: "required", message: "El email es requerido" },
      { type: "pattern", message: "Email no es válido" }
    ],
    password: [
      { type: "required", message: "La contraseña es requerida" },
      { type: "minLength", message: "Mínimo 6 caracteres " }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router // private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      )
    });
  }

  ngOnInit() {}
  loginUser(credentials) {
    console.log(credentials.email, credentials.password);
    this.router.navigateByUrl("/home");
    // this.authService
    //   .login(credentials.email, credentials.password)
    //   .subscribe(
    //     user => {
    //       const token = user.data.token;
    //       this.authService.setToken(token);
    //       this.router.navigate(["/home"]);
    //     },
    //     error => {
    //       console.log(error, "ghjkasdjasd");
    //       alert("Ingresar correo y/o contraseña válidos");
    //     }
    //   );
  }
}
