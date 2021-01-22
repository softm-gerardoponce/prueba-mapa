import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from 'angular-bootstrap-md';
import { FullLayoutComponent } from './components/full-layout/full-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    component:RoadmapComponent,
    path:''
  },
  {
    component:LoginComponent,
    path:'login'
  },
  {
    component:NavbarComponent,
    path:'nav'
  },
  {
    component:FullLayoutComponent,
    children:[
      {
        component:TestComponent,
        path:'test'
      },
      {
        component:RoadmapComponent,
        path:'map'
      },
      
    ],
    path:'layout'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
