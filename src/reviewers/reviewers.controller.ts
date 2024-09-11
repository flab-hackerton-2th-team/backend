import { Controller, Get } from '@nestjs/common';
import { ReviewersService } from './reviewers.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewerDTO } from './dto/reviwer.dto';

@ApiTags('reviewers')
@Controller('reviewers')
export class ReviewersController {
  constructor(private readonly reviwersService: ReviewersService) {}

  @ApiResponse({
    type: ReviewerDTO,
    isArray: true,
  })
  @Get()
  getAll() {
    return this.reviwersService.getAll();
  }
}
