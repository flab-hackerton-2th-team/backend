import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from './auth/auth.module';
import mikroOrmConfig, { testConfig } from './mikro-orm.config';
import { ReviewersModule } from './reviewers/reviewers.module';
import { InterviewModule } from './interview/interview.module';

BigInt.prototype['toJSON'] = function () {
  return this.toString();
};

@Module({
  imports: [
    MikroOrmModule.forRoot(
      process.env.NODE_ENV === 'test' ? testConfig : mikroOrmConfig,
    ),
    AuthModule,
    ReviewersModule,
    InterviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
