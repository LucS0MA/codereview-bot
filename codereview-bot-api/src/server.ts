import app from './index'
import config from './config/config'

app.listen(config.port, () => {
    "Hello World!"
    console.log(`Server running on http://localhost:${config.port}`)
})

app.post('/api/webhooks/github', (req, res) => {
    console.log('🎯 WEBHOOK REÇU !');
    console.log('Headers', req.headers);
    console.log('Body', req.body);
    res.status(200).send('OK');
})