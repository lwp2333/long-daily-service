import { PrismaService } from '@/services/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
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
    private readonly config: ConfigService
  ) {}

  private appid = this.config.get('WX_appid');
  private secret = this.config.get('WX_secret');
  private grant_type = 'authorization_code';

  async loginByCode(code: string) {
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
        await this.createDeafultData(openid);
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
        nickName: '刺客排名10086',
        avatar: 'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/default_avatar.png',
        bindUser: '',
        birthday: new Date(),
        signature: '这个人很懒啥也没留下...',
        bannerList: [],
      },
    });
  }

  async createDeafultData(userOpenid: string) {
    try {
      // 插入默认相册
      await this.prisma.album.create({
        data: {
          id: -1,
          userOpenid,
          name: '默认相册',
          desc: '注册系统时默认建立的首个相册',
          coverUrl: 'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/default_album_cover.jpg',
        },
      });
      // 插入存储录音的相册
      await this.prisma.album.create({
        data: {
          id: -2,
          userOpenid,
          name: '默认相册',
          desc: '注册系统时默认建立的首个相册',
          coverUrl: 'https://cdn200.oss-cn-hangzhou.aliyuncs.com/long-daily/default_album_cover.jpg',
        },
      });
    } catch (error) {
      console.log('error', error);
    }
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
        birthday: data.birthday ? new Date(data.birthday) : undefined,
      },
    });
  }
}
