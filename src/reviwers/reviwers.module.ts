import { Module } from '@nestjs/common';
import { ReviwersService } from './reviwers.service';
import { ReviwersController } from './reviwers.controller';

@Module({
  controllers: [ReviwersController],
  providers: [ReviwersService],
})
export class ReviwersModule {}
