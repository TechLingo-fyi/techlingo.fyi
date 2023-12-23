export interface Definition {
  language: string;
  definition: string;
  term_usage_example: string;
  expanded?: string;
}

export interface Lingo {
  slug: string;
  term: string;
  definitions: Definition[];
}
