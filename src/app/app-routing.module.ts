import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
  {path: '', component: PhotoListComponent},
  {path: 'detail', component: DetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
