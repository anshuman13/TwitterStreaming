import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';
import { ITweet } from '../models/ITweet';
import 'rxjs/add/operator/delay';

@Injectable()
export class TweetService {

  // Variable to hold all the messages/tweets
  messages: Subject<any>

  constructor(private wsService: WebsocketService) { 
    

    // Simple wsService. Returns the response in form of ITweet class.
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): ITweet => {
        return response;
      })
  }

  // Messaging service to the server. 
  // Currently used for pause.
  sendMsg(msg) {
    this.messages.next(msg);
  }

  // Cleanup
  // Disconnect server and unsubscribe the observable.

  disconnect() {
    this.messages.unsubscribe();
    this.wsService.disconnect();
  }
}
