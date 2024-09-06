import { Entity, Property, ManyToOne, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Reviewer {
  @PrimaryKey()
  id: bigint;

  @Property({ type: 'jsonb' })
  presona: any;
}
