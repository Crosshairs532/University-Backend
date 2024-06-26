import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

//   for asynchronous  behavior
process.on('unhandledRejection', () => {
  console.log(`UnhandledRejection is detected, shutting down server....`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//  for synchronous behavior
process.on('uncaughtRejection', () => {
  console.log(`UnCaughtRejection is detected, shutting down server....`);

  process.exit(1);
});
