// SERVER.JS

const SERVER_PORT = 8080;

const mysql = require('mysql');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(cors());

//HOCHSCHUL SERVER
const con = mysql.createConnection({
    host: "195.37.176.178",
    port: "20133",
    user: "Gruppe5",
    password: "PlrROASg,'MPyp92yVN/Q00/Y\\?8g+1e",
    database: "20_Gruppe5_DB"
});

const server = app.listen(SERVER_PORT, function() {
    let host = server.address().address,
        port = server.address().port;
    console.log("App listening at http://%s:%s", host, port)
});

io.on('connection', (socket) => {
    console.log('Nutzer verbunden');
    socket.on('disconnect', () => {
        console.log('Nuter nicht mehr verbunden');
    });
    socket.on('refresh', (msg) => {
        console.log("Daten werden aktualisiert");
        io.emit('my broadcast', `server: ${msg}`);
    });
});

http.listen(3000, () => {
    console.log('Socket ist aktiv');
});

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '/dist/db-web-app')));

// GET-Anfragen 

app.get('/', function(req, res) {
    res.sendFile('app.component.html', { root: __dirname + '/src/app' });
});

app.get('/main', function(req, res) {
    res.sendFile('main.component.html', { root: __dirname + '/src/app/main' });
});

app.get('/eintrag', function(req, res) {
    con.query('SELECT * FROM Eintrag', function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/todo/:WorkspaceID', function(req, res) {
    con.query('SELECT * FROM Eintrag natural join ToDo where WorkspaceID = ? order by Datum asc ', req.params.WorkspaceID, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/ziel/:WorkspaceID', function(req, res) {
    con.query('SELECT * FROM Eintrag natural join Ziel where WorkspaceID = ? order by Datum asc', req.params.WorkspaceID, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/kalender/:WorkspaceID', function(req, res) {
    con.query('SELECT * FROM Eintrag natural join Kalender where WorkspaceID = ? order by Datum, Uhrzeit asc', req.params.WorkspaceID, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/erinnerung/:WorkspaceID', function(req, res) {
    con.query('SELECT * FROM Eintrag natural join Erinnerung where WorkspaceID = ? order by Datum, Uhrzeit asc', req.params.WorkspaceID, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/tagebuch/:WorkspaceID', function(req, res) {
    con.query('SELECT * FROM Eintrag natural join Tagebuch where WorkspaceID = ? order by Datum desc', req.params.WorkspaceID, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/motivation/:WorkspaceID', function(req, res) {
    const sql = 'SELECT * FROM Motivation ORDER BY RAND() LIMIT 1';
    con.query(sql, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/galerie/:WorkspaceID', function(req, res) {
    const sql = "SELECT * FROM Bild ORDER BY RAND() LIMIT 3";
    con.query(sql, req.params.WorkspaceID, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/nutzer', function(req, res) {
    con.query('SELECT * FROM Nutzer', function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/nutzername/:name', function(req, res) {
    con.query('SELECT * FROM Nutzer where Nutzername = ?', req.params.name, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

//SPEZIFISCHES GETTEN EINES EINTRAGES
app.get('/eintrag/:EintragID/:Art', function(req, res) {
    const Art = req.params.Art;
    const sql = 'SELECT * FROM Eintrag natural join ' + Art + ' WHERE EintragID = ?';

    con.query(sql, req.params.EintragID, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/nutzer/:Nutzername/:Passwort', function(req, res) {
    const Nutzername = req.params.Nutzername;
    const Passwort = req.params.Passwort;

    const sql = "SELECT * FROM Nutzer WHERE Nutzername = ? AND Passwort = ? ";
    const values = [Nutzername, Passwort];

    con.query(sql, values, function(error, results, fields) {
        if (results[0] == null) {
            results[0] = "404"
        }
        if (error) throw error;
        res.send(results);
    });
});

app.get('/nutzer/:NutzerID', function(req, res) {
    const sql = 'SELECT WorkspaceID FROM Workspace WHERE NutzerID = ?';
    con.query(sql, req.params.NutzerID, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/workspace/:WorkspaceID', function(req, res) {
    const sql = 'SELECT * FROM Nutzer natural join Workspace WHERE WorkspaceID = ?';
    con.query(sql, req.params.WorkspaceID, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

// POST-Methoden

app.post('/nutzer', function(req, res) {
    const Nutzername = req.body.Nutzername;
    const GanzerName = req.body.GanzerName;
    const Email = req.body.Email;
    const Passwort = req.body.Passwort;

    const sql = "INSERT INTO Nutzer (Nutzername, Ganzername, Email, Passwort)" + "VALUES (?, ?, ?, ?)";
    const values = [Nutzername, GanzerName, Email, Passwort];

    con.query(sql, values, function(error, results, fields) {
        sql2 = "INSERT INTO Workspace (NutzerID, MotivationID)" + " VALUES (?, (SELECT FLOOR (RAND () * (100011-100001) + 100001)))";
        values2 = [results.insertId];

        con.query(sql2, values2, function(error, results, fields) {
            if (error) throw error;
            res.send(results);
        });
    });
});

app.post('/eintragerstellen', function(req, res) {
    const Datum = req.body.Datum;
    const Titel = req.body.Titel;
    const Untertitel = req.body.Untertitel;
    const Text = req.body.Text;
    const Notiz = req.body.Notiz;
    const Anmerkung = req.body.Anmerkung;
    const Art = req.body.EintragArt;
    const WorkspaceID = req.body.WorkspaceID;
    const Uhrzeit = req.body.Uhrzeit;

    const sql1 = "INSERT INTO Eintrag (Datum, Titel, Untertitel, Text, Notiz, Anmerkung)" + "VALUES (?, ?, ?, ?, ?, ?)";
    const values1 = [Datum, Titel, Untertitel, Text, Notiz, Anmerkung];

    con.query(sql1, values1, function(error, results, fields) {
        if (Art == "Erinnerung" || Art == "Kalender") {
            const sql2 = "INSERT INTO " + Art + " (WorkspaceID, EintragID, Uhrzeit)" + "VALUES (?, ?, ?)";
            const values2 = [WorkspaceID, results.insertId, Uhrzeit];
            con.query(sql2, values2, function(error, results, fields) {
                if (error) throw error;
                res.send(results);
            });
        } else {
            const sql2 = "INSERT INTO " + Art + " (WorkspaceID, EintragID)" + " VALUES (?, ?)"
            const values2 = [WorkspaceID, results.insertId];
            con.query(sql2, values2, function(error, results, fields) {
                if (error) throw error;
                res.send(results);
            });
        }
    });
});

// PUT-Methode

app.put('/eintragUpdate/:Art', function(req, res) {
    const Art = req.params.Art;
    const EintragID = req.body[0].EintragID;
    const Datum = req.body[0].Datum;
    const Titel = req.body[0].Titel;
    const Untertitel = req.body[0].Untertitel;
    const Text = req.body[0].Text;
    const Notiz = req.body[0].Notiz;
    const Anmerkung = req.body[0].Anmerkung;
    const Uhrzeit = req.body[0].Uhrzeit;

    const sql = "UPDATE Eintrag SET Datum = ?, Titel = ?, Untertitel = ?, Text = ?, Notiz = ?, Anmerkung = ? WHERE EintragID = ?";

    const values = [Datum, Titel, Untertitel, Text, Notiz, Anmerkung, EintragID];

    con.query(sql, values, function(error, results, fields) {
        if (Art == "Erinnerung" || Art == "Kalender") {
            const sql2 = "UPDATE " + Art + " SET Uhrzeit = ? WHERE EintragID = ?";
            const values2 = [Uhrzeit, EintragID];
            con.query(sql2, values2, function(error, results, fields) {
                if (error) throw error;
                res.send(results);
            });
        }
    });
});

app.put('/eintragUpdateTodo/', function(req, res) {
    const EintragID = req.body.EintragID;
    const Erledigt = req.body.Erledigt;

    sql = 'UPDATE ToDo SET Erledigt = ? WHERE EintragID = "?"';
    values = [Erledigt, EintragID];

    con.query(sql, values, function(error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

// DELETE-Methoden

app.delete('/zielDelete/:EintragID', function(req, res) {
    const sql = " DELETE FROM Ziel WHERE EintragID = ?";
    const sql2 = "DELETE FROM Eintrag WHERE EintragID = ?";
    const values = [req.params.EintragID];
    con.query(sql, values, function(error, results, fields) {
        con.query(sql2, values, function(error, results, fields) {
            if (error) throw error;
            res.send(results);
        });
    });
});

app.delete('/kalenderDelete/:EintragID', function(req, res) {
    const sql = " DELETE FROM Kalender WHERE EintragID = ?";
    const sql2 = "DELETE FROM Eintrag WHERE EintragID = ?";
    const values = [req.params.EintragID];
    con.query(sql, values, function(error, results, fields) {
        con.query(sql2, values, function(error, results, fields) {
            if (error) throw error;
            res.send(results);
        });
    });
});

app.delete('/tagebuchDelete/:EintragID', function(req, res) {
    const sql = " DELETE FROM Tagebuch WHERE EintragID = ?";
    const sql2 = "DELETE FROM Eintrag WHERE EintragID = ?";
    const values = [req.params.EintragID];
    con.query(sql, values, function(error, results, fields) {
        con.query(sql2, values, function(error, results, fields) {
            if (error) throw error;
            res.send(results);
        });
    });
});

app.delete('/todoDelete/:EintragID', function(req, res) {
    const sql = " DELETE FROM ToDo WHERE EintragID = ?";
    const sql2 = "DELETE FROM Eintrag WHERE EintragID = ?";
    const values = [req.params.EintragID];
    con.query(sql, values, function(error, results, fields) {
        con.query(sql2, values, function(error, results, fields) {
            if (error) throw error;
            res.send(results);
        });
    });
});

app.delete('/erinnerungDelete/:EintragID', function(req, res) {
    const sql = " DELETE FROM Erinnerung WHERE EintragID = ?";
    const sql2 = "DELETE FROM Eintrag WHERE EintragID = ?";
    const values = [req.params.EintragID];
    con.query(sql, values, function(error, results, fields) {
        con.query(sql2, values, function(error, results, fields) {
            if (error) throw error;
            res.send(results);
        });
    });
});