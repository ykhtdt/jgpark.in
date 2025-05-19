export interface CategoryGradient {
  from: string
  to: string
}

export interface BlogCategory {
  name: string
  path: string
  description: string
  gradient: CategoryGradient
}

export type ValidCategory = "writing" | "archive" | "insight"

export const BLOG_CATEGORIES: Record<ValidCategory, BlogCategory> = {
  writing: {
    name: "숲",
    path: "writing",
    description: "작은 노력이 모여 시간이 흐르며 하나의 숲을 이루듯, 성장의 과정을 담고 있습니다.",
    gradient: {
      from: "lime-500",
      to: "emerald-600"
    }
  },
  archive: {
    name: "파도",
    path: "archive",
    description: "경험은 파도처럼 점점 커지며, 시간 속에서 더 단단해지는 여정을 의미합니다.",
    gradient: {
      from: "sky-500",
      to: "blue-600"
    }
  },
  insight: {
    name: "잿불",
    path: "insight",
    description: "회고는 때론 털어내야 할 감정이지만, 되돌아보며 배워야 할 순간이기도 합니다.",
    gradient: {
      from: "orange-500",
      to: "red-600"
    }
  }
}
