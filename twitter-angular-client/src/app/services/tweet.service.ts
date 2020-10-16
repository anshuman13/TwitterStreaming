import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';
import { ITweet } from '../models/ITweet';

@Injectable()
export class TweetService {

  messages: Subject<any>

  constructor(private wsService: WebsocketService) { 
    
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): ITweet => {
        return response;
      })
  }

  sendMsg(msg) {
    this.messages.next(msg);
  }

  disconnect() {
    this.messages.unsubscribe();
    this.wsService.disconnect();
  }
}
