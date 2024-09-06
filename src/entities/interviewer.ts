import { Entity, Property, ManyToOne, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Interviewer {
  @PrimaryKey()
  id: bigint;

  @Property()
  name: string;
}
