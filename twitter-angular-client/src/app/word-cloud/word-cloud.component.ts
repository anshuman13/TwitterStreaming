import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as cloud from 'd3-cloud'

import { TrendsService } from '../services/trends.service';


@Component({
  selector   : 'app-word-cloud',
  template: `<div class='word-cloud'></div>`
})



export class WordCloudComponent implements OnInit {

  wordData;
  data = [];
  // Settings
  settings = {
    minFontSize: 10,
    maxFontSize: 300,
  }


  private tooltip: any;

  private svg;               // SVG in which we will print our chart
  private margin: {          // Space between the svg borders and the actual chart graphic
    top: number,
    right: number,
    bottom: number,
    left: number
  };
  private width: number;      // Component width
  private height: number;     // Component height
  private fillScale;          // D3 scale for text color
  tempData = [];

  constructor(private trendsService : TrendsService) {
  }

  ngOnInit() {
    const cls = this;
    this.trendsService.getTrends(20070458)
    .subscribe(res => {
      this.wordData = {data: res, settings: this.settings};
      this.initialize(cls);
      
    });
  }

  private initialize(cls) {
    this.data = this.wordData.data.map(function(d) {
      return {text: d.name, volume: d.volume, size: cls.getRandom()};
    });
    this.setup();
    this.buildSVG();
    this.populate();
  }




  private getRandom() {
    const cls = this;
    const size = 10 + Math.random() * 100;
    if (size > 70 && this.tempData.length <= 10) {
      this.tempData.push(size);
    }
    if (this.tempData.length > 10 && size > 14) {
      return 12;
    }

    return size;
  }

  private setup() {
    this.margin = {
      top   : 20,
      right : 20,
      bottom: 20,
      left  : 20
    };
    
    this.width = window.innerWidth - this.margin.left - this.margin.right;
    this.height = window.innerHeight - this.margin.top - this.margin.bottom;

    this.fillScale = d3.scaleOrdinal(d3.schemeCategory10);
  }

  private buildSVG() {
    this.svg = d3.select('div.word-cloud')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + (this.width / 2) + ',' + (this.height / 2) + ')');

    this.tooltip = d3.select('body').append("div")
      .classed('chart-tooltip', true)
      .style('display', 'none');
  }

  private populate() {
    const fontFace: string = (this.wordData.settings.fontFace == null) ? 'Roboto' : this.wordData.settings.fontFace;
    const fontWeight: string = (this.wordData.settings.fontWeight == null) ? 'normal' : this.wordData.settings.fontWeight;
    const spiralType: string = (this.wordData.settings.spiral == null) ? 'rectangular' : this.wordData.settings.spiral;

    cloud()
      .size([this.width, this.height])
      .words(this.data)
      .padding(5)
      .rotate(() => {
        return (~~(Math.random() * 2) * 90);
        // vertical & horizontal only
        // return (~~(Math.random() * 2) * 90);
      })
      .font(fontFace)
      .fontWeight(fontWeight)
      .fontSize(d => (d.size))
      .spiral(spiralType)
      .on('end', () => {
        this.drawWordCloud(this.data);
      })
      .start();
  }

  private drawWordCloud(words) {
    this.svg
      .selectAll('g text')
      .data(words)
      .enter()
      .append('text')
      .style('font-size', d => d.size + 'px')
      .style('fill', (d, i) => {
        return this.fillScale(i);
      })
      .attr('text-anchor', 'middle')
      .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
      .attr('class', 'word-cloud')
      .on("mouseover", ()=>{
        d3.select('.chart-tooltip').style("display", null)
        })
        .on("mouseout", ()=>{
          d3.select('.chart-tooltip').style("display", "none")
        })
        .on("mousemove", (d:any)=>{
          d3.select('.chart-tooltip')
            .style("left", d3.event.pageX + 15 + "px")
            .style("top", d3.event.pageY - 25 + "px")
            .text(d.volume);
            
        })
      .text(d => {
        return d.text;
      });

  }
    
}