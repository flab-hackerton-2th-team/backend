export class CreateInterviewDTO {
  interviewerId: bigint;
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
