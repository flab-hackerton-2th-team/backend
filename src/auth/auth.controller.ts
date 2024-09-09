import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateInterviewerDTO } from './dto/createInterviewer.dto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  createInterviewer(@Body() dto: CreateInterviewerDTO) {
    return this.authService.createInterviewer(dto);
  }
}
