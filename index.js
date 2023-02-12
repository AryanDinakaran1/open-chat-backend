//Imports
const express = require('express')
const cors = require('cors')
const con = require('./db');

//Init & Middleware
app = express();
app.use(express.json())
app.use(cors())
app.listen(8000)

//Routes

//Hello World
app.get('/hello-world', (req, res) => {
    res.status(200).json({
        'hello' : 'world'
    })
})

//Create Chat
app.post('/create-chat', (req, res) => {
    const { username, text } = req.body;
    con.query(`INSERT INTO Chats (username, text) VALUES ('${username}', '${text}')`, (err, row) => {
        if (err) throw err;
        res.status(200).json(row)
    })
})

//Get Chats
app.get('/get-chats', (req, res) => {
    con.query('SELECT * FROM Chats', (err, rows) => {
        if (err) throw err;
        res.status(200).json(rows)
    })
})

//Get Chats
app.get('/get-chat/:id', (req, res) => {

    const { id } = req.params;

    con.query(`SELECT * FROM Chats WHERE id = ${id}`, (err, rows) => {
        if (err) throw err;
        res.status(200).json(rows[0])
    })
})

//Update Chats
app.put('/update-chat/:id', (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    con.query(`UPDATE Chats SET text = '${text}' WHERE id = ${id}`, (err, row) => {
        if (err) throw err;
        res.status(200).json(row)
    })
})

//Delete Chats
app.delete('/delete-chat/:id', (req, res) => {
    const { id } = req.params;
    con.query(`DELETE FROM Chats WHERE id = ${id}`, (err, row) => {
        if (err) throw err;
        res.status(200).json(row)
    })
})