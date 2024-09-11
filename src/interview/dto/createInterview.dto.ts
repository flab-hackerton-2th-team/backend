import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Exclude()
export class CreateInterviewDTO {
  @ApiProperty()
  interviewerId: bigint;

  @ApiProperty()
  reviewerId: bigint;

  static from({
    interviewerId,
    reviewerId,
  }: {
    interviewerId: bigint;
    reviewerId: bigint;
  }) {
    const interviewDTO = new CreateInterviewDTO();

    interviewDTO.interviewerId = interviewerId;
    interviewDTO.reviewerId = reviewerId;

    return interviewDTO;
  }
}
