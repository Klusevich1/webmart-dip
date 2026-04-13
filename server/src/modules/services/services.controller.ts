import { Controller, Get, Param } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('categories')
  async getCategories() {
    return this.servicesService.getCategories();
  }

  @Get('categories/:slug')
  async getCategory(@Param('slug') slug: string) {
    return this.servicesService.getCategory(slug);
  }

  @Get('categories/:slug/services')
  async getServicesByCategory(@Param('slug') slug: string) {
    return this.servicesService.getServicesByCategory(slug);
  }

  @Get(':slug')
  async getService(@Param('slug') slug: string) {
    return this.servicesService.getService(slug);
  }
}


