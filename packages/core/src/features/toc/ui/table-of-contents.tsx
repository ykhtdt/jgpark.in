import { cn } from "@workspace/ui/lib/utils"

interface TableOfContentsListProps extends React.ComponentPropsWithoutRef<"ul"> {
  ref?: React.Ref<HTMLUListElement>
  indent?: boolean
}

export const TableOfContentsList = ({
  ref,
  indent,
  className,
  ...props
}: TableOfContentsListProps) => {
  return (
    <ul
      ref={ref}
      className={cn("list-none", indent && "pl-4", className)}
      {...props}
    />
  )
}

interface TableOfContentsTitleProps extends React.ComponentPropsWithoutRef<"p"> {
  ref?: React.Ref<HTMLParagraphElement>
}

export const TableOfContentsTitle = ({
  ref,
  className,
  ...props
}: TableOfContentsTitleProps) => {
  return (
    <p
      ref={ref}
      className={cn("font-medium text-foreground mb-2", className)}
      {...props}
    />
  )
}

interface TableOfContentsItemProps extends React.ComponentPropsWithoutRef<"li"> {
  ref?: React.Ref<HTMLLIElement>
  indent?: boolean
}

export const TableOfContentsItem = ({
  ref,
  indent,
  className,
  ...props
}: TableOfContentsItemProps) => {
  return (
    <li
      ref={ref}
      className={cn("pt-2", indent && "ml-4", className)}
      {...props}
    />
  )
}

interface TableOfContentsLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  ref?: React.Ref<HTMLAnchorElement>
  isActive?: boolean
}

export const TableOfContentsLink = ({
  ref,
  isActive,
  className,
  ...props
}: TableOfContentsLinkProps) => {
  return (
    <a
      ref={ref}
      className={cn(isActive && "text-foreground", className)}
      {...props}
    />
  )
}
