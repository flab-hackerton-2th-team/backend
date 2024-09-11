import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString, Length } from 'class-validator';

@Exclude()
export class CreateInterviewContentDTO {
  @Expose()
  @ApiProperty()
  @IsString()
  @Length(1, 200)
  content: string;
}
