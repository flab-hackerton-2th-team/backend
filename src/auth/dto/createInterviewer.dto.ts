import { Exclude, Expose } from 'class-transformer';
import { Length, IsString } from 'class-validator';

@Exclude()
export class CreateInterviewerDTO {
  @Expose()
  @IsString()
  @Length(1, 20)
  name: string;
}
