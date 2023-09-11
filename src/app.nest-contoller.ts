import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.nest-service';

@Controller('api-hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
