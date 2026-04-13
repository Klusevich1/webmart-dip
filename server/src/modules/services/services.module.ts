import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { ServiceCategory } from '../../entities/service-category.entity';
import { Service } from '../../entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceCategory, Service])],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}



