import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import taskRoutes from './routes/guestRoutes.js';
import pgroutes from './routes/owner/pgInfoRoute.js';
import authRoutes from './routes/auth.js';
import owners from './routes/admin/owners.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/tasks', taskRoutes);
app.use('/api/pg', pgroutes);
app.use('/auth', authRoutes);
app.use('/owners', owners);

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Server Error",
    code: 500,
    success: false,
    error: err.message || "An unexpected error occurred."
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
