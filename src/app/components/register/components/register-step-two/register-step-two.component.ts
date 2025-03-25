import { Component } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { Router } from '@angular/router';
import { SessaoService } from '../../../../services/sessao.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { User } from 'firebase/auth';
import { Usuario } from '../../../../models/usuario.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { config } from 'rxjs';

@Component({
  selector: 'register-step-two',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './register-step-two.component.html',
  styleUrl: './register-step-two.component.scss',
})
export class RegisterStepTwoComponent {
  imagePreview: string | ArrayBuffer | null =
    'https://avatar.iran.liara.run/public';
  selectedFile: File | null = null; // Variável para armazenar a imagem selecionada

  usuario!: Usuario;
  formUsuario = new FormGroup({
    nome: new FormControl('', [Validators.required]),
  });

  constructor(
    private service: UsuarioService,
    private router: Router,
    private sessao: SessaoService,
    private _snack: MatSnackBar
  ) {
    if (this.sessao.obterUsuario() !== null) {
      this.usuario = this.sessao.obterUsuario() as Usuario;
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file; // Salva a imagem para tratamento posterior

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    const fileInput =
      document.querySelector<HTMLInputElement>('input[type="file"]');
    fileInput?.click();
  }

  onSalvar() {
    if (!this.selectedFile) {
      this.updatePerfil();
      return;
    }

    if (this.formUsuario.valid) {
      this.service.uploadImage(this.selectedFile, this.usuario.uid).then(
        (url) => {
          this.usuario.phoneURL = url;
          this.updatePerfil();
        },
        (error) => {
          console.error('Erro no upload da imagem:', error);
        }
      );
    }
  }

  updatePerfil() {
    this.usuario.displayName = this.formUsuario.get('nome')?.value as string;
    this.service.onUpdateUsuario(this.usuario).then(
      () => {
        this.sessao.salvarSessao(this.usuario);
        this.service.verificarEmail().then((res)=>{
          if(res){//Caso ja estive verificado
            this.router.navigate(['/home']);
          }else{
            this._snack.open("Verificar email antes de realizar o login da conta!","OK",
              {horizontalPosition:'end',verticalPosition:'bottom',duration:5000}
            );
            this.sessao.limpar();
            this.router.navigate(['/login']);
          }
        });

      },
      (error) => {
        console.error('Erro no update do usuário:', error);
      }
    );
  }
}
