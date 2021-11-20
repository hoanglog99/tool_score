const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const mongoDB = 'mongodb://localhost:27017/tool-excel';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('DB Connected!'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const User = require('./model/User')

app.get('/', function (req, res) {
    return res.send({ error: true, message: 'helloo' })
});

app.post('/login', async function (req, res) {
    const account=req.body
    const checkAccount=await User.findOne({email: account.email })
    if(!checkAccount){
        return res.send('khong co tai khoan')
    }
    if(account.password!==checkAccount.password){
        return res.send('sai o dau do doi`')
    }
    return res.send('dang nhap thanh cong')

})

app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
module.exports = app;