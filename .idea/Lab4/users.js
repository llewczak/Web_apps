const express = require('express');
const {Sequelize, DataTypes} = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 3001;
const JWT_SECRET_KEY = 'haslo123';

app.use(express.json());

const sequelize = new Sequelize({dialect: 'sqlite', storage: './users.sqlite', logging: false});

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false}
});

app.post('/register', async (req, res) => {
    const {email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 9);

    try {
        const user = await User.create({email, password: hashedPassword});
        res.json({message: 'Uzytkownik utworzony', userId: user.id});
    } catch (e) {
        res.status(400).json({error: 'Email zajety lub bledne dane'});
    }
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});

    if (!user) return res.status(400).json({error: 'Bledny email lub haslo'});

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({error:'Bledny login lub haslo'});

    const token = jwt.sign({id:user.id, email:user.email}, JWT_SECRET_KEY, {expiresIn: '1h'});

    res.json({token});
});

app.listen(PORT, async () => {
   await sequelize.sync({force: true})
   console.log(`User port: ${PORT}`);
});