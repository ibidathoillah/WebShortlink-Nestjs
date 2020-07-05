import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortLinkModule } from '../shortlink/shortlink.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({        
        uri: configService.get<string>('database.mongodbUrl', 'localhost'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ShortLinkModule,
]
})
export class AppModule {}