import { Exclude, Expose } from 'class-transformer';
import { Interview } from '../../entities/interview';
import { InterviewContentDTO } from './interviewContent.dto';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class InterviewDetailDTO {
  @Expose()
  @ApiProperty()
  id: bigint;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  status: string;

  @Expose()
  @ApiProperty()
  contents: InterviewContentDTO[];

  static fromEntity(entity: Interview) {
    const interviewDetailDTO = new InterviewDetailDTO();
    interviewDetailDTO.id = entity.id;
    interviewDetailDTO.title = entity.title;
    interviewDetailDTO.status = entity.status;
    interviewDetailDTO.contents = entity.contents.map(
      InterviewContentDTO.fromEntity,
    );

    return interviewDetailDTO;
  }
}
