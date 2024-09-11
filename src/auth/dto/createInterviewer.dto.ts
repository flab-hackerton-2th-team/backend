import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Length, IsString } from 'class-validator';

@Exclude()
export class CreateInterviewerDTO {
  @Expose()
  @ApiProperty()
  @IsString()
  @Length(1, 20)
  name: string;
}
