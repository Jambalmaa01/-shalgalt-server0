const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

const authRoutes = require('./router/auth');
const classRouter = require('./router/class');
const phoneRouter = require('./router/phone');
const connectDB = require('./connect/index');

dotenv.config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

connectDB();

app.use('/api', authRoutes); 
app.use('/api', classRouter);
app.use('/api', phoneRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
