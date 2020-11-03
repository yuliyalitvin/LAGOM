import { MainService } from '../service/main.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Eintrag } from '../model/eintrag';
import { Ziel } from '../model/ziel';
import { Todo } from '../model/todo';
import { Erinnerung } from '../model/erinnerung';
import { Galerie } from '../model/galerie';
import { Motivation } from '../model/motivation';
import { Nutzer } from '../model/nutzer';
import { Tagebuch } from '../model/tagebuch';
import { Kalender } from '../model/kalender';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:3000';
@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  socket;


  constructor(private mainService: MainService,
    private router: Router,
    private readonly http: HttpClient,
    private route: ActivatedRoute) { }

  title = 'Lagom';
  //Inhalte initialisieren
  ziele: Observable<Ziel[]>;
  todos: Observable<Todo[]>;
  erinnerungen: Observable<Erinnerung[]>;
  galerien: Observable<Galerie[]>;
  motivationen: Observable<Motivation[]>;
  nutzer: Observable<Nutzer[]>;
  tagebuch: Observable<Tagebuch[]>;
  kalender: Observable<Kalender[]>;
  nutzerdaten: Observable<any>;
  WorkspaceID = +this.route.snapshot.paramMap.get('WorkspaceID');

  //Elemente für Kalendar
  public month: number = new Date().getMonth();
  public fullYear: number = new Date().getFullYear();
  public dateValue: Date = new Date(this.fullYear, this.month, 11);
  public minDate: Date = new Date(this.fullYear, this.month, 9);
  public maxDate: Date = new Date(this.fullYear, this.month, 15);

  ngOnInit() {
    this.setupSocketConnection();
    this.getAllData();
  }
  // Socket
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('my broadcast', (data: string) => {
      this.getAllData();
    });
  }
  // alle Daten werden aus der Datenbank geholt
  private getAllData(): void {
    this.nutzerdaten = this.mainService.getNutzerdaten(this.WorkspaceID);
    this.nutzerdaten.subscribe(data => { });

    this.todos = this.mainService.getTodos(this.WorkspaceID);
    this.todos.subscribe(data => { });

    this.ziele = this.mainService.getZiele(this.WorkspaceID);
    this.ziele.subscribe(data => { });

    this.erinnerungen = this.mainService.getErinnerungen(this.WorkspaceID);
    this.erinnerungen.subscribe(data => { });

    this.galerien = this.mainService.getGalerien(this.WorkspaceID);
    this.galerien.subscribe(data => { });

    this.motivationen = this.mainService.getMotivationen(this.WorkspaceID);
    this.motivationen.subscribe(data => { });

    this.tagebuch = this.mainService.getTagebuch(this.WorkspaceID);
    this.tagebuch.subscribe(data => { });

    this.kalender = this.mainService.getKalender(this.WorkspaceID);
    this.kalender.subscribe(data => { });
  }
  // Todo eintrag als erledigt speichern
  public erledigt(todoEintrag: Todo): void {
    todoEintrag.Erledigt = !todoEintrag.Erledigt;
    this.mainService.updateToDo(todoEintrag).subscribe();
    this.socket.emit('refresh', 'refresh Page');
  }
  // loeschen von Eintraegen
  public deleteZiel(zielEintrag: Eintrag): void {
    this.mainService.deleteZielEintrag(zielEintrag).subscribe();
    this.socket.emit('refresh', 'refresh Page');
  }

  public deleteKalender(kalenderEintrag: Eintrag): void {
    this.mainService.deleteKalenderEintrag(kalenderEintrag).subscribe();
    this.socket.emit('refresh', 'refresh Page');
  }

  public deleteTagebuch(tagebuchEintrag: Eintrag): void {
    this.mainService.deleteTagebuchEintrag(tagebuchEintrag).subscribe();
    this.socket.emit('refresh', 'refresh Page');
  }

  public deleteToDo(todoEintrag: Eintrag): void {
    this.mainService.deleteToDoEintrag(todoEintrag).subscribe();
    this.socket.emit('refresh', 'refresh Page');
  }

  public deleteErinnerung(erinnerungEintrag: Eintrag): void {
    this.mainService.deleteErinnerungEintrag(erinnerungEintrag).subscribe();
    this.socket.emit('refresh', 'refresh Page');
  }
  // Verlinkung zur Eintrag erstellen Seite
  public eintragErstellen() {
    this.router.navigate(["eintragErstellen/" + this.WorkspaceID])
  }

}