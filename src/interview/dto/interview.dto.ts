import { Exclude, Expose } from 'class-transformer';
import { InterviewerDTO } from '../../auth/dto/Interviewer.dto';
import { ReviewerDTO } from '../../reviewers/dto/reviwer.dto';
import { Interview } from '../../entities/interview';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class InterviewDTO {
  @Expose()
  @ApiProperty()
  id: bigint;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  reviewer: ReviewerDTO;

  @Expose()
  @ApiProperty()
  interviewer: InterviewerDTO;

  @Expose()
  @ApiProperty()
  status: string;

  static fromEntity(entity: Interview): InterviewDTO {
    const interviewDTO = new InterviewDTO();

    interviewDTO.id = entity.id;
    interviewDTO.title = entity.title;
    interviewDTO.reviewer = ReviewerDTO.fromEntity(entity.reviewer);
    interviewDTO.interviewer = InterviewerDTO.fromEntity(entity.interviewer);
    interviewDTO.status = entity.status;

    return interviewDTO;
  }
}
