/**
 * Maps moments in "MAAR Journey" to sections of the site.
 * `t` = seconds into the song, `id` = the section id to scroll to,
 * `label` = what the song is talking about at that moment.
 * Fine-tune the times by opening the site with ?sync=1 and using the sync panel.
 */
export interface SongCue {
  t: number
  id: string
  label: string
}

export const SONG_CUES: SongCue[] = [
  { t: 0, id: 'music', label: 'Intro — from Sylhet to Birmingham' },
  { t: 18, id: 'biography', label: 'Where it began — born beneath the Sylhet sky' },
  { t: 50, id: 'challenges', label: 'A broken arm, a sudden pause' },
  { t: 66, id: 'journey', label: 'Leaving Sylhet for London' },
  { t: 84, id: 'timeline', label: 'Chorus — chapter by chapter, step by step' },
  { t: 116, id: 'challenges', label: 'A new beginning — Handsworth & Aston' },
  { t: 138, id: 'education', label: 'School days, lessons beyond books' },
  { t: 160, id: 'timeline', label: 'Chorus — keep moving on' },
  { t: 200, id: 'faith', label: 'Finding my way — faith & prayer' },
  { t: 232, id: 'projects', label: 'Building MAAR — Quran, LIFE, QR' },
  { t: 250, id: 'friendship', label: 'Friends — Ifnan, Talha, Mohaiz, Adil Hassan' },
  { t: 264, id: 'gallery', label: 'Looking back at every place' },
  { t: 271, id: 'vision', label: 'Final chorus — still becoming' },
  { t: 337, id: 'contact', label: 'Just another chapter' },
]
