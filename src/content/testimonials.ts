/**
 * No fabricated customer quotes or stock headshots — same stance as /community.
 * Every entry here is an honest "pending" placeholder until a real customer
 * shares a story and gives permission to publish it. Swap these out one at a
 * time as real testimonials come in; nothing here claims to be a real person.
 */
export type Testimonial = {
  id: number;
  quote: string;
  by: string;
  initials: string;
};

export const testimonials: readonly Testimonial[] = [
  {
    id: 0,
    quote: "A real story from a Triphala customer will appear here once shared with us.",
    by: "Awaiting a customer story",
    initials: "BA",
  },
  {
    id: 1,
    quote: "A real story from an Ashwagandha customer will appear here once shared with us.",
    by: "Awaiting a customer story",
    initials: "BA",
  },
  {
    id: 2,
    quote: "A real story from a Shuddha Shilajit customer will appear here once shared with us.",
    by: "Awaiting a customer story",
    initials: "BA",
  },
  {
    id: 3,
    quote: "A real story from a Gut Health Ritual Kit customer will appear here once shared with us.",
    by: "Awaiting a customer story",
    initials: "BA",
  },
  {
    id: 4,
    quote: "A real story from a Brahmi Medhya customer will appear here once shared with us.",
    by: "Awaiting a customer story",
    initials: "BA",
  },
] as const;
