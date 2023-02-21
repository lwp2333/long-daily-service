import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwt: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log('#----进入auth中间件----#');
    console.log('Request...', req.headers['token']);
    try {
      const token = req.headers['token'] as string;
      this.jwt.verify(token);
    } catch (error) {
      throw new HttpException('用户登录信息过期', HttpStatus.FORBIDDEN);
    }
    next();
    console.log('#----退出auth中间件----#');
  }
}
