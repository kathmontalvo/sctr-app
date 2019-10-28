import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  validation_messages = {
    email: [
      { type: "required", message: "El email es requerido" },
      { type: "pattern", message: "Email no es válido" }
    ],
    password: [
      { type: "required", message: "La contraseña es requerida" },
      { type: "minLength", message: "Mínimo 6 caracteres " }
    ],
    confirmPassword: [
      { type: "required", message: "La contraseña es requerida" },
      { type: "minLength", message: "Mínimo 6 caracteres " }
    ]
  };

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group(
      {
        email: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(
              "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
            )
          ])
        ),
        password: new FormControl(
          "",
          Validators.compose([Validators.required, Validators.minLength(6)])
        ),
        confirmPassword: new FormControl("")
      },
      { validator: this.checkPasswords }
    );
  }

  ngOnInit() {}

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.get("password").value;
    let confirmPass = group.get("confirmPassword").value;

    return pass === confirmPass ? null : { notSame: true };
  }

  loginUser(credentials) {
    console.log(credentials);
    this.router.navigateByUrl("/home");
  }
}
