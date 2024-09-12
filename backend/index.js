import express from 'express';
import dotenv from 'dotenv/config';
import mailRouter from './routes/mail.js';


const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req,res)=>{
    res.send('api working');
    })
app.use('/api/mail/', mailRouter)

const server = app.listen(port, ()=>{
    console.log('listening on port '+port);
})

server.on('error', (err) => {
    console.error('Error starting the server:', err.message);
});