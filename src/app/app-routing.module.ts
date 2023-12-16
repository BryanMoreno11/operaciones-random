import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomComponent } from './components/random/random.component';

const routes: Routes = [{path:'random', component:RandomComponent},
{path:"**",pathMatch:"full",redirectTo:"random"}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
