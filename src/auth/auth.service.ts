import { Injectable } from '@nestjs/common';
import { CreateInterviewerDTO } from './dto/createInterviewer.dto';

@Injectable()
export class AuthService {
  createInterviewer(createDTO: CreateInterviewerDTO) {
    throw new Error('Method not implemented.');
  }
}
