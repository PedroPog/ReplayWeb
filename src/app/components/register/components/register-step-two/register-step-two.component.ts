import { Component } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { Router } from '@angular/router';
import { SessaoService } from '../../../../services/sessao.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'register-step-two',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './register-step-two.component.html',
  styleUrl: './register-step-two.component.scss'
})
export class RegisterStepTwoComponent {

  imagePreview: string | ArrayBuffer | null = "https://avatar.iran.liara.run/public";

  constructor(
    private service:UsuarioService,
    private router:Router,
    private sessao:SessaoService
  ){

  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;  // Atribui o resultado da leitura como o src da imagem
      };

      reader.readAsDataURL(file);  // Lê o arquivo como um URL de dados
    }
  }

}
