import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateInterviewerDTO } from './dto/createInterviewer.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { InterviewerDTO } from './dto/Interviewer.dto';

@ApiTags('auth')
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    type: InterviewerDTO,
  })
  @Post()
  createInterviewer(@Body() dto: CreateInterviewerDTO) {
    return this.authService.createInterviewer(dto);
  }
}
