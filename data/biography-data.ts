export interface BiographyEvent {
  year: string
  title: string
  description: string
  category: "personal" | "career" | "achievement"
  image?: string
}

export interface BiographySection {
  id: string
  title: string
  period: string
  content: string
  events: BiographyEvent[]
}

export const biographySections: BiographySection[] = [
  {
    id: "early-life",
    title: "Early Life",
    period: "1964-1983",
    content: `Keanu Charles Reeves was born on September 2, 1964, in Beirut, Lebanon. His mother, Patricia Taylor, was a costume designer and performer from Essex, England, and his father, Samuel Nowlin Reeves Jr., was a geologist of Chinese-Hawaiian heritage from Hawaii. Keanu's first name means "cool breeze over the mountains" in Hawaiian.

    After his parents divorced when he was just three years old, Reeves moved with his mother to Sydney, Australia, and then to New York City. They eventually settled in Toronto, Canada, where he spent most of his childhood. During this time, Reeves attended several high schools, including the Etobicoke School of the Arts, from which he was expelled. Despite his academic challenges, he excelled in ice hockey, playing as a goalkeeper and earning the nickname "The Wall."

    Reeves' early life was marked by frequent moves and a sense of rootlessness that would later inform his performances. His multicultural background and experiences living in different countries contributed to his unique perspective and approach to acting.`,
    events: [
      {
        year: "1964",
        title: "Birth in Beirut",
        description:
          "Keanu Charles Reeves was born on September 2 in Beirut, Lebanon to Patricia Taylor and Samuel Nowlin Reeves Jr.",
        category: "personal",
        image: "/biography/birth.jpg",
      },
      {
        year: "1966",
        title: "Parents' Divorce",
        description:
          "Keanu's parents divorced when he was three years old, after which he began moving frequently with his mother.",
        category: "personal",
      },
      {
        year: "1970s",
        title: "Moves to Toronto",
        description:
          "After living in Australia and New York, Keanu and his mother settled in Toronto, Canada, where he spent most of his childhood.",
        category: "personal",
        image: "/biography/toronto.jpg",
      },
      {
        year: "Early 1980s",
        title: "Hockey Goalkeeper",
        description:
          "Excelled as an ice hockey goalkeeper in high school, earning the nickname 'The Wall' and harboring dreams of playing for Canada's Olympic team.",
        category: "personal",
        image: "/biography/hockey.jpg",
      },
      {
        year: "1983",
        title: "Leaves High School",
        description:
          "Left high school without obtaining a diploma to pursue acting, marking the beginning of his entertainment career.",
        category: "personal",
      },
    ],
  },
  {
    id: "early-career",
    title: "Early Career",
    period: "1984-1990",
    content: `Keanu Reeves began his acting career in Canada, appearing in theater productions, commercials, and small television roles. His first notable screen appearance was in a Coca-Cola commercial, followed by roles in Canadian television shows and low-budget films.

    In 1986, Reeves made his feature film debut in the drama "Youngblood," starring alongside Rob Lowe and Patrick Swayze. While the role was small, it marked the beginning of his transition to Hollywood. That same year, he appeared in the critically acclaimed film "River's Edge," which showcased his ability to portray complex characters.

    Reeves' breakthrough came in 1989 with "Bill & Ted's Excellent Adventure," where he played the lovable slacker Ted "Theodore" Logan. The film's success established him as a comedic actor and cultural icon, with his character's catchphrases becoming part of popular culture.

    During this period, Reeves demonstrated his versatility by taking on diverse roles in films like "Dangerous Liaisons" (1988) and "Parenthood" (1989), proving he could handle both comedy and drama with equal skill.`,
    events: [
      {
        year: "1984",
        title: "Acting Debut",
        description: "Made his professional acting debut in an episode of the Canadian TV series 'Hangin' In'.",
        category: "career",
      },
      {
        year: "1986",
        title: "Hollywood Debut",
        description:
          "Made his Hollywood film debut in the sports drama 'Youngblood', starring alongside Rob Lowe and Patrick Swayze.",
        category: "career",
        image: "/biography/youngblood.jpg",
      },
      {
        year: "1986",
        title: "River's Edge",
        description:
          "Starred in the critically acclaimed drama 'River's Edge', which showcased his dramatic acting abilities.",
        category: "career",
        image: "/biography/rivers-edge.jpg",
      },
      {
        year: "1988",
        title: "Dangerous Liaisons",
        description:
          "Appeared in the Academy Award-winning film 'Dangerous Liaisons', working with director Stephen Frears and stars Glenn Close and John Malkovich.",
        category: "career",
      },
      {
        year: "1989",
        title: "Bill & Ted's Excellent Adventure",
        description:
          "Achieved mainstream success with his role as Ted 'Theodore' Logan in the cult classic comedy 'Bill & Ted's Excellent Adventure'.",
        category: "career",
        image: "/biography/bill-ted.jpg",
      },
    ],
  },
  {
    id: "rise-to-stardom",
    title: "Rise to Stardom",
    period: "1991-1999",
    content: `The 1990s marked Keanu Reeves' ascent to Hollywood stardom, with a series of critically acclaimed and commercially successful films that showcased his range as an actor. In 1991, he reprised his role as Ted in "Bill & Ted's Bogus Journey" and starred in the action film "Point Break" alongside Patrick Swayze, demonstrating his ability to handle physically demanding roles.

    Reeves continued to build his reputation with diverse performances in films like "My Own Private Idaho" (1991), where he starred alongside River Phoenix in a critically acclaimed drama that explored themes of identity and alienation. His willingness to take on challenging and unconventional roles set him apart from many of his contemporaries.

    In 1994, Reeves' career reached new heights with the release of "Speed," an action thriller in which he played LAPD officer Jack Traven. The film was a massive commercial success and established Reeves as a legitimate action star. Rather than being typecast, however, he continued to pursue varied roles, appearing in the romantic drama "A Walk in the Clouds" (1995) and the sci-fi thriller "Johnny Mnemonic" (1995).

    The decade culminated with Reeves' most iconic role to date: Neo in "The Matrix" (1999). The groundbreaking film combined cutting-edge special effects with philosophical themes, and Reeves' portrayal of a computer programmer who discovers the truth about reality resonated with audiences worldwide. "The Matrix" not only became a cultural phenomenon but also cemented Reeves' status as one of Hollywood's biggest stars.`,
    events: [
      {
        year: "1991",
        title: "Point Break",
        description:
          "Starred as FBI agent Johnny Utah in the action thriller 'Point Break', directed by Kathryn Bigelow and co-starring Patrick Swayze.",
        category: "career",
        image: "/biography/point-break.jpg",
      },
      {
        year: "1991",
        title: "My Own Private Idaho",
        description:
          "Delivered a critically acclaimed performance in Gus Van Sant's 'My Own Private Idaho' alongside River Phoenix.",
        category: "career",
        image: "/biography/idaho.jpg",
      },
      {
        year: "1992",
        title: "Bram Stoker's Dracula",
        description:
          "Starred in Francis Ford Coppola's gothic horror film 'Bram Stoker's Dracula', playing Jonathan Harker.",
        category: "career",
      },
      {
        year: "1994",
        title: "Speed",
        description:
          "Achieved action star status with the blockbuster hit 'Speed', playing LAPD officer Jack Traven alongside Sandra Bullock.",
        category: "career",
        image: "/biography/speed.jpg",
      },
      {
        year: "1999",
        title: "The Matrix",
        description:
          "Took on the iconic role of Neo in the groundbreaking sci-fi film 'The Matrix', which revolutionized special effects in cinema and became a cultural phenomenon.",
        category: "career",
        image: "/biography/matrix.jpg",
      },
    ],
  },
  {
    id: "established-star",
    title: "Established Star",
    period: "2000-2013",
    content: `Following the massive success of "The Matrix," Keanu Reeves entered the 2000s as one of Hollywood's most recognizable stars. He reprised his role as Neo in two sequels, "The Matrix Reloaded" and "The Matrix Revolutions," both released in 2003. While the sequels received mixed reviews, they were commercial successes and further solidified Reeves' place in pop culture.

    During this period, Reeves continued to demonstrate his versatility by taking on a variety of roles. He starred in the romantic drama "The Lake House" (2006), reuniting with his "Speed" co-star Sandra Bullock, and took on the role of occult detective John Constantine in the supernatural thriller "Constantine" (2005), based on the DC Comics character.

    Despite his success, this era also marked a period of personal tragedy for Reeves. In 1999, his longtime girlfriend Jennifer Syme gave birth to their daughter Ava, who was stillborn. The couple's relationship ended shortly after, and in 2001, Syme died in a car accident. These personal tragedies affected Reeves deeply, though he maintained a private stance on these matters.

    In the latter part of this period, Reeves experienced what some critics described as a career lull, with films like "The Day the Earth Stood Still" (2008) and "47 Ronin" (2013) receiving mixed to negative reviews. However, he continued to work steadily and explore different aspects of filmmaking, including directing his first feature film, "Man of Tai Chi" (2013).`,
    events: [
      {
        year: "2000",
        title: "The Replacements",
        description: "Starred in the sports comedy 'The Replacements', playing quarterback Shane Falco.",
        category: "career",
      },
      {
        year: "2001",
        title: "Personal Tragedy",
        description:
          "Experienced the tragic loss of his former girlfriend Jennifer Syme in a car accident, following the earlier stillbirth of their daughter.",
        category: "personal",
      },
      {
        year: "2003",
        title: "The Matrix Sequels",
        description:
          "Reprised his role as Neo in 'The Matrix Reloaded' and 'The Matrix Revolutions', completing the trilogy.",
        category: "career",
        image: "/biography/matrix-sequels.jpg",
      },
      {
        year: "2005",
        title: "Constantine",
        description:
          "Starred as occult detective John Constantine in the supernatural thriller based on the DC Comics character.",
        category: "career",
        image: "/biography/constantine.jpg",
      },
      {
        year: "2013",
        title: "Directorial Debut",
        description:
          "Made his directorial debut with the martial arts film 'Man of Tai Chi', in which he also starred as the villain.",
        category: "achievement",
        image: "/biography/man-of-tai-chi.jpg",
      },
    ],
  },
  {
    id: "career-renaissance",
    title: "Career Renaissance",
    period: "2014-Present",
    content: `In 2014, Keanu Reeves experienced a remarkable career resurgence with the release of "John Wick," in which he played the titular character, a retired hitman seeking vengeance. The film, known for its stylish action sequences and world-building, was both a critical and commercial success, spawning a franchise and reestablishing Reeves as an action star in his 50s.

    The success of "John Wick" led to two sequels, "John Wick: Chapter 2" (2017) and "John Wick: Chapter 3 – Parabellum" (2019), both of which expanded the mythology of the series and showcased Reeves' dedication to performing his own stunts and fight choreography. The franchise has been praised for its innovative action sequences and has developed a devoted fan base.

    Beyond the "John Wick" series, Reeves has continued to take on diverse roles. He appeared in the romantic thriller "Siberia" (2018), the sci-fi film "Replicas" (2018), and provided voice acting for "Toy Story 4" (2019) as the character Duke Caboom. In 2019, he made a memorable cameo appearance in the Netflix romantic comedy "Always Be My Maybe," playing a fictionalized version of himself.

    In 2020, Reeves returned to one of his most beloved franchises with "Bill & Ted Face the Music," reprising his role as Ted "Theodore" Logan nearly 30 years after the previous film. He also returned to "The Matrix" franchise with "The Matrix Resurrections" (2021), once again taking on the role of Neo.

    Outside of acting, Reeves has pursued various creative endeavors. He co-founded the motorcycle company ARCH Motorcycle, published a book of poetry titled "Ode to Happiness," and has been involved in charitable work, though he often keeps these activities private. His reputation for kindness, humility, and generosity has made him a beloved figure in Hollywood and beyond, with numerous stories of his good deeds circulating online.

    In recent years, there has been what fans and media have dubbed the "Keanussance," a celebration of Reeves' career, personality, and enduring appeal. His authenticity, work ethic, and genuine nature have resonated with audiences, making him not just a successful actor but a cultural icon whose influence extends far beyond his films.`,
    events: [
      {
        year: "2014",
        title: "John Wick",
        description:
          "Experienced a career resurgence with the action thriller 'John Wick', playing a retired hitman seeking vengeance.",
        category: "career",
        image: "/biography/john-wick.jpg",
      },
      {
        year: "2016",
        title: "Founded ARCH Motorcycle",
        description:
          "Co-founded ARCH Motorcycle Company, which builds custom motorcycles, reflecting his passion for motorcycling.",
        category: "achievement",
        image: "/biography/arch-motorcycle.jpg",
      },
      {
        year: "2019",
        title: "Toy Story 4",
        description:
          "Voiced the character Duke Caboom in the animated film 'Toy Story 4', showcasing his versatility as a performer.",
        category: "career",
        image: "/biography/toy-story.jpg",
      },
      {
        year: "2020",
        title: "Bill & Ted Face the Music",
        description:
          "Returned to his breakout role as Ted 'Theodore' Logan in 'Bill & Ted Face the Music', nearly 30 years after the previous film.",
        category: "career",
        image: "/biography/bill-ted-3.jpg",
      },
      {
        year: "2021",
        title: "The Matrix Resurrections",
        description:
          "Reprised his iconic role as Neo in 'The Matrix Resurrections', the fourth installment in the Matrix franchise.",
        category: "career",
        image: "/biography/matrix-resurrections.jpg",
      },
      {
        year: "2023",
        title: "John Wick: Chapter 4",
        description:
          "Starred in the fourth installment of the John Wick franchise, which received critical acclaim and commercial success.",
        category: "career",
        image: "/biography/john-wick-4.jpg",
      },
    ],
  },
]
