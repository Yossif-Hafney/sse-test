const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    setInterval(() => {
        const prices = {
            BTC: (Math.random() * 1000 + 60000).toFixed(2),
            ETH: (Math.random() * 100 + 3000).toFixed(2),
            SOL: (Math.random() * 10 + 100).toFixed(2)
        };
        res.write(`data: ${JSON.stringify({ prices, time: new Date().toLocaleTimeString() })}\n\n`);
    }, 1000);
});
app.listen(5000, () => console.log('Server running on port 5000'));