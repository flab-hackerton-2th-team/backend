import { Exclude, Expose } from 'class-transformer';
import { InterviewContents } from '../../entities/interviewContents';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class InterviewContentDTO {
  @Expose()
  @ApiProperty()
  id: bigint;

  @Expose()
  @ApiProperty()
  speaker: string;

  @Expose()
  @ApiProperty()
  content: string;

  static fromEntity(entity: InterviewContents) {
    const interviewContentDTO = new InterviewContentDTO();
    interviewContentDTO.id = entity.id;
    interviewContentDTO.speaker = entity.speaker;
    interviewContentDTO.content = entity.content;

    return interviewContentDTO;
  }
}
