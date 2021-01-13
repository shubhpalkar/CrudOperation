import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpErrorFliter } from './Shared/http_error.filter';
import { loggingInterceptor } from './Shared/logging.interceptor';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService,{ provide: APP_FILTER, useClass: HttpErrorFliter },
    { provide: APP_INTERCEPTOR, useClass: loggingInterceptor },
    AuthService],
  })


export class AppModule { }
