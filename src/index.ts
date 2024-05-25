import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Demo data
const demoData = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Doe', age: 25 }
];

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Working with TypeScript...');
});

// GET route to send demo array of objects
app.get('/demo', (req: Request, res: Response) => {
    res.json(demoData);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
