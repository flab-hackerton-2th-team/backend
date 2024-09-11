import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Interviewer } from 'src/entities/interviewer';

@Exclude()
export class InterviewerDTO {
  @Expose()
  @ApiProperty()
  name: string;

  static fromEntity(entity: Interviewer): InterviewerDTO {
    const interviewerDTO = new InterviewerDTO();
    interviewerDTO.name = entity.name;

    return interviewerDTO;
  }
}
