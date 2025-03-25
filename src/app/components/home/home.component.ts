import { Component, Inject } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { SessaoService } from '../../services/sessao.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  usuario!:Usuario|null;


  constructor(
    private service: UsuarioService,
    private sessao:SessaoService
  ){
    this.usuario = this.sessao.obterUsuario();
  }
}
