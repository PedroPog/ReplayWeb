import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, sendEmailVerification,
   signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { Usuario } from '../models/usuario.model';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private auth: Auth = inject(Auth); // Injeta a instância do Firebase Auth
  private storage = getStorage(); // Injeta a instância do Firebase Storage

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

  verificarEmail(): Promise<boolean> {
    return new Promise((resolve) => {
      const authUser = this.auth.currentUser;
      if (authUser) {
        resolve(authUser.emailVerified);
      } else {
        resolve(false); // Retorna false se o usuário não estiver autenticado
      }
    });
  }


  async uploadImage(selectedFile: File,uuid:string): Promise<string> {
    try{
      const storageRef = ref(this.storage,`user_images/${uuid}/${selectedFile.name}`);
      const snapshot = await uploadBytes(storageRef,selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    }catch(error:any){
      throw new Error(`Erro ao fazer upload da imagem: ${error.message}`);
    }
  }
}
