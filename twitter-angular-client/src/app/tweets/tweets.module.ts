import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetsHomeComponent } from './tweetshome/tweetshome.component';
import { TweetcardComponent } from './tweetcard/tweetcard.component';

@NgModule({
  declarations: [TweetsHomeComponent, TweetcardComponent],
  imports: [
    CommonModule
  ]
})
export class TweetsModule { }
