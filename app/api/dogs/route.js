import { v4 as uuidv4 } from 'uuid';

export async function GET(request) {
  const id = uuidv4(); // Generate a unique ID
  return new Response(`Generated ID: ${id}`, {
    status: 200,
  });
}

