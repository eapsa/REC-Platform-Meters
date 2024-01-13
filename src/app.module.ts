import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetersModule } from './meters/meters.module';

@Module({
  imports: [MetersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
