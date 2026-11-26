import { getEntry, render } from 'astro:content';

export async function getHomeEntry(id: string) {
  const entry = await getEntry('home', id);
  if (!entry) throw new Error(`home entry "${id}" not found`);
  const { Content } = await render(entry);
  return { entry, Content };
}
