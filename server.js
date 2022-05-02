const express = require('express')
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000
app.use(cors({origin: '*'}));
app.use(express.json())


app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
})


const itemRouter = require('./routes/quiz_route');
const userRouter = require('./routes/user_route');


app.use('/quiz', itemRouter);
app.use('/user', userRouter);
app.use(express.static("public"));


