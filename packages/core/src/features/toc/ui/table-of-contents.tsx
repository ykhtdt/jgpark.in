import { cn } from "@workspace/ui/lib/utils"

interface TableOfContentsListProps extends React.ComponentPropsWithoutRef<"ul"> {
  ref?: React.Ref<HTMLUListElement>
}

export const TableOfContentsList = ({
  ref,
  className,
}: TableOfContentsListProps) => {
  return (
    <ul
      ref={ref}
      className={cn("", className)}
    />
  )
}

