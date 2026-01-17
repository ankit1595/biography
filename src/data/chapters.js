// Background color palette
export const BACKGROUNDS = {
  charcoal: "#2a2829",
  warmDark: "#332b28",
  dustyRose: "#8c6361",
  lightGray: "#f5f4f0",
  black: "#000000",
};

export const chapters = [
  // INTRO - Poetry
  {
    id: "mission",
    name: "Mission",
    sections: [
      {
        type: "text",
        bgColor: BACKGROUNDS.charcoal,
        content:
          "एक कहानी शुरू होती है\nसूरज के ढलने के बाद,\nअंधेरा कितना घोर घना है\nजाना दीया बनने के बाद।",
      },
    ],
  },

  // Index
  {
    id: "index",
    name: "Index",
    sections: [{ type: "index", bgColor: BACKGROUNDS.dustyRose }],
  },

  // The Mission - Uncompromising Non-Duality
  {
    id: "the-mission",
    name: "The Mission",
    sections: [
      {
        type: "header",
        bgColor: BACKGROUNDS.charcoal,
        title: "The Mission",
        subtitle: "Uncompromising Non-Duality",
      },
      {
        type: "text",
        bgColor: BACKGROUNDS.lightGray,
        isLongForm: true,
        content: `Humanity stands at a strange crossroads: outwardly accomplished yet inwardly restless. We have decoded the genome and mapped the stars, but remain strangers to ourselves.

The sages of India named this inner blindness Avidya and offered Advaita Vedanta - the philosophy of non-duality - as its remedy. Adi Shankara turned that insight into a revolution of clarity, but over time ritual and organized belief buried its spirit of enquiry.

When even classical Advaita had to compromise - separating Paramarthika, the realm of truth, from Vyavaharika, the realm of social order, and allowing inner realisation to coexist with outer conformity, often treating social evils such as caste, patriarchy, or divisive nationalism as ordinary life - Acharya Prashant refused that divide. He insists the two must become one: any life where understanding does not transform the very centre of living is hypocrisy - from diet and career to politics, planetary responsibility, even religion itself.

Our modern and revered teachers, too, remained incomplete in their endeavour. Some diluted the truth to please the masses, some withdrew into silence while the world burned, others acted as activists without philosophical depth, and some rejected religion altogether. Acharya Prashant stands apart -

He declares there is no such thing as "personal liberation." True liberation and compassion must overflow beyond the individual, embracing all humans, animals, and the planet in its entirety.

He reclaims religion itself - entering its heart, cleansing it of dogma and superstition, and restoring it as a vehicle of liberation rather than bondage. He challenges Loukik Dharma - the social religion of blind faith - with unprecedented sharpness, while revealing the sacred essence beneath.

Acharya Prashant is not merely a philosopher or a public intellectual who passively accepts the world as it is. He refuses to believe that Paramarthika - the realm of truth - must ever be compromised to preserve the status quo.

He has not only brought the highest philosophical insights of Vedanta into practical life for those who seek it, but has also dared to bring this wisdom to those who resist it - something even Shri Krishna warned against in the Bhagavad Gita.

Through social media, he reaches people with the lowest attention spans - through short reels and clips - quietly allowing the essence of Vedanta to seep into society.

For more than two decades, he has spoken to audiences worldwide, bringing uncompromising clarity to the dilemmas of modern life - through reason, humour, and relentless honesty.

Through digital media, his mission has become a global ecosystem of learning. Author of over 150 books, including Karma and The Book of Ego, and followed by millions, he has used technology to bring timeless wisdom into everyday consciousness. At its heart lies the Prashant Advait Foundation - a vibrant space of live sessions, daily wisdom activities, regular examinations, and daily written reflections - now numbering over 100,000 members. Against the logic of online superficiality, he has built a digital movement that grows deeper, not merely wider.

By challenging ritualized religion, pop philosophy, market spirituality, and political identity alike, Acharya Prashant has become a quiet danger to power - religious, social, political, and economic. Yet he remains focused on his work, insisting he fights no one but falsehood.

This fusion of philosophical depth, fearlessness, and authenticity - realised on a scale never seen before and without surrendering an inch of integrity to popularity - makes him historically unique.`,
      },
    ],
  },

  // Chapter 1: The Dawn
  {
    id: "the-dawn",
    name: "The Dawn",
    sections: [
      {
        type: "header",
        bgColor: BACKGROUNDS.dustyRose,
        title: "The Dawn (1978-1995)",
        subtitle:
          "It began with a child's unease that something, somewhere, was terribly wrong.",
      },
      {
        type: "text",
        bgColor: BACKGROUNDS.dustyRose,
        isLongForm: false,
        content: `The early years were marked by an unusual sensitivity to the world's contradictions. While other children played, questions about existence, suffering, and truth occupied a young mind.

Born in a middle-class family in Uttar Pradesh, the surroundings were ordinary, but the inner landscape was anything but. Books became companions, philosophy became the language of understanding.

The education system felt inadequate. Not because it was difficult, but because it seemed to miss the point entirely. What was the purpose of learning if it didn't address the fundamental questions of life?`,
      },
    ],
  },

  // Chapter 2: Prestige and Protest
  {
    id: "prestige-and-protest",
    name: "Prestige and Protest",
    sections: [
      {
        type: "header",
        bgColor: BACKGROUNDS.warmDark,
        title: "Prestige and Protest (1995-2006)",
        subtitle: "The corporate world offered success, but demanded the soul.",
      },
      {
        type: "text",
        bgColor: BACKGROUNDS.warmDark,
        isLongForm: false,
        content: `IIT and IIM opened doors to a world of prestige and possibility. The corporate ladder beckoned, promising the conventional markers of success: money, status, security.

But the old questions persisted. What is the point of achieving if the achievement feels hollow? Why does success feel like a cage rather than freedom?

The years in the corporate world were not wasted. They revealed the machinery of modern life—the compromises, the distractions, the slow erosion of authentic living.`,
      },
      {
        type: "gallery",
        bgColor: BACKGROUNDS.black,
        images: [
          {
            src: "https://picsum.photos/800/600?random=2",
            caption: "The IIT days",
          },
          {
            src: "https://picsum.photos/800/600?random=3",
            caption: "Early career",
          },
        ],
      },
    ],
  },

  // Chapter 3: The Free Man
  {
    id: "the-free-man",
    name: "The Free Man",
    sections: [
      {
        type: "header",
        bgColor: BACKGROUNDS.black,
        title: "The Free Man in March",
        subtitle: "Breaking free from the golden cage.",
      },
      {
        type: "gallery",
        bgColor: BACKGROUNDS.black,
        images: [
          {
            src: "https://picsum.photos/600/800?random=4",
            caption: "The decision that changed everything",
          },
        ],
      },
      {
        type: "text",
        bgColor: BACKGROUNDS.black,
        content:
          "Some decisions cannot be explained, only lived. The resignation letter was not an ending—it was a beginning.",
      },
    ],
  },

  // Chapter 4: Lighting Lamps
  {
    id: "lighting-lamps",
    name: "Lighting Lamps",
    sections: [
      {
        type: "header",
        bgColor: BACKGROUNDS.lightGray,
        title: "Lighting Lamps in the Wilderness",
        subtitle: "When teaching becomes a calling, not a profession.",
      },
      {
        type: "text",
        bgColor: BACKGROUNDS.lightGray,
        isLongForm: false,
        content: `The wilderness is not a place—it is a state of confusion that most people live in. Lighting lamps means helping others see what they have been blind to.

Teaching began as a quiet affair. A few students, genuine questions, honest conversations. No grand plans, no marketing strategies. Just truth seeking truth.

Word spread. Not through advertisements, but through transformation. Those who found clarity became messengers themselves.`,
      },
      {
        type: "gallery",
        bgColor: BACKGROUNDS.black,
        images: [
          { src: "https://picsum.photos/600/400?random=5" },
          { src: "https://picsum.photos/600/400?random=6" },
          { src: "https://picsum.photos/600/400?random=7" },
          { src: "https://picsum.photos/600/400?random=8" },
        ],
      },
    ],
  },

  // Ending
  {
    id: "ending",
    name: "The End",
    sections: [
      {
        type: "text",
        bgColor: BACKGROUNDS.charcoal,
        content: "यात्रा जारी है।\n\nThe journey continues.",
      },
    ],
  },
];
