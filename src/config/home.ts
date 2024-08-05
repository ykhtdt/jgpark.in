export type HomeConfig = {
  title: string;
  config: {
    published: boolean;
    title: string;
    href: string;
  }[];
}

export const browseConfig: HomeConfig = {
  title: "Browse",
  config: [
    {
      published: true,
      title: "Blog",
      href: "/blog",
    },
    {
      published: true,
      title: "Moments",
      href: "/moments",
    },
  ]
}

export const informationConfig: HomeConfig = {
  title: "Information",
  config: [
    {
      published: false,
      title: "About",
      href: "/about",
    },
    {
      published: false,
      title: "Work",
      href: "/work",
    },
    {
      published: false,
      title: "Projects",
      href: "/projects",
    },
    {
      published: false,
      title: "Contact",
      href: "/contact",
    },
  ]
}