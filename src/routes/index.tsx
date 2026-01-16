import { createFileRoute } from '@tanstack/react-router';

import { BookOpening } from '../components/BookOpening';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return <BookOpening />;
}
