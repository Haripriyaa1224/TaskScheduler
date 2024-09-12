import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';
import mailRouter from './routes/mail.js';
import mongoose from 'mongoose';



const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log("Server connection established")
})

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