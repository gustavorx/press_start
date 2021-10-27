import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn:'root'})

export class LoginService{

  private id = new BehaviorSubject('default message');

  idAtual = this.id.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.id.next(message)
  }
}