/**
 * Keyword cues for "MAAR Journey". When the song reaches `keyword`, the page
 * scrolls to the section with id `id` — and, if `find` is set, to the exact
 * heading inside that section whose text contains `find`.
 * Times (`t`, seconds) were detected automatically by aligning the lyrics to the audio.
 */
export interface SongCue {
  t: number
  keyword: string
  id: string
  label: string
  find?: string
}

export const SONG_CUES: SongCue[] = [
  { t: 0, keyword: '', id: 'music', label: 'Intro' },
  { t: 17.4, keyword: 'MAAR', id: 'home', label: '"MAAR Journey" — back to the top' },
  { t: 24, keyword: 'Sylhet', id: 'biography', label: '"Sylhet" — where it began' },
  { t: 37.8, keyword: 'Golden', id: 'education', find: 'Iqra Bangladesh School', label: '"Golden pages" — school in Sylhet' },
  { t: 47.7, keyword: 'broken', id: 'challenges', find: 'The Fracture', label: '"Broken arm" — the fracture' },
  { t: 63, keyword: 'London', id: 'timeline', find: 'Sylhet → London', label: '"London" — Sylhet to London' },
  { t: 69.5, keyword: 'Chapter', id: 'timeline', label: '"Chapter by chapter" — the timeline' },
  { t: 105.6, keyword: 'Heathrow', id: 'challenges', find: 'A New Country', label: '"Heathrow" — a new country' },
  { t: 112.2, keyword: 'Handsworth', id: 'timeline', find: 'Moved to Birmingham', label: '"Handsworth" — Birmingham' },
  { t: 119.4, keyword: 'Aston', id: 'timeline', find: 'Family Relocated to Aston', label: '"Aston" — another home' },
  { t: 124.2, keyword: 'School', id: 'education', find: 'Fortis Academy', label: '"School days" — Fortis Academy' },
  { t: 126.8, keyword: 'people', id: 'challenges', find: 'Finding His Footing', label: '"People judge you" — finding his footing' },
  { t: 145.4, keyword: 'Chapter', id: 'timeline', label: '"Chapter by chapter" — the timeline' },
  { t: 183.7, keyword: 'years', id: 'faith', label: '"Finding me" — faith' },
  { t: 212.6, keyword: 'building', id: 'skills', label: '"Building" — code & skills' },
  { t: 221.5, keyword: 'Quran', id: 'projects', find: 'MAAR Quran', label: '"MAAR Quran, MAAR LIFE, MAAR QR" — projects' },
  { t: 245.8, keyword: 'Ifnan', id: 'friendship', find: 'Ifnan —', label: '"Ifnan" — a friendship that found its way back' },
  { t: 248.3, keyword: 'Talha', id: 'friendship', find: 'Talha —', label: '"Talha" — loyalty' },
  { t: 250.7, keyword: 'Mohaiz', id: 'friendship', find: 'Mohaiz —', label: '"Mohaiz" — understanding' },
  { t: 253.2, keyword: 'Adil', id: 'friendship', find: 'Adil Hassan —', label: '"Adil Hassan" — a bond like brothers' },
  { t: 269.3, keyword: 'Maybe', id: 'gallery', label: '"Look behind" — the gallery' },
  { t: 309, keyword: 'perfect', id: 'vision', label: '"Still becoming" — values & vision' },
  { t: 361.5, keyword: 'chapter', id: 'contact', label: '"Just another chapter" — the next one' },
]
