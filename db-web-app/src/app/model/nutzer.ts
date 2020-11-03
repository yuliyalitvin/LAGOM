export class Nutzer{
    NutzerID  : number;
    Nutzername  : string;
    GanzerName : string;
    Email : string;
    Passwort : string;

    constructor(nutzername: string, ganzername: string, email: string, passwort: string) {
        // this.NutzerID = nutzerID;
        this.Nutzername = nutzername;
        this.GanzerName = ganzername;
        this.Email = email;
        this.Passwort = passwort;
    }

}