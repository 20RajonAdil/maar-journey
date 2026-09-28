/**
 * Keyword cues for "MAAR Journey". When the song reaches `keyword`, the page
 * scrolls to the section with id `id`. Times (`t`, seconds) were detected
 * automatically by aligning the lyrics to the audio.
 */
export interface SongCue {
  t: number
  keyword: string
  id: string
  label: string
}

export const SONG_CUES: SongCue[] = [
  { t: 0, keyword: '', id: 'music', label: 'Intro — from Sylhet to Birmingham' },
  { t: 17.4, keyword: "MAAR", id: 'home', label: "\"MAAR Journey\" \u2014 back to the top" },
  { t: 24, keyword: "Sylhet", id: 'biography', label: "\"Sylhet\" \u2014 where it began" },
  { t: 37.8, keyword: "Golden", id: 'education', label: "\"Golden pages\" \u2014 school & lessons" },
  { t: 47.7, keyword: "broken", id: 'challenges', label: "\"Broken arm\" \u2014 the fracture" },
  { t: 63.0, keyword: "London", id: 'journey', label: "\"London\" \u2014 the journey to the UK" },
  { t: 69.5, keyword: "Chapter", id: 'timeline', label: "\"Chapter by chapter\" \u2014 the timeline" },
  { t: 105.6, keyword: "Heathrow", id: 'journey', label: "\"Heathrow\" \u2014 first flight" },
  { t: 112.2, keyword: "Handsworth", id: 'timeline', label: "\"Handsworth\" \u2014 the first home" },
  { t: 119.4, keyword: "Aston", id: 'timeline', label: "\"Aston\" \u2014 another home" },
  { t: 124.2, keyword: "School", id: 'education', label: "\"School days\" \u2014 lessons beyond books" },
  { t: 126.8, keyword: "people", id: 'challenges', label: "\"People judge you\" \u2014 hard days" },
  { t: 145.4, keyword: "Chapter", id: 'timeline', label: "\"Chapter by chapter\" — the timeline" },
  { t: 183.7, keyword: "years", id: 'faith', label: "\"Finding me\" \u2014 faith" },
  { t: 192.7, keyword: "Prayer", id: 'faith', label: "\"Prayer\" \u2014 a quiet place" },
  { t: 212.6, keyword: "building", id: 'skills', label: "\"Building\" \u2014 code & skills" },
  { t: 221.5, keyword: "Quran", id: 'projects', label: "\"MAAR Quran, MAAR LIFE, MAAR QR\" \u2014 projects" },
  { t: 245.8, keyword: "Ifnan", id: 'friendship', label: "\"Ifnan, Talha, Mohaiz, Adil Hassan\" \u2014 friends" },
  { t: 269.3, keyword: "Maybe", id: 'gallery', label: "\"Look behind\" \u2014 the gallery" },
  { t: 309, keyword: "perfect", id: 'vision', label: "\"Still becoming\" \u2014 values & vision" },
  { t: 361.5, keyword: "chapter", id: 'contact', label: "\"Just another chapter\" \u2014 the next one" },
]
