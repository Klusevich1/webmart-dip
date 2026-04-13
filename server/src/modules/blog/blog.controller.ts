import { Controller, Get, Param } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getAll() {
    return this.blogService.findAll();
  }

  @Get('latest')
  async getLatest() {
    return this.blogService.getLatest(3);
  }

  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }
}
