import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';
import { MainComponent } from './main/main.component';
import { HomestudentComponent } from './homestudent/homestudent.component';
import { ProductstudentComponent } from './productstudent/productstudent.component';

export const routes: Routes = [
  {path :'', redirectTo : 'main', pathMatch:'full'},
  {path :'main', component: MainComponent},
  {path :'homestudent', component: HomestudentComponent},
  {path :'home', component: HomeComponent},
  {path :'shop', component: ProductsComponent},
  {path :'shopstudent', component: ProductstudentComponent},
  {path : 'contact', component : ContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
