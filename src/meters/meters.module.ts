import { Module } from '@nestjs/common';
import { MetersController } from './meters.controller';
import { MetersService } from './meters.service';

@Module({

  controllers: [MetersController],
  providers: [MetersService]
})
export class MetersModule {}
