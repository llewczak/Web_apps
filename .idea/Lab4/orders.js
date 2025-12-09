const express = require('express');
const axios = require('axios');
const {Sequelize, DataTypes} = require('sequelize');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3003;

app.use(express.json());

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

const sequelize = new Sequelize({dialect: 'sqlite', storage: './orders.sqlite', logging: false});

const Orders = sequelize.define('Orders', {
    userId: {type: DataTypes.INTEGER, allowNull: false},
    bookId: {type: DataTypes.INTEGER, allowNull: false},
    quantity: {type: DataTypes.INTEGER, defaultValue: 1}
});

app.post('/orders', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    const {bookId, quantity} = req.body;

    try {
        let bookResponse;
        try {
            bookResponse = await axios.get(`http://localhost:3002/books/${bookId}`, {headers: {Authorization: req.headers['authorization']} });
        } catch (e) {
            console.error(e);
            return res.status(404).json({error: 'Ksiazka nie istnieje'});
        }

        const book = bookResponse.data;

        const newOrder = await Orders.create({
            userId: userId,
            bookId: book.id,
            quantity: quantity
        });

        res.json({
            message: 'Zamowienie zlozone pomyslnie',
            orderId: newOrder.id,
            book: book.title,
            user: req.user.email
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({error: 'Blad serwera'});
    }
});

app.get('/orders/:userId', authenticateToken, async (req, res) => {
    if (req.user.id != req.params.userId) {
        return res.status(403).json({error: 'Nie masz dostepu do zamowien innego uzytkownika'});
    }

    const orders = await Orders.findAll({
        where: {userId: req.params.userId}
    });

    if (!orders || orders.length === 0) {
        return res.status(404).json({message: 'Uzytkownik nie ma zadnych zamowien'});
    }

    res.json(orders);
});

app.delete('/delete/:orderId', authenticateToken, async (req, res) => {
    const orderId = req.params.orderId;

    const order = await Orders.findOne({
        where: {id: orderId}
    });

    if (!order) return res.status(404).json({error: 'Zamowienie o podanym id nie istnieje'});

    if (order.userId != req.user.id) {
        return res.status(403).json({error: 'Proba usuniecia cudzego zamowienia'});
    }

    await Orders.destroy({
        where: {id: orderId}
    });

    res.json({message: 'Zamowienie usuniete'});
});

app.patch('/orders/:orderId', authenticateToken, async (req, res) => {
    try {
        const {quantity} = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({error: 'Podaj poprawna ilosc'})
        }

        const orderId = req.params.orderId;

        const order = await Orders.findOne({
            where: {id: orderId}
        });

        if (!order) return res.status(404).json({error: 'Zamowienie nie istnieje'});

        if (order.userId != req.user.id) {
            return res.status(403).json({error: 'Proba edycji cudzego zamowienia'});
        }

        await Orders.update({
            quantity: quantity
        }, {
            where: {id: orderId}

        });

        res.json({message: 'Zamowienie zostalo pomyslnie edytowane'});
    } catch (e) {
        console.error(e);
        res.status(500).json({error: 'Blad podczas edycji zamowienia'});
    }
});

app.listen(PORT, async () => {
    await sequelize.sync({force: true});
    console.log(`Orders port: ${PORT}`);
});