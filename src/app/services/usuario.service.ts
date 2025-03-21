import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private auth: Auth = inject(Auth); // Injeta a instância correta do Firebase Auth

  constructor() {}

  async onRegister(email: string, senha: string): Promise<string> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, senha);
      const usuario = userCredential.user;

      if (!usuario.emailVerified) {
        await sendEmailVerification(usuario);
        return "Enviado e-mail de validação de conta!";
      }

      return "Registro concluído com sucesso!";
    } catch (error: any) {
      return `Erro no registro: ${error.message}`;
    }
  }

  async onLogin(email: string, senha: string): Promise<User | string> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, senha);
      const usuario = userCredential.user;

      if (!usuario.emailVerified) {
        return "Conta ainda não verificada! Verifique seu e-mail.";
      }

      return usuario;
    } catch (error: any) {
      return `Erro no login: ${error.message}`;
    }
  }

  async onLogout(): Promise<string> {
    try {
      await signOut(this.auth);
      return "Logout realizado com sucesso!";
    } catch (error: any) {
      return `Falha no logout: ${error.message}`;
    }
  }
}
