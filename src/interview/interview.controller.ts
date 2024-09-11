import { Body, Controller, Get, Post } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { CreateInterviewDTO } from './dto/createInterview.dto';
import { CreateInterviewContentDTO } from './dto/createInterviewContent.dto';

@Controller('interview')
export class InterviewController {
  createContent(id: bigint, arg1: CreateInterviewContentDTO) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly interviewService: InterviewService) {}

  @Post()
  create(@Body() createDTO: CreateInterviewDTO) {
    return this.interviewService.create(createDTO);
  }

  @Get()
  findAll() {
    return this.interviewService.findAll();
  }

  findContents(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
