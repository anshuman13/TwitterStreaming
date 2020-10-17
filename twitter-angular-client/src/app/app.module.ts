import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Imported Modules from Angular
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { WordCloudComponent } from './word-cloud/word-cloud.component';
import { NavbarComponent } from './navbar/navbar.component';

// Custom Module
import { TweetsModule } from './tweets/tweets.module';
import { SharedModule } from './shared/shared.module';

// Services
import { TrendsService } from './services/trends.service';
import { WebsocketService } from './services/websocket.service';
import { TweetService } from './services/tweet.service';
import { HttpErrorInterceptor } from './services/error/http-error.interceptor';

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
    TweetsModule,
    SharedModule
  ],
  providers: [TrendsService, WebsocketService, TweetService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
