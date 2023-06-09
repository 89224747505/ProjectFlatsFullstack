require('dotenv').config()
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const sequelize = require('./db');
const models = require('./models/models');
const router = require("./routes/index");
const corsOptions = {
    origin:process.env.CLIENT_URL,
    credentials:true,
    optionsSuccessStatus: 200
}
const errorMiddleware = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 4000;


const app = express();

 app.use(compression()); // Мидлвар для сжатия gzip
 app.use(express.json());
 app.use(cookieParser());
 app.use(cors(corsOptions));
 app.use('/api', router);
 app.use(errorMiddleware);

const startApp = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, ()=> {console.log(`Сервер запущен на порту ${PORT}`)})
    }
    catch (error){
        console.log(error);
    }
}

startApp();