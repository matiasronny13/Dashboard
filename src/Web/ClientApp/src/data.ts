export const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Homepage",
        url: "/",
        icon: "/home.svg",
      },
      {
        id: 2,
        title: "Profile",
        url: "/users/1",
        icon: "/user.svg",
      }
    ],
  }
];

export const searchEngines = [
  {
    id: 1,
    name: "Google",
    icon: "/search/google.ico",
    url: "https://www.google.com/search?q=",
    isDefault: true
  },
  {
    id: 2,
    name: "Searx",
    icon: "/search/searx.png",
    url: "https://searx.be/?q=",
    isDefault: false
  },
  {
    id: 3,
    name: "Start Page",
    icon: "/search/startpage.ico",
    url: "https://www.startpage.com/sp/search?abp=-1&t=&lui=english&sc=24rJ0nYi2LMD20&cat=web&query=",
    isDefault: false
  },
  {
    id: 4,
    name: "DuckDuckGo",
    icon: "/search/duckduckgo.ico",
    url: "https://duckduckgo.com/?ia=web&q=",
    isDefault: false
  },
  {
    id: 5,
    name: "Brave",
    icon: "/search/brave.png",
    url: "https://search.brave.com/search?source=web&q=",
    isDefault: false
  }
];

export const bookmarkData = [
  {
    id: 1,
    icon: "bookmark/gmail.png",
    name: "Gmail",
    url: "https://mail.google.com"
  },
  {
    id: 2,
    icon: "bookmark/x.png",
    name: "X",
    url: "https://x.com"
  },
  {
    id: 3,
    icon: "bookmark/facebook.png",
    name: "Facebook",
    url: "https://facebook.com"
  },
  {
    id: 4,
    icon: "bookmark/reddit.png",
    name: "Reddit",
    url: "https://reddit.com"
  },
  {
    id: 5,
    icon: "bookmark/youtube.png",
    name: "Youtube",
    url: "https://youtube.com"
  },
  {
    id: 6,
    icon: "bookmark/inoreader.png",
    name: "Inoreader",
    url: "https://inoreader.com"
  },
  {
    id: 7,
    icon: "bookmark/telegram.png",
    name: "Telegram",
    url: "https://web.telegram.org"
  },
  {
    id: 8,
    icon: "bookmark/tradingview.png",
    name: "Trading View",
    url: "https://www.tradingview.com/chart"
  },
  {
    id: 9,
    icon: "bookmark/spotify.png",
    name: "Spotify",
    url: "https://spotify.com"
  },
  {
    id: 10,
    icon: "bookmark/yahoo.png",
    name: "Yahoo Finance",
    url: "https://finance.yahoo.com"
  }
]