import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  visible: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    senha: new FormControl('',[Validators.required,Validators.minLength(6)])
  });


  onlogin(){
    if(this.loginForm.valid){
      console.log("Login efetuado com sucesso!", this.loginForm.value);
    }
  }

}
