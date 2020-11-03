import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Eintrag } from '../model/eintrag';
import { Observable, from } from 'rxjs';
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../service/main.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as io from 'socket.io-client';
const SOCKET_ENDPOINT = 'localhost:3000';
@Component({
  selector: 'app-eintragErstellen',
  templateUrl: './eintragErstellen.component.html',
  styleUrls: ['./eintragErstellen.component.css']
})

export class EintragErstellenComponent implements OnInit {

  eintragListe: Observable<Eintrag[]>;
  WorkspaceID = +this.route.snapshot.paramMap.get('WorkspaceID');
  neuerEintrag;

  nachricht = " ";

  constructor(private mainService: MainService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder) {
    this.neuerEintrag = this.formBuilder.group({
      EintragArt: '',
      Datum: '',
      Uhrzeit: '',
      Titel: '',
      Untertitel: '',
      Text: '',
      Notiz: '',
      Anmerkung: ''
    });
  }

  title = 'Lagom';

  erstellungsTitel = "EINTRAG ERSTELLEN";
  socket;
  uhr = 0;

  arten = [
    { value: 'Ziel', uhr: false },
    { value: 'Erinnerung', uhr: true },
    { value: 'Kalender', uhr: true },
    { value: 'Tagebuch', uhr: false },
    { value: 'ToDo', uhr: false }
  ];
  changeUhr(typ) {
    if (typ == "Erinnerung" || typ == "Kalender") {
      this.uhr = 1;
    } else {
      this.uhr = 0;
    }
  }
  ngOnInit(): void {
    this.setupSocketConnection();
  }
  // Socket  
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
  }
  //Zurueck zur MainPage
  goBack() {
    this.location.back();
    this.socket.emit('refresh', 'refresh Page');
  }
// neuer Eintrag erstellen
  submit(eintragdaten) {
    const newEintrag = new Eintrag(eintragdaten.Datum, eintragdaten.Uhrzeit, eintragdaten.Titel, eintragdaten.Untertitel, eintragdaten.Text, eintragdaten.Notiz, eintragdaten.Anmerkung);

    if (eintragdaten.EintragArt != "" && eintragdaten.EintragArt != null) {
      if (eintragdaten.Datum != "" && eintragdaten.Datum != null) {
        if (eintragdaten.Titel != "" && eintragdaten.Titel != null) {
          console.log('Your data has been submitted', eintragdaten);
          this.mainService.addEintrag(newEintrag, eintragdaten.EintragArt, this.WorkspaceID).subscribe(data => {
            console.log(data);
          });
          this.goBack();
        } else {
          this.nachricht = "Ein Titel muss eingetragen werden!";
        }
      } else {
        this.nachricht = "Ein Datum muss eingetragen werden!";
      }
    } else {
      this.nachricht = "Eine Kategorie muss ausgewählt werden!";
    }
  }
}