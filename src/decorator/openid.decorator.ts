import { createParamDecorator, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const Openid = createParamDecorator((data: string, req): string => {
  try {
    // const token = req.headers['token'] as string;
    // const jwt = new JwtService({
    //   secret: 'lwp2333', // 密钥
    //   signOptions: { expiresIn: '8h' }, // 过期时间
    // });
    // return jwt.decode(token) as string;
    const openid = 'oqy5602kT2ptTR4NmbbbM-xkP3ZA';
    console.log('openid:', openid);
    return openid;
  } catch (error) {
    console.log(error);
    throw new HttpException('未能解码用户openid', HttpStatus.UNAUTHORIZED);
  }
});
