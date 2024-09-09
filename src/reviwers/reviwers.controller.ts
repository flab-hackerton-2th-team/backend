import { Controller } from '@nestjs/common';
import { ReviwersService } from './reviwers.service';

@Controller('reviwers')
export class ReviwersController {
  constructor(private readonly reviwersService: ReviwersService) {}
}
