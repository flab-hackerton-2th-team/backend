import { Body, Controller, Get, Post } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { CreateInterviewDTO } from './dto/createInterview.dto';
import { CreateInterviewContentDTO } from './dto/createInterviewContent.dto';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Post()
  create(@Body() createDTO: CreateInterviewDTO) {
    return this.interviewService.create(createDTO);
  }

  createContent(interviewId: bigint, dto: CreateInterviewContentDTO) {
    return this.interviewService.createContents(interviewId, dto);
  }

  @Get()
  findAll() {
    return this.interviewService.findAll();
  }

  findContents(interviewId: bigint) {
    return this.interviewService.findContents(interviewId);
  }
}
