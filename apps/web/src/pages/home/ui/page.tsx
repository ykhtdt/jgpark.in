import { BaseLayout } from "@/widgets/layout"
import { Button } from "@workspace/ui/components/button"

export const HomePage = () => {
  return (
    <BaseLayout>
      <div className="flex flex-col flex-1 items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">
          Hello World
        </h1>
        <Button size="sm">
          Button
        </Button>
      </div>
    </BaseLayout>
  )
}
