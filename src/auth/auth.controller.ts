import { Controller, Request, Post, UseGuards, Body, Param, UseFilters, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/users.dto';
import { AllExceptionsFilter } from 'src/common/all-execption.filter';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly userService: UsersService, private authService: AuthService) {
 
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  @UseFilters(AllExceptionsFilter)
  async register(@Body() data:UserDto) {
    return this.userService.Create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}