import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nota } from './entities/nota.entity';
import { NotaController } from './nota.controlller';
import { NotaService } from './services/nota.service';
import { DataInitService } from './services/data-init.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [Nota],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Nota]),
  ],
  controllers: [NotaController],
  providers: [NotaService, DataInitService],
})
export class AppModule {}
