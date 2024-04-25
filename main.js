const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const client = new Client({
    authStrategy: new LocalAuth(),
    webVersionCache: {
      type: "remote",
      remotePath:
        "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
    },
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('message_create', async message => {
    console.log(message.body);
    console.log(message.from);
    console.log(message.title);
        const chat = await message.getChat();
        console.log(`Message received in group: ${chat.name}`);
     
    
});

client.initialize();
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});