import { Component, OnInit, TemplateRef } from '@angular/core';
import { MainService } from './service/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

 export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error("Method not implemented.");
  }
  
  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.mainService.setupSocketConnection();
  }
}
