import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

import authRoutes from './routes/authRoutes';
import clientRoutes from './routes/clientRoutes';
import visitRoutes from './routes/visitRoutes';

app.get('/', (req, res) => {
    res.send('Field Survey API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/visits', visitRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
