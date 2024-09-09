import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateInterviewerDTO } from './dto/createInterviewer.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  createInterviewer(dto: CreateInterviewerDTO) {
    return this.authService.createInterviewer(dto);
  }
}
