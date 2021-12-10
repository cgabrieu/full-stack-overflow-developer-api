import app from './app';
import './setup';

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});