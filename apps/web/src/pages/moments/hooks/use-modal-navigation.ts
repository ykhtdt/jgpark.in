import {
  useEffect,
  useState,
} from "react"
import {
  useRouter,
  usePathname,
} from "next/navigation"

const MOMENTS_PATH = "/moments"
const PREVIOUS_PATH_KEY = "previousPath"

export const useModalNavigation = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [referrerPath, setReferrerPath] = useState<string>("")

  useEffect(() => {
    setIsModalOpen(true)

    if (typeof window !== "undefined") {
      const previousPath = sessionStorage.getItem(PREVIOUS_PATH_KEY) || ""
      setReferrerPath(previousPath)
      sessionStorage.setItem(PREVIOUS_PATH_KEY, pathname || "")
    }
  }, [pathname])

  const handleCloseModal = () => {
    setIsModalOpen(false)
    navigateBack(referrerPath)
  }

  const navigateBack = (referrerPath: string) => {
    const isDirectAccess = !referrerPath || !referrerPath.includes(MOMENTS_PATH)
    if (isDirectAccess) {
      router.push(MOMENTS_PATH)
    } else {
      router.back()
    }
  }

  return {
    isModalOpen,
    handleCloseModal,
  }
}
