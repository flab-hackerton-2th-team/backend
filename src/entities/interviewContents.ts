import { Entity, Property, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { Interview } from './interview';

@Entity()
export class InterviewContents {
  @PrimaryKey()
  id: bigint;

  @Property({ type: 'text' })
  content: string;

  @Property({ length: 20 })
  speaker: string;

  @ManyToOne({ entity: () => Interview })
  interview: Interview;
}
