import server from './app';
import { PORT } from './config';

const startServer = async (): Promise<void> => {
  try {
    console.log('Connection has been established successfully.');
    server.listen(PORT, (): void => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
startServer();
