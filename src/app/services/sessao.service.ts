import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  private chaveSecreta: string = 'MINHA_CHAVE_SUPER_SECRETA';

  /**
   * Salva o usuário no sessionStorage de forma criptografada.
   */
  salvarSessao(usuario: Usuario): void {
    const usuarioString = JSON.stringify(usuario);
    const usuarioCriptografado = CryptoJS.AES.encrypt(usuarioString, this.chaveSecreta).toString();
    sessionStorage.setItem('usuario', usuarioCriptografado);
  }

  /**
   * Obtém e descriptografa os dados do usuário.
   */
  obterUsuario(): Usuario | null {
    const dadosCriptografados = sessionStorage.getItem('usuario');

    if (!dadosCriptografados) {
      return null;
    }

    try {
      const bytes = CryptoJS.AES.decrypt(dadosCriptografados, this.chaveSecreta);
      const usuarioDescriptografado = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(usuarioDescriptografado) as Usuario;
    } catch (error) {
      console.error("Erro ao descriptografar o usuário:", error);
      return null;
    }
  }

  /**
   * Obtém um atributo específico do usuário.
   */
  obterAtributo(key: keyof Usuario): string | null {
    const usuario = this.obterUsuario();
    return usuario ? usuario[key] : null;
  }

  /**
   * Limpa a sessão.
   */
  limpar(): void {
    sessionStorage.clear();
  }


}
