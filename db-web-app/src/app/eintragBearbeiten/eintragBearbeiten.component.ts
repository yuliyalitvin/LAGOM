import { MainService } from '../service/main.service';
import { Component, OnInit, Input } from '@angular/core';
import { Eintrag } from '../model/eintrag';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import * as io from 'socket.io-client';
const SOCKET_ENDPOINT = 'localhost:3000';

@Component({
  selector: 'app-eintragBearbeiten',
  templateUrl: './eintragBearbeiten.component.html',
  styleUrls: ['./eintragBearbeiten.component.css']
})
export class EintragBearbeitenComponent implements OnInit {

  Titel = "EINTRAG BEARBEITEN"
  title = 'Lagom';
  //Inhalte initialisieren
  @Input() eintraege: Eintrag;
  Art = this.route.snapshot.url[1].path;
  EintragID;
  uhr = false;
  socket;
  bearbeitenEintrag;
  nachricht = " ";
  WorkspaceID = +this.route.snapshot.paramMap.get('WorkspaceID');

  constructor(private mainService: MainService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.bearbeitenEintrag = this.formBuilder.group({
      Datum: '',
      Titel: ''
    });
  }

  modelChangeDate(newDate) {
    this.eintraege[0].Datum = newDate;
  }

  ngOnInit(): void {
    this.setupSocketConnection();
    this.EintragID = +this.route.snapshot.paramMap.get('EintragID');
    this.getEintrag();
    if (this.Art == "Erinnerung" || this.Art == "Kalender") {
      this.uhr = true;
    }
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
  // Eintrag holen
  getEintrag(): void {
    this.mainService.getEintrag(this.EintragID, this.Art).subscribe(eintraege => this.eintraege = eintraege,);
  }
  // neue Daten an Server leiten
  aktualisiereEintrag(): void {
    if (this.eintraege[0].Datum != "" && this.eintraege[0].Datum != null) {
      if (this.eintraege[0].Titel != "" && this.eintraege[0].Titel != null) {
        this.eintraege.Art = this.Art;
        this.mainService.updateEintrag(this.eintraege).subscribe();
        this.goBack();
      } else {
        this.nachricht = "Titel wurde nicht eingetragen";
      }
    } else {
      this.nachricht = "Datum wurde nicht eingetragen";
    }

  }
}


