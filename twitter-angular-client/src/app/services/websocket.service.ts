import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { delay } from 'rxjs/internal/operators/delay';

@Injectable()
export class WebsocketService {

  private socket; // socket that connects to socket.io server

  constructor() { }

  // Connection Method to the WebSocket
  // Create a Rxjs Subject and returns observer and observable

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io(environment.webSocketUrl);

    let observable = new Observable(observer => {
      this.socket.on('tweet' , (data) => {
        observer.next(data);
      })
      return () => {
        this.socket.emit('disconnect');
        this.socket.off();
      }
    }).pipe(delay(3000)) // Adds a delay of 3 seconds to the observable. 


    let observer = {
      next : (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      }
    }

    return Rx.Subject.create(observer, observable);
  }

  // Cleanup
  // Disconnects the socket on page reload or new page routing.

  disconnect() {
    console.log("Disconnect web socket.")
    this.socket.disconnect();
  }
}
