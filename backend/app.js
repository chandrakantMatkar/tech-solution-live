const express = require('express')
const cors = require('cors')
const app = express();
const sequelize = require('./database');
const port = 5000

// Middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/products', require('./routes/products'));
app.use('/api/contacts', require('./routes/contact'));
app.use('/api/auth', require('./routes/auth'));
app.get('/',(req, res)=>{
    res.send('hello world');
})

sequelize.sync()
    .then(result => {

        app.listen(port, () => {
            console.log(`Tech Solution app listening on port ${port}`)
        })
    }

    ).catch(err => console.log('error starting the erver. ', err));