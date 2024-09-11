import { Exclude, Expose } from 'class-transformer';
import { Interviewer } from 'src/entities/interviewer';

@Exclude()
export class InterviewerDTO {
  @Expose()
  name: string;

  static fromEntity(entity: Interviewer): InterviewerDTO {
    const interviewerDTO = new InterviewerDTO();
    interviewerDTO.name = entity.name;

    return interviewerDTO;
  }
}
