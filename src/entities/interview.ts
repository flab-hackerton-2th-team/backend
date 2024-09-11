import {
  Entity,
  Property,
  ManyToOne,
  PrimaryKey,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { Reviewer } from './reviewer';
import { Interviewer } from './interviewer';
import { InterviewContents } from './interviewContents';

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

  @OneToMany({
    entity: () => InterviewContents,
    mappedBy: 'interview',
    orphanRemoval: true,
  })
  contents = new Collection<InterviewContents>(this);
}
