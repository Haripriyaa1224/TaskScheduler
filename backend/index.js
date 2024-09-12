import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req,res)=>{
    res.send('api working');
    })


app.listen(port, ()=>{
    console.log('listening on port '+port);
})