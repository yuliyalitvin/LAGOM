import { APIConfig } from '../APIconfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Eintrag } from '../model/eintrag';
import { Ziel } from '../model/ziel';
import { Todo } from '../model/todo';
import { Erinnerung } from '../model/erinnerung';
import { Galerie } from '../model/galerie';
import { Motivation } from '../model/motivation';
import { Nutzer } from '../model/nutzer';
import { Tagebuch } from '../model/tagebuch';
import { Kalender } from '../model/kalender';
import * as io from 'socket.io-client';
import { env } from 'process';

@Injectable({
    providedIn: 'root'
})

//Zentrale Steuerung aller Services
export class MainService {
    socket;

    constructor(private http: HttpClient) { }

    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    //Socket verbindung erstellen
    setupSocketConnection() {
        this.socket = io(env.SOCKET_ENDPOINT);
    }

    //Deklarierung der URL
    private readonly zielUrl = APIConfig.URL + ':' + APIConfig.PORT + '/ziel';
    private readonly todoUrl = APIConfig.URL + ':' + APIConfig.PORT + '/todo';
    private readonly erinnerungUrl = APIConfig.URL + ':' + APIConfig.PORT + '/erinnerung';
    private readonly galerieUrl = APIConfig.URL + ':' + APIConfig.PORT + '/galerie';
    private readonly motivationUrl = APIConfig.URL + ':' + APIConfig.PORT + '/motivation';
    private readonly nutzerUrl = APIConfig.URL + ':' + APIConfig.PORT + '/nutzer';
    private readonly workspaceUrl = APIConfig.URL + ':' + APIConfig.PORT + '/workspace';
    private readonly tagebuchUrl = APIConfig.URL + ':' + APIConfig.PORT + '/tagebuch';
    private readonly kalenderUrl = APIConfig.URL + ':' + APIConfig.PORT + '/kalender';
    private readonly eintragUrl = APIConfig.URL + ':' + APIConfig.PORT + '/eintrag';

    //LogIn Anfrage an Server
    loginNutzer(nutzer: Nutzer): Observable<Nutzer[]> {
        const Nutzername = typeof nutzer === 'string' ? nutzer : nutzer.Nutzername;
        const Passwort = typeof nutzer === 'string' ? nutzer : nutzer.Passwort;
        const url = this.nutzerUrl + "/" + Nutzername + "/" + Passwort;
        return this.http.get<Nutzer[]>(url);
    }

    //Inhalte beim Server anfragen / GETTEN
    getNutzerdaten(WorkspaceID: number) {
        const url = this.workspaceUrl + "/" + WorkspaceID;
        return this.http.get(url);
    }
    getNutzername(nutzername: string): Observable<Nutzer> {
        const url = this.nutzerUrl + "name/" + nutzername;
        return this.http.get<Nutzer>(url);
    }
    getZiele(WorkspaceID: number): Observable<Ziel[]> {
        const url = this.zielUrl + "/" + WorkspaceID;
        return this.http.get<Ziel[]>(url);
    }
    getTodos(WorkspaceID: number): Observable<Todo[]> {
        const url = this.todoUrl + "/" + WorkspaceID;
        return this.http.get<Todo[]>(url);
    }
    getErinnerungen(WorkspaceID: number): Observable<Erinnerung[]> {
        const url = this.erinnerungUrl + "/" + WorkspaceID;
        return this.http.get<Erinnerung[]>(url);
    }
    getGalerien(WorkspaceID: number): Observable<Galerie[]> {
        const url = this.galerieUrl + "/" + WorkspaceID;
        return this.http.get<Galerie[]>(url);
    }
    getMotivationen(WorkspaceID: number): Observable<Motivation[]> {
        const url = this.motivationUrl + "/" + WorkspaceID;
        return this.http.get<Motivation[]>(url);
    }
    getNutzerListe(): Observable<Nutzer[]> {
        return this.http.get<Nutzer[]>(this.nutzerUrl);
    }
    getTagebuch(WorkspaceID: number): Observable<Tagebuch[]> {
        const url = this.tagebuchUrl + "/" + WorkspaceID;
        return this.http.get<Tagebuch[]>(url);
    }
    getKalender(WorkspaceID: number): Observable<Kalender[]> {
        const url = this.kalenderUrl + "/" + WorkspaceID;
        return this.http.get<Kalender[]>(url);
    }
    getEintrag(gesuchterEintrag: Number, Art: String): Observable<any> {
        const url = this.eintragUrl + "/" + gesuchterEintrag + "/" + Art;
        return this.http.get<Eintrag>(url);
    }
    getWorkspaceID(NutzerID: Number) {
        const url = this.nutzerUrl + "/" + NutzerID;
        return this.http.get(url);
    }

