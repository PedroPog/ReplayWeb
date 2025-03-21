import { Component } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { SessaoService } from '../../services/sessao.service';
import { Usuario } from '../../models/usuario.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  visible: boolean = false;

  constructor(
    private service:UsuarioService,
    private sessao:SessaoService,
    private router:Router
  ){
    if(this.sessao.obterUsuario()!=null){
      this.router.navigate(['/home']);
    }
  }

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    senha: new FormControl('',[Validators.required,Validators.minLength(6)])
  });


  onlogin(){
    if(this.loginForm.valid){
      //console.log("Login efetuado com sucesso!", this.loginForm.value);
      const email = this.loginForm.get('email')?.value as string;
      const senha = this.loginForm.get('senha')?.value as string;
      this.service.onLogin(email,senha).then((res)=>{
        if (typeof res === 'string') {
          console.log("Erro: " + res);  // Mensagem de erro
        } else {
          this.sessao.salvarSessao(res);
          this.router.navigate(['/home']);
        }
      },
      (error)=>{
        console.log("error: "+error);
      });
    }
  }

}
