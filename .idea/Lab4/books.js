const express = require('express');
const axios = require('axios');
const {Sequelize, DataTypes} = require('sequelize');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3002;

app.use(express.json());

const sequelize = new Sequelize({dialect: 'sqlite', storage: './books.sqlite', logging: false});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({error: 'Brak tokenu'});

    jwt.verify(token, 'haslo123', (err, user) => {
        if (err) return res.status(403).json({error: 'Nieprawidlowy token'});
        req.user = user;
        next();
    });
};

const Books = sequelize.define('Books', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    author: {type: DataTypes.STRING, allowNull: false},
    year: {type: DataTypes.INTEGER, allowNull: false}
});

app.get('/books', authenticateToken, async (req, res) => {
    try {
        const allBooks = await Books.findAll();
        res.json({
            books: allBooks
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({error: 'Nie udalo sie pobrac listy ksiazek'});
    }
});

app.get('/books/:bookId', authenticateToken, async (req, res) => {
    const bookId = req.params.bookId;

    try {
        const bookInfo = await Books.findByPk(bookId);

        if (!bookInfo) {
            return res.status(404).json({error: 'Ksiazka nie istnieje'});
        }

        res.json(bookInfo);

    } catch (e) {
        console.error(e);
        res.status(500).json({error: 'Blad podczas szukania ksiazki'});
    }
});

app.post('/books', authenticateToken, async (req, res) => {
    const {title, author, year} = req.body;

    try {
        const book = await Books.create({
            title: title,
            author: author,
            year: year
        });
        res.json({message: `Dodano ksiazke o id: ${book.id}`});
    } catch (e) {
        console.error(e);
        res.status(500).json({error: 'Blad podczas dodawania ksiazki'});
    }
});

app.delete('/books/:bookId', authenticateToken, async (req, res) => {
    const bookId = req.params.bookId;
    const book = await Books.findByPk(bookId);

    if (!book) {
        return res.status(404).json({error: 'Ksiazka nie istnieje'});
    }

    await Books.destroy({
        where: {id: bookId}
    });

    res.json({message:'Ksiazka usunieta'});
});

app.listen(PORT, async () => {
    await sequelize.sync({force: true});
    console.log(`Books port: ${PORT}`);
});