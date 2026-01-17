// Background color palette
export const BACKGROUNDS = {
  charcoal: "#2a2829",
  warmDark: "#332b28",
  dustyRose: "#8c6361",
  lightGray: "oklch(92.8% .006 264.531)",
  black: "#000000",
};

export const chapters = [
  // INTRO
  {
    id: "mission",
    name: "Mission",
    bgColor: BACKGROUNDS.charcoal,
    sections: [
      {
        type: "text",
        content:
          "एक कहानी शुरू होती है\nसूरज के ढलने के बाद,\nअंधेरा कितना घोर घना है\nजाना दीया बनने के बाद।",
      },
    ],
  },

  // Index
  {
    id: "index",
    name: "Index",
    bgColor: BACKGROUNDS.charcoal,
    sections: [
      {
        type: "index",
      },
    ],
  },

  // Short text only
  {
    id: "short-text",
    name: "Short Text",
    bgColor: BACKGROUNDS.lightGray,
    sections: [
      {
        type: "text",
        content:
          "This is a short text section. It fits comfortably within the viewport without needing to scroll. Perfect for impactful one-liners or brief introductions.",
        isLongForm: false,
      },
    ],
  },

  // Long text
  {
    id: "long-text",
    name: "Long Text",
    bgColor: BACKGROUNDS.warmDark,
    sections: [
      {
        type: "text",
        isLongForm: true,
        content: `This is a long-form text section that scrolls within a single snap point.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?

Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.

Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.`,
      },
    ],
  },

  // Single full-bleed image
  {
    id: "single-image",
    name: "Single Image",
    bgColor: BACKGROUNDS.black,
    sections: [
      {
        type: "image",
        src: "https://picsum.photos/1920/1080?random=20",
        caption: "A moment captured in time",
      },
    ],
  },

  // Mixed - Text then Image
  {
    id: "text-then-image",
    name: "Text → Image",
    bgColor: BACKGROUNDS.dustyRose,
    sections: [
      {
        type: "text",
        content:
          "This text introduces the image that follows. It sets the context and prepares the reader for what they are about to see.",
      },
      {
        type: "image",
        src: "https://picsum.photos/1920/1080?random=24",
        caption: "The visual payoff",
      },
    ],
  },

  // Image then Long Text
  {
    id: "image-then-text",
    name: "Image → Long Text",
    bgColor: BACKGROUNDS.lightGray,
    sections: [
      {
        type: "image",
        src: "https://picsum.photos/1920/1080?random=25",
      },
      {
        type: "text",
        isLongForm: true,
        content: `The text follows the image, providing detailed context and commentary.

This demonstrates a long-form text section that appears after an image. The user can scroll within this section to read all the content.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      },
    ],
  },

  // Ending
  {
    id: "ending",
    name: "The End",
    bgColor: BACKGROUNDS.charcoal,
    sections: [
      {
        type: "text",
        content: "यात्रा जारी है।",
      },
    ],
  },
];
