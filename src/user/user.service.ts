import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/services/prisma.service';
import { LoginEntity } from './entities/user.entity';
import axios from 'axios';
import { UpdateUserDto } from './dto/user.dto';

interface WxLoginRes {
  openid: string;
  session_key: string;
}

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private config: ConfigService
  ) {}

  private appid = this.config.get('WX_appid');
  private secret = this.config.get('WX_secret');
  private grant_type = 'authorization_code';

  async loginByCode(code: string): Promise<LoginEntity> {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${this.appid}&secret=${this.secret}&js_code=${code}&grant_type=${this.grant_type}`;

    const { openid } = await axios.get<WxLoginRes>(url).then(res => res.data);
    if (!openid) {
      throw new HttpException('code 失效', HttpStatus.FAILED_DEPENDENCY);
    }

    try {
      const token = this.jwt.sign({ openid });
      const oldUser = await this.prisma.user.findUnique({
        where: {
          openid,
        },
      });
      if (!oldUser) {
        const newUser = await this.createNewUser(openid);
        return {
          token,
          ...newUser,
        };
      }
      return {
        token,
        ...oldUser,
      };
    } catch (error) {
      console.log('error', error);
      throw new HttpException('用户登录失败', HttpStatus.UNAUTHORIZED);
    }
  }

  async createNewUser(openid: string) {
    return await this.prisma.user.create({
      data: {
        openid,
        nickName: '新用户',
        avatar: '',
        bindUser: '',
        birthday: new Date(),
        signature: '',
      },
    });
  }

  async getUserInfo(openid: string) {
    return await this.prisma.user.findUnique({
      where: {
        openid,
      },
    });
  }

  async updateUserInfo(openid: string, data: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        openid,
      },
      data: {
        ...data,
        birthday: new Date(data.birthday),
      },
    });
  }
}
