import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicCardComponent } from './music-card/music-card.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'music-card', component: MusicCardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
