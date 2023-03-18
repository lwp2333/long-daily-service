import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AlbumModule } from './album/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetModule } from './asset/asset.module';
import { LifeInventoryModule } from './life-inventory/life-inventory.module';
import { MemorialDayModule } from './memorial-day/memorial-day.module';
import { OssModule } from './oss/oss.module';
import { PlogModule } from './plog/plog.module';
import { PrismaService } from './services/prisma.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    UserModule,
    AlbumModule,
    AssetModule,
    OssModule,
    PlogModule,
    LifeInventoryModule,
    MemorialDayModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, PrismaService, JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(AuthMiddleware)
    //   .exclude({
    //     path: '/user/loginByCode',
    //     method: RequestMethod.GET,
    //   })
    //   .forRoutes('*');
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
