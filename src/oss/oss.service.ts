import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import crypto from 'crypto-js';

@Injectable()
export class OssService {
  constructor(private config: ConfigService) {}
  private accessKeyId = this.config.get<string>('OSS_accessKeyId');
  private accessKeySecret = this.config.getOrThrow<string>('OSS_accessKeySecret');
  private timeout = 1; // 限制参数的生效时间，单位为小时，默认值为1。
  private maxSize = 100; // 限制上传文件的大小，单位为MB，默认值为10。

  getPolicyBase64() {
    const date = new Date();
    // 设置policy过期时间。
    date.setHours(date.getHours() + this.timeout);
    const srcT = date.toISOString();
    const policyText = {
      expiration: srcT,
      conditions: [
        // 限制上传文件大小。
        ['content-length-range', 0, this.maxSize * 1024 * 1024],
      ],
    };
    const buffer = Buffer.from(JSON.stringify(policyText));
    return buffer.toString('base64');
  }

  signature(policy: string) {
    return crypto.enc.Base64.stringify(crypto.HmacSHA1(policy, this.accessKeySecret));
  }

  async getOssToken() {
    const policy = this.getPolicyBase64();
    const signature = this.signature(policy);
    return {
      accessKeyId: this.accessKeyId,
      signature,
      policy,
    };
  }
}
