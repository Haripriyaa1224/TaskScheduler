import express from 'express';
import { send, getHistory } from '../controllers/mail.js';

const router = express.Router();

router.post('/send', send);
router.get('/get', getHistory);

export default router;