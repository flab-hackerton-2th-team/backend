import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from './auth/auth.module';
import mikroOrmConfig, { testConfig } from './mikro-orm.config';
import { ReviewersModule } from './reviewers/reviewers.module';
import { InterviewModule } from './interview/interview.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

BigInt.prototype['toJSON'] = function () {
  return this.toString();
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        if (configService.get('NODE_ENV') === 'test') {
          return testConfig;
        }

        return {
          ...mikroOrmConfig,
          dbName: configService.get('DB_NAME'),
          user: configService.get('USERNAME'),
          password: configService.get('PASSWORD'),
          host: configService.get('HOST'),
          port: configService.get('PORT'),
        };
      },
    }),
    AuthModule,
    ReviewersModule,
    InterviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
