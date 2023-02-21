import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('new Request>>>');
    console.log('method:', req.method);
    console.log('url:', req.url);
    console.log('query|body', req.query || req.body);
    next();
  }
}
