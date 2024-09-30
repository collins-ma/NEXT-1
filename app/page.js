import TodosClient from './TodosClient'; // Client component



// This is a Server Component by default
export default async function HomePage() {
  // Fetch todos statically at build time and revalidate every 60 seconds (ISR)
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
    next: { revalidate: 60 }, // Revalidate the page every 60 seconds
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const todos = await res.json();

  return (
    <div>
      {/* Pass the statically generated todos to the client-side for CRUD operations */}
      <TodosClient initialTodos={todos} />
    </div>
  );
}
