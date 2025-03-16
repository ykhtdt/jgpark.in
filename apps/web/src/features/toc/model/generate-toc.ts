type TableOfContent = TableOfContentItem & {
  children: TableOfContentItem[];
};

type TableOfContentItem = {
  slug: string;
  text: string;
};

export const generateToc = (content: string): TableOfContent[] => {
  return content.split("\n").reduce((acc: TableOfContent[], line) => {
    const match = line.match(/^(#{1,3})\s/)

    if (match && match[1]) {
      const level = match[1].length.toString()
      const slug = line.replace(/^#{1,3}\s*/, "").trim().replace(/\s/g, "-")
      const text = line.replace(/^#{1,3}\s*/, "").trim()
      const item: TableOfContent = {
        slug,
        text,
        children: [],
      }

      if (level === "2") {
        acc.push(item)
      } else if (level === "3" && acc.length > 0) {
        acc[acc.length - 1]?.children.push(item)
      }
    }

    return acc
  }, [])
}



