import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITweet } from 'src/app/models/ITweet';
import { TweetService } from '../../services/tweet.service';

@Component({
  selector: 'app-tweetshome',
  templateUrl: './tweetshome.component.html',
  styleUrls: ['./tweetshome.component.css'],
  providers: [TweetService]
})
export class TweetsHomeComponent implements OnInit, OnDestroy {


  action: String = "Pause"
  tweets : ITweet[] = []
  private tweetObserver;

  constructor(private tweetService: TweetService) { 
    this.tweets = [];
  }

  ngOnInit() {
    this.tweetObserver = this.tweetService.messages.subscribe(msg => {
      this.tweets.unshift(msg);
      if (this.tweets.length > 10) {
        this.tweets.splice(-1,1);
      }
    })
  }

  ngOnDestroy() {
    console.log("Component Destoryed")
    this.tweetObserver.unsubscribe();
    this.tweetService.disconnect();
  }

  sendMessage() {
    if (this.action === "Pause") {
      this.action = "Resume"
      this.tweetService.sendMsg(1);
    } else {
      this.action = "Pause"
      this.tweetService.sendMsg(0);
    }
  }

}
