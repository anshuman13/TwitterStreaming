import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as cloud from 'd3-cloud'

import { TrendsService } from '../services/trends.service';


@Component({
  selector : 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css'],
})

//  The Default Word Cloud Component.

export class WordCloudComponent implements OnInit {

  trends;

  isError: Boolean = false; // Error Handling
  // Settings.
  // TODO : More Configuration to be added.
  settings = {
    minFontSize: 10,
    maxFontSize: 300,
  }

  constructor(private trendsService : TrendsService) {
  }

  ngOnInit() {
    const cls = this;
    this.trendsService.getTrends(20070458)
    .subscribe(res => {
      this.trends = {data: res, settings: this.settings};
    },
    error => {
      this.isError = true;
      console.log(error);
    });
  } 
}