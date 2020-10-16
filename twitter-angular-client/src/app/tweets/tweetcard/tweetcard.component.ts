import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweetcard',
  templateUrl: './tweetcard.component.html',
  styleUrls: ['./tweetcard.component.css']
})
export class TweetcardComponent implements OnInit {

  @Input('tweet') private tweet;

  constructor() { }

  ngOnInit() {
  }

}
