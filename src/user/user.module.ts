import { PrismaService } from '@/services/prisma.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
@Module({
  imports: [
    JwtModule.register({
      secret: 'lwp2333', // 密钥
      signOptions: { expiresIn: '12h' }, // 过期时间
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
