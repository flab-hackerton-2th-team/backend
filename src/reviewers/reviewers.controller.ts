import { Controller, Get } from '@nestjs/common';
import { ReviewersService } from './reviewers.service';

@Controller('reviewers')
export class ReviewersController {
  constructor(private readonly reviwersService: ReviewersService) {}

  @Get()
  getAll() {
    return this.reviwersService.getAll();
  }
}
