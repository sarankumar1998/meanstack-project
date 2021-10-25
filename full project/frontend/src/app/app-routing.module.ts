import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { ReadComponent } from './read/read.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'create',component:CreateComponent},
  {path:'create/:id',component:CreateComponent},
  {path:'read', component:ReadComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
