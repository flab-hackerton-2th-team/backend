import { Injectable } from '@nestjs/common';
import { CreateInterviewDTO } from './dto/createInterview.dto';

@Injectable()
export class InterviewService {
  create(createDTO: CreateInterviewDTO) {
    throw new Error('Method not implemented.');
  }
}
