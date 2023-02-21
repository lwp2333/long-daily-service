import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ResType } from '../typings/response.type';

@Injectable()
export class TranformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<ResType>) {
    return next.handle().pipe(
      map(res => {
        return {
          statusCode: res.statusCode ?? 200,
          data:
            res.data || [0, '', false].includes(res.data) ? res.data : res || [0, '', false].includes(res) ? res : null,
          message: res.message || 'ok',
          error: res.error || false,
        };
      })
    );
  }
}
