import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Interviewer {
  @PrimaryKey()
  id: bigint;

  @Property({ length: 20 })
  name: string;
}
