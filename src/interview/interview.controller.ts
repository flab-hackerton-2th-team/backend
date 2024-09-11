import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { CreateInterviewDTO } from './dto/createInterview.dto';
import { CreateInterviewContentDTO } from './dto/createInterviewContent.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { InterviewDTO } from './dto/interview.dto';
import { InterviewContentDTO } from './dto/interviewContent.dto';

@ApiTags('interview')
@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @ApiResponse({
    type: InterviewDTO,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.interviewService.findAll();
  }

  @ApiResponse({
    type: InterviewDTO,
  })
  @Post()
  create(@Body() createDTO: CreateInterviewDTO) {
    return this.interviewService.create(createDTO);
  }

  @Get('/:id/contents')
  findContents(@Param('id') interviewId: bigint) {
    return this.interviewService.findContents(interviewId);
  }

  @ApiResponse({
    type: InterviewContentDTO,
    description: `
    응답은 ai에 질의한 결과가 옵니다.
    `,
  })
  @Post('/:id/contents')
  createContent(
    @Param('id') interviewId: bigint,
    @Body() dto: CreateInterviewContentDTO,
  ) {
    return this.interviewService.createContents(interviewId, dto);
  }
}
