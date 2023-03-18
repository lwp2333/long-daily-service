import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const Openid = createParamDecorator((data: unknown, ctx: ExecutionContext): string => {
  try {
    const req = ctx.switchToHttp().getRequest<Request>();
    const token = req.headers['token'] as string;
    const jwt = new JwtService({
      secret: 'lwp2333', // 密钥
      signOptions: { expiresIn: '12h' }, // 过期时间
    });
    const data = jwt.decode(token) as { openid: string };
    return data.openid;
  } catch (error) {
    console.log(error);
    throw new HttpException('未能解码用户openid', HttpStatus.UNAUTHORIZED);
  }
});
