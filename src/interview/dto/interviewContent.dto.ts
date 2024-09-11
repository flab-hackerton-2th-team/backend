import { InterviewContents } from '../../entities/interviewContents';

export class InterviewContentDTO {
  id: bigint;
  speaker: string;
  content: string;

  static fromEntity(entity: InterviewContents) {
    const interviewContentDTO = new InterviewContentDTO();
    interviewContentDTO.id = entity.id;
    interviewContentDTO.speaker = entity.speaker;
    interviewContentDTO.content = entity.content;

    return interviewContentDTO;
  }
}
