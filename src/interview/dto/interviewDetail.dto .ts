import { Interview } from '../../entities/interview';
import { InterviewContentDTO } from './interviewContent.dto';

export class InterviewDetailDTO {
  id: bigint;
  title: string;
  status: string;
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
