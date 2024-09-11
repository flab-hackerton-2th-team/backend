import { Controller } from '@nestjs/common';
import { ReviewersService } from './reviewers.service';

@Controller('reviewers')
export class ReviewersController {
  constructor(private readonly reviwersService: ReviewersService) {}

  getAll() {
    return this.reviwersService.getAll();
  }
}
