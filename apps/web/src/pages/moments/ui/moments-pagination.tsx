import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@workspace/ui/components/pagination"

interface MomentsPaginationProps {
  totalPages: number
  currentPage: number
}

export const MomentsPagination = ({
  totalPages,
  currentPage,
}: MomentsPaginationProps) => {
  const maxDisplayedPages = 5
  const startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2))
  const endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1)

  const showFirstPage = currentPage > 3
  const showStartEllipsis = currentPage > 4

  const showEndEllipsis = endPage < totalPages - 1
  const showLastPage = endPage < totalPages

  const isPreviousDisabled = currentPage <= 1
  const isNextDisabled = currentPage >= totalPages

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          {isPreviousDisabled ? (
            <PaginationPrevious className="pointer-events-none opacity-50" aria-disabled="true" />
          ) : (
            <PaginationPrevious href={`/moments?page=${currentPage - 1}`} />
          )}
        </PaginationItem>

        {/* First Page */}
        {showFirstPage && (
          <PaginationItem>
            <PaginationLink href="/moments?page=1">
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Start Ellipsis */}
        {showStartEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Page Numbers */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href={`/moments?page=${page}`} isActive={page === currentPage}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* End Ellipsis */}
        {showEndEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last Page */}
        {showLastPage && (
          <PaginationItem>
            <PaginationLink href={`/moments?page=${totalPages}`}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          {isNextDisabled ? (
            <PaginationNext className="pointer-events-none opacity-50" aria-disabled="true" />
          ) : (
            <PaginationNext href={`/moments?page=${currentPage + 1}`} />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
