import { Module } from '@nestjs/common';
import { ReviewersService } from './reviewers.service';
import { ReviewersController } from './reviewers.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Reviewer } from '../entities/reviewer';

@Module({
  imports: [MikroOrmModule.forFeature([Reviewer])],
  controllers: [ReviewersController],
  providers: [ReviewersService],
})
export class ReviewersModule {}
