import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
// import Task from './models/task.js';
import taskRoutes from './routes/guestRoutes.js'
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


const PORT = process.env.PORT || 5000;

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use((req, res, next) => {
    res.status(404).json({
      message: "Not Found",
      code: 404,
      success: false,
      error: "The requested resource was not found on this server."
    });
  });

app.listen(PORT, () => console.log(`server is running on ${PORT}`));