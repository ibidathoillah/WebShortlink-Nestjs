import { Injectable } from '@nestjs/common';
import { ShortLink } from './shortlink.schema';
import { ShortlinkDto } from './shortlink.dto';
import { Model, PaginateModel, PaginateResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GenerateSlug } from 'src/common/utils';

@Injectable()
export class ShortLinkService {
  constructor(@InjectModel(ShortLink.name) private shortLinkModel: PaginateModel<ShortLink>) {}

  async Create(data:ShortlinkDto): Promise<ShortLink> {
    const model = new this.shortLinkModel(data)
    if(!model.title) model.title = `Custom ${await this.shortLinkModel.countDocuments({userId: data.userId})}`;
    return model.save();
  }

  async Update(data:ShortlinkDto): Promise<ShortLink> {
    return await this.shortLinkModel.findOneAndUpdate({_id:data._id, userId:data.userId}, data, {upsert: true}, (err, doc) =>{
        if (err) return err;
        return doc
    });
  }

  async GetAllByUser(userId:string, page: number = 1, limit: number = 10): Promise<PaginateResult<ShortLink>> {
    const options = {
        populate: [
            // Your foreign key fields to populate
        ],
        page: Number(page),
        limit: Number(limit),
        sort: { createdAt : -1 }
    };
    
    return await this.shortLinkModel.paginate({userId: userId}, options)
  }

  async CreateRandom(data:ShortlinkDto): Promise<ShortLink> {
    const model = new this.shortLinkModel(data)
    model.title = `Random ${await this.shortLinkModel.countDocuments({userId: data.userId})}`
    
    do {
        model.slug = GenerateSlug(1,10)
    } while(await this.IsExist(model.slug))

    return model.save();
  }

  async Delete(id:string, userId:string): Promise<ShortLink> {
    return this.shortLinkModel.findOneAndRemove({_id:id, userId:userId})
  }

  async FindBySlug(slug:string): Promise<ShortLink> {
    return await this.shortLinkModel.findOne({slug: slug}).exec()
  }
  
  async IsExist(slug:string): Promise<boolean> {
    return await this.FindBySlug(slug) != null
  }
}
