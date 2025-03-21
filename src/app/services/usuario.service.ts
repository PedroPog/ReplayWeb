import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  auth = getAuth();

  constructor(
  ) {

  }

  onRegister(email:string,senha:string,name:string){
    return createUserWithEmailAndPassword(this.auth,email,senha)
      .then((userCredential)=>{
        const usuario = userCredential.user;
        if(!usuario.emailVerified){
          return sendEmailVerification(usuario)
            .then(()=>{
              return "Enviado e-mail de validação de conta!";
            });
        }
        return userCredential.user.email;
      })
      .catch((error)=>{
        return error.message;
      });
  }

  onLogin(email:string,senha:string){
    return signInWithEmailAndPassword(
      this.auth,email,senha)
      .then(
        (userCredential)=>{
          const usuario = userCredential.user;
          if(!usuario.emailVerified){
            sendEmailVerification(usuario)
            return usuario.email;
          }
          return usuario;
        }
      )
      .catch((error)=>{
        return error.message;
      }
    );
  }

  onLogout(){
    return signOut(this.auth).then(()=>{
      return "Realizado logouat com sucesso!"
    })
    .catch((error)=>{
      return "Falha no logouat: "+error.message
    })
  }
}
