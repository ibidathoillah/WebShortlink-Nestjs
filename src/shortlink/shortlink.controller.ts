import { Controller, Get, Post, Body, UseFilters, UseGuards,Request, Put, Param, Delete, HttpStatus, Redirect, Query } from '@nestjs/common';
import { ShortLinkService } from './shortlink.service';
import { ShortLink } from 'src/shortlink/shortlink.schema';
import { ShortlinkDto, CreateRandomShortlinkDto } from 'src/shortlink/shortlink.dto';
import { AllExceptionsFilter } from 'src/common/all-execption.filter';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginateResult } from 'mongoose';

@Controller()
@UseFilters(AllExceptionsFilter)
export class ShortLinkController {
  constructor(private readonly shortLinkService: ShortLinkService) {}

  @Get('shortlink')
  @UseGuards(JwtAuthGuard)
  GetAllByUser(@Request() req,@Query() query): Promise<PaginateResult<ShortLink>> {
    return this.shortLinkService.GetAllByUser(req.user._id, query.page);
  }

  @Post('shortlink')
  @UseGuards(JwtAuthGuard)
  async Create(@Request() req, @Body() data:ShortlinkDto) : Promise<ShortLink> {
    data.userId = req.user._id
    let result = await this.shortLinkService.Create(data);
    return result
  }

  @Put('shortlink')
  @UseGuards(JwtAuthGuard)
  async Update(@Request() req, @Body() data:ShortlinkDto) : Promise<ShortLink> {
    data.userId = req.user._id
    let result = await this.shortLinkService.Update(data);
    return result
  }

  @Post('shortlink/random')
  @UseGuards(JwtAuthGuard)
  async CreateRandom(@Request() req, @Body() data:CreateRandomShortlinkDto) : Promise<ShortLink>  {
    data.userId = req.user._id
    let result = await this.shortLinkService.CreateRandom(data);
    return result
  }

  @Get('shortlink/slug/:slug')
  @UseGuards(JwtAuthGuard)
  async Get(@Param('slug') slug:string) : Promise<any>  {
    return { IsExist : await this.shortLinkService.IsExist(slug) }
  }

  @Delete('shortlink/:id')
  @UseGuards(JwtAuthGuard)
  async Delete(@Request() req,@Param('id') id:string) : Promise<ShortLink>  {
    return await this.shortLinkService.Delete(id, req.user._id) 
  }

  @Redirect()
  @Get(':slug')
  async Redirect(@Param('slug') slug:string) {
    let shortLink = await this.shortLinkService.FindBySlug(slug)
    return { statusCode: HttpStatus.MOVED_PERMANENTLY, url: shortLink.redirectUrl}
  }
}
