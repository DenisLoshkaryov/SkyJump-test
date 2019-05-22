import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './components';

const routes: Routes = [
  {
    path: 'table',
    component: TableComponent
  },
  {
    path:  '**',
    redirectTo: 'table'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
