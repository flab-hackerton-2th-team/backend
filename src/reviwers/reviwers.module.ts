import { Module } from '@nestjs/common';
import { ReviwersService } from './reviwers.service';
import { ReviwersController } from './reviwers.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Reviewer } from '../entities/reviewer';

@Module({
  imports: [MikroOrmModule.forFeature([Reviewer])],
  controllers: [ReviwersController],
  providers: [ReviwersService],
})
export class ReviwersModule {}
