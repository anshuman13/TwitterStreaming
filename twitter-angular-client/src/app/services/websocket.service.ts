import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class WebsocketService {

  private socket; // socket that connects to socket.io server

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io(environment.webSocketUrl);
    console.log('Called Websocket')
    let observable = new Observable(observer => {
      this.socket.on('tweet' , (data) => {
        observer.next(data);
      })
      return () => {
        this.socket.emit('disconnect');
        this.socket.off();
      }
    })

    let observer = {
      next : (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      }
    }

    return Rx.Subject.create(observer, observable);
  }

  disconnect() {
    console.log("Disconnect web socket.")
    this.socket.disconnect();
  }
}
