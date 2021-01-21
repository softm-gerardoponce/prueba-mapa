import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
