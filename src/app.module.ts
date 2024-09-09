import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from './auth/auth.module';
import mikroOrmConfig, { testConfig } from './mikro-orm.config';
import { ReviwersModule } from './reviwers/reviwers.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(
      process.env.NODE_ENV === 'test' ? testConfig : mikroOrmConfig,
    ),
    AuthModule,
    ReviwersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
