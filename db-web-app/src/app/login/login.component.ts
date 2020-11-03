import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MainService } from '../service/main.service';
import { Observable, from } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Nutzer } from '../model/nutzer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  title = 'Lagom';

  //Inhalte initialisieren
  loginTitel = "LOGIN"
  nutzerLogin;
  nutzerGefunden: Observable<Nutzer[]>;
  nutzername: Observable<Nutzer>;
  obj;
  workspaceID;
  username = true;
  nachricht = " ";

  constructor(private mainService: MainService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.nutzerLogin = this.formBuilder.group({
      Nutzername: '',
      Passwort: ''
    });
  }

  ngOnInit(): void {
  }

  changeNutzername(name) {
    this.nutzername = this.mainService.getNutzername(name);
    this.nutzername.subscribe(data => {
      this.username = true;
      if (data[0] == null) { this.username = false; }
      if (this.username == false) {
        this.nachricht = "Nutzername nicht vorhanden!";
        console.warn(this.nachricht)
      } else {
        this.nachricht = "";
      }
    });
  }
  // Nutzerdaten werden überprüft
  submit(nutzerdaten) {
    const nutzerLogin = new Nutzer(nutzerdaten.Nutzername, nutzerdaten.GanzerName, nutzerdaten.Email, nutzerdaten.Passwort);
    console.log("login: " + nutzerLogin.Nutzername)
    if (nutzerdaten.Nutzername != "" && nutzerdaten.Passwort != "" && this.username) {
      if (nutzerdaten.Nutzername != null && nutzerdaten.Passwort != null && this.username) {
        this.nutzerGefunden = this.mainService.loginNutzer(nutzerLogin);
        this.nutzerGefunden.subscribe(data => {
          this.obj = data[0];
          if (this.obj == "404") {
            this.passwortError();
          } else {
            this.workspaceID = this.mainService.getWorkspaceID(data[0].NutzerID);
            this.workspaceID.subscribe(data => {
              this.router.navigate(['/main/' + data[0].WorkspaceID]);
            });
          }
        });
      } else {
        console.log("Daten unvollständig")
        this.showError();
      }
    } else {
      console.log("Daten unvollständig")
      this.showError();
    }
  }

  // Exceptions werden geworfen
  showError() {
    this.nachricht = "Alle Felder müssen ausgefüllt werden!";
    console.warn(this.nachricht);
  }

  passwortError() {
    this.nachricht = "Passwort falsch!";
    console.warn(this.nachricht);
  }

}
