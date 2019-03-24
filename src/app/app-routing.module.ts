import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { LayoutComponent } from './components/layout/layout.component'
import { CoursesComponent } from './components/courses/courses.component'
import { AddComponent } from './components/courses/add/add.component'

const routes: Routes = [
  { path: '', component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'courses/add', component: AddComponent }
    ]
  },     {
    path:'**',
    redirectTo:'',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


