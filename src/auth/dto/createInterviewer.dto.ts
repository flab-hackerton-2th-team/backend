import { Exclude, Expose } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

@Exclude()
export class CreateInterviewerDTO {
  @Expose()
  @MaxLength(20)
  @MinLength(1)
  @IsString()
  name: string;
}
