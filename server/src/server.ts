
import app from './app';
import connectDB from './config/database';
const PORT = process.env.PORT || 4000;

connectDB()

app.listen((PORT), () => {
    console.log(`Server running on port ${PORT}`);
});

