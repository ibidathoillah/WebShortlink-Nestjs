import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    ValidationError,
    BadRequestException,
    UnauthorizedException,
  } from '@nestjs/common';

  import { MongoError } from 'mongodb';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      let status = HttpStatus.INTERNAL_SERVER_ERROR
      let message = HttpStatus.INTERNAL_SERVER_ERROR.toString()
    
      switch(exception.constructor.name){
        case 'HttpException' :
          status =  (<HttpException>exception).getStatus()
          message = (<HttpException>exception).message
          break
        case 'ValidationError':
          status =  HttpStatus.BAD_REQUEST
          message = (<ValidationError>exception).toString()
          break
        case 'MongoError':
          status =  HttpStatus.INTERNAL_SERVER_ERROR
          message = (<MongoError>exception).toString()
          switch((<MongoError>exception).code){
            case 11000:
              status =  HttpStatus.UNPROCESSABLE_ENTITY
          }
          break
        case 'BadRequestException':
          status =  HttpStatus.BAD_REQUEST
          message = (JSON.parse(JSON.stringify((<BadRequestException>exception).getResponse()))).message.join(", ")
          break
        case 'UnauthorizedException':
          status =  (<UnauthorizedException>exception).getStatus()
          message = (<UnauthorizedException>exception).message
          break
      }
      
      response.status(status).json({
        name: exception.constructor.name,
        statusCode: status,
        timestamp: new Date().toISOString(),
        message: message,
        path: request.url,
      });
    }
  }