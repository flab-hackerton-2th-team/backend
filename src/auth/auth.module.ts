import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Interviewer } from '../entities/interviewer';

@Module({
  imports: [MikroOrmModule.forFeature([Interviewer])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
