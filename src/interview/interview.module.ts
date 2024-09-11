import { Module } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Interview } from '../entities/interview';
import { Reviewer } from '../entities/reviewer';

@Module({
  imports: [MikroOrmModule.forFeature([Interview, Reviewer])],
  controllers: [InterviewController],
  providers: [InterviewService],
})
export class InterviewModule {}
