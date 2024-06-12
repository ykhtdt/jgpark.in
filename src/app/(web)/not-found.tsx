export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center">
      <section className="flex flex-col gap-4">
        <h1 className="text-center">
          <span className="text-3xl font-bold">
            페이지를 찾을 수 없습니다.
          </span>
          <span className="block text-[0]">
            <span className="mt-8 w-16 h-1 max-w-full inline-flex bg-gradient-to-r from-[#4A91E2] to-[#FFC857]" />
          </span>
        </h1>
        <p className="text-muted-foreground font-normal text-center text-sm">
          찾으려는 페이지의 주소가 잘못 입력되었거나,
          <br />
          주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.
          <br />
          입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.
        </p>
      </section>
    </section>
  )
}