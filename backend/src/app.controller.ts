import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({ summary: 'Check system health' })
  @ApiResponse({ 
    status: 200,
    description: 'System health information',
    schema: {
      example: {
        status: 'healthy',
        timestamp: '2024-03-23T12:00:00Z',
        database: {
          status: 'connected',
          latency: 5,
        }
      }
    }
  })
  async healthCheck() {
    const dbStatus = await this.appService.checkDatabaseConnection();
    
    return {
      status: dbStatus.status === 'connected' ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      database: dbStatus,
      uptime: process.uptime(),
      memory: process.memoryUsage()
    };
  }

  @Get('/version')
  getVersion() {
    return {
      version: process.env.npm_package_version,
      environment: process.env.NODE_ENV,
      lastDeployment: process.env.DEPLOYMENT_DATE,
    };
  }
}
