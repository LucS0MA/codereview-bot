import app from './index'
import config from './config/config'

app.listen(config.port, () => {
    "Hello World!"
    console.log(`Server running on http://localhost:${config.port}`)
})