import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
    data:{titulo:'Home'}
  },
  {
    path:'login',component:LoginComponent,
    data:{titulo:'Login'}
  },
  {
    path:'register',component:RegisterComponent,
    data:{titulo:'Register'}
  },
  {
    path:'**',component:NotFoundComponent,
    data:{titulo:'Not Found 404'}
  }

];
