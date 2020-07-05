import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortLinkModule } from '../shortlink/shortlink.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://ibidathoillah:admin123@ds147354.mlab.com:47354/shortlink'),
    AuthModule,
    ShortLinkModule,
]
})
export class AppModule {}