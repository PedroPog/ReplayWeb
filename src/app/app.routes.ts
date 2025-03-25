import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ListaItemComponent } from './components/home/components/lista-item/lista-item.component';
import { PageHomeComponent } from './components/home/components/page-home/page-home.component';
import { RegisterStepOneComponent } from './components/register/components/register-step-one/register-step-one.component';
import { RegisterStepTwoComponent } from './components/register/components/register-step-two/register-step-two.component';
import { DetalhesItemComponent } from './components/home/components/detalhes-item/detalhes-item.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo:'welcome',
    pathMatch:'full'
  },
  {
    path:'welcome',component:WelcomeComponent,
    data:{titulo:'Bem vindo!'}
  },
  {
    path:'home',component:HomeComponent,
    children:[
      {
        path:'',component:PageHomeComponent,data:{titulo:'Home'}
      },
      {
        path:'list',component:ListaItemComponent,data:{titulo:'Lista videos'}
      },
      {
        path:'detalhes-item',component:DetalhesItemComponent,data:{titulo:'Detalhes videos'}
      }
    ]
  },
  {
    path:'login',component:LoginComponent,
    data:{titulo:'Login'}
  },
  {
    path:'register',component:RegisterComponent,
    children:[
      {
        path:'',component:RegisterStepOneComponent,
        data:{titulo:'Register'}
      },
      {
        path:'step',component:RegisterStepTwoComponent,
        data:{titulo:'Register -- etapa 2'}
      },
    ]
  },
  {
    path:'**',component:NotFoundComponent,
    data:{titulo:'Not Found 404'}
  }

];
