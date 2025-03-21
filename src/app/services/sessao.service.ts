import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {


  salvarSessao(usuario:Usuario){
    //sessionStorage.setItem()
  }

  obter(key:string){

  }

  limpar(){
    sessionStorage.clear();
  }


}
