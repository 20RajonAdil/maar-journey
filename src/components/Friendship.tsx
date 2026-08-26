import { motion } from 'framer-motion'
import { TiltFrame } from './TiltFrame'
import { ResilientImage } from './ResilientImage'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: 'easeOut' },
}

export function Friendship() {
  return (
    <section id="friendship" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeInUp} className="mb-16">
          <span className="text-sm text-gray-500 tracking-widest uppercase">Chapter Eleven — Friendship</span>
          <div className="w-6 h-px bg-gray-600 mt-2" />
        </motion.div>

        <motion.h2
          {...fadeInUp}
          className="font-display text-[10vw] lg:text-section leading-none tracking-tight mb-12 lg:mb-16"
        >
          IFNAN · TALHA<br />· MOHEIZ
        </motion.h2>

        <motion.p
          {...fadeInUp}
          className="text-lg lg:text-xl text-gray-300 leading-relaxed mb-24 lg:mb-32 max-w-4xl"
        >
          Friendship has always been an important part of the MAAR Journey. Throughout
          different stages of education and life, Adil met many people, but only a few
          became genuinely close and trusted friends. Each friendship developed in its
          own way, through conversations, shared experiences, support, and the simple
          moments of spending time together. Among those friendships, Ifnan, Talha, and
          Mohaiz became three of the closest people in his life.
        </motion.p>

        <div className="space-y-24 lg:space-y-32">
          {/* Ifnan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
            <motion.div {...fadeInUp}>
              <figure>
                <TiltFrame>
                  <ResilientImage
                    src="/images/friendship1.jpg"
                    alt="Ifnan — a friendship that found its way back"
                    className="w-auto h-auto max-w-full max-h-[70vh] object-contain grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </TiltFrame>
                <figcaption className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                  Ifnan — Fortis Academy to BMet College
                </figcaption>
              </figure>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="flex items-center"
            >
              <div>
                <h3 className="text-xl lg:text-2xl font-light text-white mb-4">
                  Ifnan — A Friendship That Found Its Way Back
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  Adil first met Ifnan at Fortis Academy when he was in Year 9. From the
                  beginning, they started talking and chatting regularly, and over time
                  their friendship naturally became closer. They spent time together at
                  school, shared conversations, and gradually became good friends. Ifnan
                  became one of the closest friends Adil had during that period of his life.
                </p>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  As Adil progressed through school, circumstances changed. When Adil
                  reached Year 10, Ifnan moved on toward Year 11 and eventually college.
                  Because they were no longer in the same environment, the closeness they
                  once shared gradually became less frequent. For around a year, they were
                  not as close as they had once been.
                </p>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  However, their friendship did not disappear completely.
                </p>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  In 2025, after Adil had completed Year 11 and started at BMet Matthew
                  Boulton College, he reunited with Ifnan. Their friendship began to grow
                  close again, almost as though the time apart had only been a chapter in
                  their story. From that point, Ifnan once again became one of the most
                  trusted friends in the MAAR Journey.
                </p>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  Ifnan was someone Adil felt he could genuinely rely on. He was talented,
                  supportive, and willing to help when Adil needed it. When Adil first
                  arrived at college, he was unfamiliar with many of the college rules and
                  how everything worked. Ifnan helped him understand those rules, showed
                  him around, and helped make the transition into college easier.
                </p>
                <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
                  What makes their friendship especially meaningful is the journey it went
                  through. They first met as young students in Year 9, became close, grew
                  apart as their paths changed, and then found their friendship again years
                  later in college. Their story became an example of how a genuine
                  friendship can survive distance and changing circumstances.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Talha */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
            <motion.div
              {...fadeInUp}
              className="flex items-center lg:order-2"
            >
              <div>
                <h3 className="text-xl lg:text-2xl font-light text-white mb-4">
                  Talha — A Friend Built on Loyalty
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  Adil met Talha when he first came to college for enrolment. At a time
                  when he was still getting used to his new surroundings, Talha was one of
                  the people who approached him and started a conversation. They eventually
                  exchanged numbers and continued talking, and from that first meeting, a
                  close friendship began to develop.
                </p>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  One of the qualities Adil values most about Talha is his loyalty. He is
                  someone who is willing to help when Adil needs information or has
                  questions, particularly when it comes to college. Whenever Adil needed to
                  understand something or find out what was happening, Talha was willing to
                  share what he knew.
                </p>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  Talha also became someone who genuinely listened. When Adil asked him
                  something, he did not simply ignore it or brush it aside. He listened to
                  what Adil had to say and tried to help whenever he could. That reliability
                  gradually strengthened the trust between them.
                </p>
                <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
                  Their friendship was built through everyday college life—conversations,
                  exchanging information, helping each other, and being there when needed.
                  Talha became one of the people Adil could depend on, making his friendship
                  an important part of the MAAR Journey.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="lg:order-1"
            >
              <figure>
                <TiltFrame>
                  <ResilientImage
                    src="/images/friendship2.jpg"
                    alt="Talha — a friend built on loyalty"
                    className="w-auto h-auto max-w-full max-h-[70vh] object-contain grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </TiltFrame>
                <figcaption className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                  Talha — met at college enrolment
                </figcaption>
              </figure>
            </motion.div>
          </div>

          {/* Mohaiz */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
            <motion.div {...fadeInUp}>
              <figure>
                <TiltFrame>
                  <ResilientImage
                    src="/images/friendship3.jpg"
                    alt="Mohaiz — a friendship built on understanding"
                    className="w-auto h-auto max-w-full max-h-[70vh] object-contain grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </TiltFrame>
                <figcaption className="mt-4 text-xs text-gray-500 tracking-widest uppercase">
                  Mohaiz — second week of college
                </figcaption>
              </figure>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="flex items-center"
            >
              <div>
                <h3 className="text-xl lg:text-2xl font-light text-white mb-4">
                  Mohaiz — A Friendship Built on Understanding
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  Mohaiz became part of Adil's life around the second week of college. At
                  that time, Adil was looking to make new friends and build connections in
                  his new environment. Among the people he met, Mohaiz quickly became
                  someone he felt comfortable around.
                </p>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  Their friendship developed through spending time together in class,
                  sitting next to each other, talking, and sharing different experiences.
                  Mohaiz became someone Adil could be open with without feeling judged for
                  who he was. He listened to Adil when he had problems, discussed those
                  problems with him, and offered ideas or possible solutions.
                </p>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  They also developed a strong connection through the way they think. Adil
                  and Mohaiz often understand things in a similar way. Their logic, approach
                  to ideas, and even parts of their philosophy are similar, which makes it
                  easy for them to understand one another and exchange thoughts.
                </p>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  Mohaiz has also played a small but meaningful role in Adil's creative
                  ideas. Although Mohaiz does not do web development himself, he is always
                  willing to give Adil ideas when asked. When Adil is thinking about website
                  designs, features, or other MAAR-related projects, Mohaiz can offer
                  suggestions and another perspective. His contribution comes through ideas
                  and conversations rather than through actually developing the websites.
                </p>
                <p className="text-gray-400 leading-relaxed mb-4 text-sm lg:text-base">
                  They have also shared many moments through college projects and everyday
                  lessons. Whether they were working on something together, discussing an
                  idea, or simply talking during class, those experiences helped strengthen
                  their friendship.
                </p>
                <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
                  For Adil, one of the most valuable things about Mohaiz is the feeling of
                  being understood. Their similar way of thinking makes their friendship
                  different from many others, because they can often understand where the
                  other person is coming from without needing to explain everything.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Closing — The People Along the MAAR Journey */}
        <motion.div {...fadeInUp} className="mt-24 lg:mt-32 max-w-4xl">
          <h3 className="font-display text-[6vw] lg:text-4xl leading-tight tracking-tight text-gray-300 mb-8">
            The People Along the MAAR Journey
          </h3>

          <p className="text-base lg:text-lg text-gray-300 leading-relaxed mb-6">
            The friendships with Ifnan, Talha, and Mohaiz are three different stories,
            but each has its own place in the MAAR Journey.
          </p>

          <p className="text-base lg:text-lg text-gray-300 leading-relaxed mb-6">
            Ifnan represents a friendship that began in school, went through a period of
            distance, and eventually found its way back in college. Talha represents a
            friendship built from a simple first meeting and strengthened through loyalty,
            communication, and reliability. Mohaiz represents a friendship built through
            trust, openness, shared experiences, and a similar way of thinking.
          </p>

          <p className="text-base lg:text-lg text-gray-300 leading-relaxed mb-6">
            The MAAR Journey is not only about education, achievements, projects, or
            personal growth. It is also about the people who become part of that journey
            along the way. Some friendships may last for a short period, while others
            remain meaningful through different stages of life.
          </p>

          <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
            For Adil, these three friendships became part of the story—not because
            everything was always perfect, but because they were built through real
            experiences, trust, understanding, and the willingness to be there for one
            another.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
