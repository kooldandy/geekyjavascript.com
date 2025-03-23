import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
  ) {}

  async checkDatabaseConnection(): Promise<{
    status: string;
    latency: number;
    details?: any;
  }> {
    try {
      const startTime = Date.now();

      // Check if connection is ready
      if (!this.mongoConnection.readyState) {
        throw new Error('Database not connected');
      }

      // Ping database
      await this.mongoConnection.db.admin().ping();

      const latency = Date.now() - startTime;

      return {
        status: 'connected',
        latency,
      };
    } catch (error) {
      return {
        status: 'error',
        latency: 0,
        details: {
          error: error.message,
          code: error.code,
        },
      };
    }
  }

  // checkCacheConnection(): Promise<string> {
  //   // Implementation of checkCacheConnection method
  //   return Promise.resolve('Cache connection check successful');
  // }

  handleGlobalError(error: Error) {
    // Log to monitoring service
    // Send alerts if needed
    // Handle different types of errors
  }
}
