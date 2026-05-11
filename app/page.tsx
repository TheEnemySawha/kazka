// app/page.tsx
import { supabase } from '../lib/supabase';

async function getTodayStory() {
  // toISOString returns e.g. '2026-05-11T12:34:56.789Z' — split at 'T' to get YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0]; // Формат YYYY-MM-DD
  
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('publish_date', today)
    .eq('is_published', true)
    .single();

  return data;
}

export default async function Home() {
  const story = await getTodayStory();

  if (!story) {
    return <div className="p-10 text-center">Сьогоднішня казка ще готується... ✨</div>;
  }

  return (
    <main className="max-w-2xl mx-auto p-6 font-serif">
      <h1 className="text-4xl font-bold text-indigo-900 mb-4">{story.title}</h1>
      {story.image_url && (
        <img src={story.image_url} alt={story.title} className="rounded-xl mb-6 shadow-lg" />
      )}
      <div className="prose prose-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
        {story.content}
      </div>
    </main>
  );
}