    //Hinzufügen mit Daten an den Server
    addNutzer(newNutzer: Nutzer): Observable<Nutzer> {
        return this.http.post<Nutzer>(this.nutzerUrl,
            {
                "NutzerID": newNutzer.NutzerID,
                "Nutzername": newNutzer.Nutzername,
                "GanzerName": newNutzer.GanzerName,
                "Email": newNutzer.Email,
                "Passwort": newNutzer.Passwort
            }, this.httpOptions);
    }
    addEintrag(newEintrag: Eintrag, EintragArt: String, WorkspaceID: number): Observable<Eintrag> {
        const url = this.eintragUrl + "erstellen"
        return this.http.post<Eintrag>(url,
            {
                "Datum": newEintrag.Datum,
                "Uhrzeit": newEintrag.Uhrzeit,
                "Titel": newEintrag.Titel,
                "Untertitel": newEintrag.Untertitel,
                "Text": newEintrag.Text,
                "Notiz": newEintrag.Notiz,
                "Anmerkung": newEintrag.Anmerkung,
                "EintragArt": EintragArt,
                "WorkspaceID": WorkspaceID,
            }, this.httpOptions)
    }

    // Aktualisieren von Einträgen    
    updateEintrag(eintraege: Eintrag): Observable<Eintrag> {
        const url = this.eintragUrl + "Update/" + eintraege.Art;
        return this.http.put<Eintrag>(url, eintraege, this.httpOptions);
    }
    updateToDo(todoEintrag: Todo): Observable<Todo> {
        const url = this.eintragUrl + "UpdateTodo/";
        return this.http.put<Todo>(url, todoEintrag, this.httpOptions);
    }

    //Löschen Anfrage an Server
    deleteZielEintrag(zielEintrag: Eintrag): Observable<Eintrag> {
        const EintragID = typeof zielEintrag === 'number' ? zielEintrag : zielEintrag.EintragID;
        const url = this.zielUrl + "Delete/" + EintragID;
        return this.http.delete<Eintrag>(url, this.httpOptions);
    }
    deleteKalenderEintrag(kalenderEintrag: Eintrag): Observable<Eintrag> {
        const EintragID = typeof kalenderEintrag === 'number' ? kalenderEintrag : kalenderEintrag.EintragID;
        const url = this.kalenderUrl + "Delete/" + EintragID;
        return this.http.delete<Eintrag>(url, this.httpOptions);
    }
    deleteTagebuchEintrag(tagebuchEintrag: Eintrag): Observable<Eintrag> {
        const EintragID = typeof tagebuchEintrag === 'number' ? tagebuchEintrag : tagebuchEintrag.EintragID;
        const url = this.tagebuchUrl + "Delete/" + EintragID;
        return this.http.delete<Eintrag>(url, this.httpOptions);
    }
    deleteToDoEintrag(todoEintrag: Eintrag): Observable<Eintrag> {
        const EintragID = typeof todoEintrag === 'number' ? todoEintrag : todoEintrag.EintragID;
        const url = this.todoUrl + "Delete/" + EintragID;
        return this.http.delete<Eintrag>(url, this.httpOptions)
    }
    deleteErinnerungEintrag(erinnerungEintrag: Eintrag): Observable<Eintrag> {
        const EintragID = typeof erinnerungEintrag === 'number' ? erinnerungEintrag : erinnerungEintrag.EintragID;
        const url = this.erinnerungUrl + "Delete/" + EintragID;
        return this.http.delete<Eintrag>(url, this.httpOptions);
    }
}