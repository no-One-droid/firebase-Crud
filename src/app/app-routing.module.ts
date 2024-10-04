import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './components/my-tasks/create-task/create-task.component';
import { HomeComponent } from './components/home/home.component';
import { MyTasksComponent } from './components/my-tasks/my-tasks.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
const routes: Routes = [

 {
  path: '',
  component: HomeComponent 
 },
{
    path: 'my-task',
    children:[
      {path:'', component: MyTasksComponent },
    ]
},
  {path: 'create-task',component: CreateTaskComponent},
  {path: 'signUp',component: SignUpPageComponent},
  {path:'about',component: AboutComponent},
  {path:'contact', component: ContactUsComponent },
  { path: 'rxjs', loadChildren: () => import('./rxjs/rxjs.module').then(m => m.RxjsModule) },
  { path: '', redirectTo: '/rxjs', pathMatch: 'full' }, 
  {path: 'employes', loadChildren:()=> import('./employes/employes.module').then(m => m.EmployesModule)},
  {path: '', redirectTo: '/employes', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
