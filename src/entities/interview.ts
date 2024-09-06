import { Entity, Property, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { Reviewer } from './reviewer';
import { Interviewer } from './interviewer';

@Entity()
export class Interview {
  @PrimaryKey()
  id: bigint;

  @Property({ length: 20 })
  title: string;

  @ManyToOne()
  reviewer: Reviewer;

  @ManyToOne()
  interviewer: Interviewer;

  @Property({ length: 10 })
  status: string;
}
