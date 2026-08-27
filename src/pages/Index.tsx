import { Navigation } from '@/components/Navigation'
import { GrainOverlay } from '@/components/GrainOverlay'
import { ImageProtection } from '@/components/ImageProtection'
import { Hero } from '@/components/Hero'
import { BirthdayCounter } from '@/components/BirthdayCounter'
import { Biography } from '@/components/Biography'
import { Journey } from '@/components/Journey'
import { Education } from '@/components/Education'
import { Challenges } from '@/components/Challenges'
import { Faith } from '@/components/Faith'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'
import { Achievements } from '@/components/Achievements'
import { Timeline } from '@/components/Timeline'
import { Vision } from '@/components/Vision'
import { Friendship } from '@/components/Friendship'
import { Gallery } from '@/components/Gallery'
import { Contact } from '@/components/Contact'

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <GrainOverlay />
      <ImageProtection />
      <Navigation />
      <main>
        <Hero />
        <BirthdayCounter />
        <Biography />
        <Journey />
        <Education />
        <Challenges />
        <Faith />
        <Projects />
        <Skills />
        <Achievements />
        <Timeline />
        <Vision />
        <Friendship />
        <Gallery />
        <Contact />
      </main>
    </div>
  )
}
