
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/users.dto';
import { User } from 'src/users/users.schema';
import { comparePassword } from 'src/common/utils';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,  private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    return new Promise((resolve)=>{
      comparePassword(pass,user.password,(err, isMatch)=>{
        if(err) throw err;
        if (user && isMatch) {
          resolve({ _id: user._id, email: user.email, password: undefined })
        }
      })
    });
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}