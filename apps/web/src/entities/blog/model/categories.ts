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

export const BLOG_CATEGORIES: Record<string, BlogCategory> = {
  writing: {
    name: "숲",
    path: "writing",
    description: "학습: 한 그루의 나무가 모여 숲을 이루듯, 시간이 지나면서 작은 노력이 하나씩 쌓여 가는 과정입니다.",
    gradient: {
      from: "lime-500",
      to: "emerald-600"
    }
  },
  archive: {
    name: "파도",
    path: "archive",
    description: "경험: 파도가 점점 더 커지듯, 시간이 지나면서 점점 더 강해지는 과정입니다.",
    gradient: {
      from: "sky-500",
      to: "blue-600"
    }
  },
  insight: {
    name: "잿불",
    path: "insight",
    description: "회고: 때로는 시간이 지나면서 털어내야 할 감정과 기억이 있지만, 때로는 시간이 흘러도 되돌아보며 배워야 하는 것이 있습니다.",
    gradient: {
      from: "orange-500",
      to: "red-600"
    }
  }
}
