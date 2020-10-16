import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordCloudComponent } from './word-cloud/word-cloud.component';
import { NavbarComponent } from './navbar/navbar.component';

// Custom Module
import { TweetsModule } from './tweets/tweets.module';

// Services
import { TrendsService } from './services/trends.service';
import { WebsocketService } from './services/websocket.service';
import { TweetService } from './services/tweet.service';

@NgModule({
  declarations: [
    AppComponent,
    WordCloudComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TweetsModule
  ],
  providers: [TrendsService, WebsocketService, TweetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
