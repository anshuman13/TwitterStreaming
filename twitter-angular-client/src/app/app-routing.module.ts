import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TweetsHomeComponent } from './tweets/tweetshome/tweetshome.component';
import { WordCloudComponent } from './word-cloud/word-cloud.component';

const routes: Routes = [
  { path: 'word-cloud', component: WordCloudComponent },
  { path: 'home', component: TweetsHomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
