import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { SessaoService } from '../../../../services/sessao.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'register-step-one',
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
  templateUrl: './register-step-one.component.html',
  styleUrl: './register-step-one.component.scss',
})
export class RegisterStepOneComponent {

  visible: boolean = false;

  constructor(
    private service: UsuarioService,
    private sessao: SessaoService,
    private router: Router
  ) {}

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onRegister() {

    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value as string;
      const senha = this.registerForm.get('senha')?.value as string;
      this.service.onRegister(email,senha).then((res)=>{
        if (typeof res === 'string') {
          console.log("Erro: " + res);  // Mensagem de erro
        } else {
          this.sessao.salvarSessao(res);
          this.router.navigate(['step']);
        }
      },
      (error)=>{
        console.log("error: "+error);
      });
    }
  }

}
