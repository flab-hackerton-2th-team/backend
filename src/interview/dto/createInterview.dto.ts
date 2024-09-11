import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateInterviewDTO {
  @Expose()
  @ApiProperty()
  interviewerId: bigint;

  @Expose()
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
