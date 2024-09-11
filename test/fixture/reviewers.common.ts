import { Reviewer } from 'src/entities/reviewer';

export const REVIEWER_LIST: Partial<Reviewer>[] = [
  {
    persona: {
      name: 'John Doe',
      image:
        'https://images.freeimages.com/images/large-previews/83f/paris-1213603.jpg?fmt=webp&w=500',
      description: 'hello world',
      prompt: 'hello Missing',
    },
  },
  {
    persona: {
      name: 'James Doe',
      image:
        'https://images.freeimages.com/images/large-previews/03e/oxford-architecture-1233371.jpg?fmt=webp&w=500',
      description: 'hello world2',
      prompt: 'hello Missing2',
    },
  },
];
