import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { IndexComponent } from './pages/index/index.component';
import { RegisterComponent } from './pages/auth/register/register.component';

const routes: Routes = [
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegisterComponent },
    { path: 'index', component: IndexComponent, canActivate: [AuthGuard] },
    { path: '', pathMatch: 'full', redirectTo: "index" },
    { path: '**', redirectTo: '/'} // handle all routes (in browser) which are not including in our routes 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppModuleRouting {}
