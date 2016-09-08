import { Component, Directive, ElementRef, Renderer } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app',
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  templateUrl: 'app.template.html'
})
export class App {
  title: string = 'beauty-admin';
  server: string;
  data = {};

  constructor(public http: Http) { }

  ngOnInit() {
    // limit the use of setTimeouts
    setTimeout(() => {
      this.server = 'This was rendered from the server!';
    }, 10);

    // use services for http calls
    this.http.get('/data.json')
      .subscribe(res => {
        this.data = res.json();
      });
  }

}
