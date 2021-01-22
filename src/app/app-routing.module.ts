import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    component:RoadmapComponent,
    path:''
  },
  {
    component:TestComponent,
    path:'test'
  },
  {
    component:LoginComponent,
    path:'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
