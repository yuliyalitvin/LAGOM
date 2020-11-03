import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from '../service/main.service';
import { Nutzer } from '../model/nutzer';
import { Observable, from } from 'rxjs';
import { FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';


@Component({
  selector: 'app-registrierung',
  templateUrl: './registrierung.component.html',
  styleUrls: ['./registrierung.component.css']
})

export class RegistrierungComponent implements OnInit {

  //Inhalte initialisieren
  nutzergefunden: Observable<Nutzer>;
  neuerNutzer;
  workspaceID;
  username = false;
  nachricht = " ";

  constructor(private mainService: MainService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.neuerNutzer = this.formBuilder.group({
      Nutzername: '',
      GanzerName: '',
      Email: '',
      Passwort: ''
    });
  }

  title = 'Lagom';

  registrierungTitel = "REGISTRIERUNG"

  ngOnInit(): void {
  }
  //Uepruefung vom Nutzername
  changeNutzername(name) {
    this.nutzergefunden = this.mainService.getNutzername(name);
    this.nutzergefunden.subscribe(data => {
      this.username = true;
      if (data[0] == null) { this.username = false; }
      if (this.username == true) {
        this.nachricht = "Nutzername ist bereits vorhanden";
        console.warn(this.nachricht)
      } else {
        this.nachricht = "";
      }
    });
  }
  //Neuer Nutzer erstellen
  submit(nutzerdaten) {
    const newNutzer = new Nutzer(nutzerdaten.Nutzername, nutzerdaten.GanzerName, nutzerdaten.Email, nutzerdaten.Passwort);
    if (nutzerdaten.Nutzername != "" && nutzerdaten.GanzerName != "" && nutzerdaten.Email != "" && nutzerdaten.Passwort != "") {
      if (nutzerdaten.Nutzername != null && nutzerdaten.GanzerName != null && nutzerdaten.Email != null && nutzerdaten.Passwort != null) {
        this.mainService.addNutzer(newNutzer).subscribe(data => { });
        console.log('Your data has been submitted', nutzerdaten);
        this.router.navigate(['/login/']);
      } else {
        console.log("Daten null");
        this.showError();
      }
    } else {
      console.log("Daten leer");
      this.showError();
    }
  }
  // Exception
  showError() {
    this.nachricht = "Alle Felder müssen ausgefüllt werden!";
    console.warn(this.nachricht);
  }
}