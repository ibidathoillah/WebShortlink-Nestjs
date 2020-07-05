import { Injectable } from '@nestjs/common';
import { UserDto } from './users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { cryptPassword } from 'src/common/utils';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({email: email}).exec();
  }

  async Create(data: UserDto): Promise<User> {
    return new Promise((resolve)=>{
      const model = new this.userModel(data)
      cryptPassword(model.password,(err, hash) => {
        if(err) throw err;
        model.password = hash
        resolve(model.save())
      })
    })
  }

}