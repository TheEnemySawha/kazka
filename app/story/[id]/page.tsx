import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function StoryPage({ params }: { params: { id: string } }) {
  const { data: story } = await supabase
    .from('stories')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!story) notFound()

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}>
      <Link href="/" style={{ color: '#888', fontSize: 14 }}>← Назад</Link>
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <div style={{ fontSize: '5rem' }}>{story.cover_emoji}</div>
        <h1 style={{ fontFamily: 'serif', fontSize: '2rem', margin: '20px 0' }}>{story.title}</h1>
        <p style={{ color: '#888', fontStyle: 'italic' }}>💡 {story.moral}</p>
      </div>
      {story.content.split('\n').filter(Boolean).map((p: string, i: number) => (
        <p key={i} style={{ fontSize: '1.1rem', lineHeight: 1.9, marginBottom: 20 }}>{p}</p>
      ))}
    </div>
  )
}
