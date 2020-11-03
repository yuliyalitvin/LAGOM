export class Eintrag{
    Art : String;
    EintragID  : number;
    Datum : String;
    Uhrzeit: String;
    Titel : String;
    Untertitel : String;
    Text : String;
    Notiz : String;
    Anmerkung : String;

    constructor(datum: String, uhrzeit:string, Titel: string, untertitel: string, text: string, notiz: string, anmerkung: string) {
        this.Datum = datum;
        this.Uhrzeit = uhrzeit;
        this.Titel = Titel;
        this.Untertitel = untertitel;
        this.Text = text;
        this.Notiz = notiz;
        this.Anmerkung = anmerkung;   
    }
}