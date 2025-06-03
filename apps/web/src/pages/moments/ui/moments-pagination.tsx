"use client"

import { useRouter } from "next/navigation"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@workspace/ui/components/pagination"

interface PageLinkProps {
  page: number
  isActive?: boolean
  onNavigate: (page: number) => void
}

const PageLink = ({
  page,
  isActive = false,
  onNavigate,
}: PageLinkProps) => {
  return (
    <PaginationItem>
      <PaginationLink
        onClick={(e) => {
          e.preventDefault()
          onNavigate(page)
        }}
        href={`/moments?page=${page}`}
        isActive={isActive}
      >
        {page}
      </PaginationLink>
    </PaginationItem>
  )
}

interface NavigationButtonProps {
  onClick: (e: React.MouseEvent) => void
  href: string
  disabled?: boolean
  children?: React.ReactNode
}

const PrevButton = ({ onClick, href, disabled }: NavigationButtonProps) => {
  if (disabled) {
    return <PaginationPrevious className="pointer-events-none opacity-50" aria-disabled="true" />
  }

  return (
    <PaginationPrevious
      href={href}
      onClick={onClick}
    />
  )
}

const NextButton = ({ onClick, href, disabled }: NavigationButtonProps) => {
  if (disabled) {
    return <PaginationNext className="pointer-events-none opacity-50" aria-disabled="true" />
  }

  return (
    <PaginationNext
      href={href}
      onClick={onClick}
    />
  )
}

interface MomentsPaginationProps {
  totalPages: number
  currentPage: number
}

export const MomentsPagination = ({
  totalPages,
  currentPage,
}: MomentsPaginationProps) => {
  const router = useRouter()
  const maxDisplayedPages = 5
  const startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2))
  const endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1)

  const showFirstPage = currentPage > 3
  const showStartEllipsis = currentPage > 4

  const showEndEllipsis = endPage < totalPages - 1
  const showLastPage = endPage < totalPages

  const isPreviousDisabled = currentPage <= 1
  const isNextDisabled = currentPage >= totalPages

  const handleNavigation = (page: number) => {
    router.push(`/moments?page=${page}`)
  }

  const handlePrevClick = (e: React.MouseEvent) => {
    e.preventDefault()
    handleNavigation(currentPage - 1)
  }

  const handleNextClick = (e: React.MouseEvent) => {
    e.preventDefault()
    handleNavigation(currentPage + 1)
  }

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PrevButton
            onClick={handlePrevClick}
            href={`/moments?page=${currentPage - 1}`}
            disabled={isPreviousDisabled}
          />
        </PaginationItem>

        {/* First Page */}
        {showFirstPage && <PageLink page={1} onNavigate={handleNavigation} />}

        {/* Start Ellipsis */}
        {showStartEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Page Numbers */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <PageLink
            key={page}
            page={page}
            isActive={page === currentPage}
            onNavigate={handleNavigation}
          />
        ))}

        {/* End Ellipsis */}
        {showEndEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last Page */}
        {showLastPage && <PageLink page={totalPages} onNavigate={handleNavigation} />}

        {/* Next Button */}
        <PaginationItem>
          <NextButton
            onClick={handleNextClick}
            href={`/moments?page=${currentPage + 1}`}
            disabled={isNextDisabled}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
