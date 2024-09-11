import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PersonaDTO {
  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  image: string;

  @Expose()
  @ApiProperty()
  description: string;

  static fromEntity(entity: any): PersonaDTO {
    const personaDTO = new PersonaDTO();
    personaDTO.name = entity.name;
    personaDTO.image = entity.image;
    personaDTO.description = entity.description;

    return personaDTO;
  }
}
