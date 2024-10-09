import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import categoryRouter from './routes/categories.js';
import productRoutes from './routes/products.js';
import config from './configs/config.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json())
app.use('/products', productRoutes);
app.use('/categories', categoryRouter);
app.use('/auth', authRouter);

// Connect database
const url = config.MONGO_DB_URL;
await mongoose.connect(url);

app.listen(PORT, () => console.log('Server is running on port ' + PORT))
