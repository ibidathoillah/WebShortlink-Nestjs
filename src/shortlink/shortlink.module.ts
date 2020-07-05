import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortLink, ShortLinkSchema } from 'src/shortlink/shortlink.schema';
import { ShortLinkService } from 'src/shortlink/shortlink.service';
import { ShortLinkController } from 'src/shortlink/shortlink.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: ShortLink.name, schema: ShortLinkSchema }])],
  controllers: [ShortLinkController],
  providers: [ShortLinkService],
})
export class ShortLinkModule {}