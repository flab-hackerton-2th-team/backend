import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PersonaDTO } from './persona.dto';
import { Reviewer } from '../../entities/reviewer';

@Exclude()
export class ReviewerDTO {
  @Expose()
  @ApiProperty()
  id: bigint;

  @Expose()
  @ApiProperty()
  @ValidateNested()
  persona: PersonaDTO;

  static fromEntity(entity: Reviewer): ReviewerDTO {
    const reviewerDTO = new ReviewerDTO();
    reviewerDTO.id = entity.id;
    reviewerDTO.persona = PersonaDTO.fromEntity(entity.persona);

    return reviewerDTO;
  }
}
