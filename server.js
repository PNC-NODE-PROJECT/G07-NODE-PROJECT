const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())


app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
})


const itemRouter = require('./routes/quiz_route');


app.use('/quiz', itemRouter)

