import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut, updateCurrentUser, updateProfile, User } from 'firebase/auth';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private auth: Auth = inject(Auth); // Injeta a instância correta do Firebase Auth

  constructor() {}

  async onRegister(email: string, senha: string): Promise<Usuario|string> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, senha);
      const usuario = userCredential.user;

      if (!usuario.emailVerified) {
        await sendEmailVerification(usuario);
      }
      const usuarioCompleto: Usuario = {
        uid: usuario.uid,
        displayName: usuario.displayName || '',
        email: usuario.email || '',
        phoneURL: usuario.photoURL || ''  // Usando photoURL, se disponível
      };

      return usuarioCompleto;
    } catch (error: any) {
      return `Erro no registro: ${error.message}`;
    }
  }

  async onLogin(email: string, senha: string): Promise<Usuario | string> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, senha);
      const usuario = userCredential.user;

      if (!usuario.emailVerified) {
        return "Conta ainda não verificada! Verifique seu e-mail.";
      }

      const usuarioCompleto: Usuario = {
        uid: usuario.uid,
        displayName: usuario.displayName || '',
        email: usuario.email || '',
        phoneURL: usuario.photoURL || ''  // Usando photoURL, se disponível
      };

      return usuarioCompleto;
    } catch (error: any) {
      return `Erro no login: ${error.message}`;
    }
  }

  async onUpdateUsuario(usuario:Usuario): Promise<string> {
    try {
      const authUser = this.auth.currentUser;
      if(authUser==null){
        return "Falha !";
      }
      updateProfile(authUser,{
        displayName:usuario.displayName,
        photoURL:usuario.phoneURL
      }).then(()=>{
        return "usuarioCompleto";
      }).catch((error)=>{
        return "Em falha! "+error.message;
      });
    } catch (error: any) {
      return `Erro no registro: ${error.message}`;
    }
    return "";
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
