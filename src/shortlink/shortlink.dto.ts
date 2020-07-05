import { Types } from "mongoose";
import { IsUrl, IsNotEmpty, Matches, Validate } from "class-validator";
import { ExcludeHostValidator } from "src/common/exclude-host-link.validator";

// add this to exclude the url from redirect
const excludeURL = ["localhost:8000"]

export class ShortlinkDto {
  _id: Types.ObjectId
  userId: Types.ObjectId
  title: string

  @Matches(new RegExp(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/),{
    message: "Wrong Slug Format"
  })
  slug: string
  
  @IsUrl({},{
    message : "Wrong URL Format"
  })
  @IsNotEmpty({
    message: "Please input your target URL"
  })
  @Validate(ExcludeHostValidator, excludeURL)
  redirectUrl: string
}

export class CreateRandomShortlinkDto {
  _id: Types.ObjectId
  userId: Types.ObjectId
  title: string
  slug: string
  
  @IsUrl({},{
    message : "Wrong URL Format"
  })
  @IsNotEmpty({
    message: "Please input your target URL"
  })
  @Validate(ExcludeHostValidator, excludeURL)
  redirectUrl: string
}