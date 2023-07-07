import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './config';

const dbConfig = databaseConfig().database;

console.log('--------------------------------', dbConfig);

@Module({
  imports: [
    // MongooseModule.forRoot(dbConfig.host, {
    //   retryAttempts: 2,
    //   retryDelay: 1000,
    //   connectionName: 'dsds',
    //   lazyConnection: true,
    // }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: dbConfig.host,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'geekyjavascriptdb',
      }),
    }),
  ],
})
export class DatabaseModule {}
