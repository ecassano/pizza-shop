import { render } from "@testing-library/react"
import userEvent, { UserEvent } from "@testing-library/user-event";
import Pagination from "./pagination"

const onPageChangeCallback = vi.fn();

const onPageChange = (pageNumber: Number) => {
  onPageChangeCallback(pageNumber);
}

describe("Pagination", () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear();
  })

  it("Should display the right amount of pages and results", () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => { }}
      />
    )

    expect(wrapper.getByText("Página 1 de 20")).toBeInTheDocument()
    expect(wrapper.getByText("Total de 200 item(s)")).toBeInTheDocument()
  })

  it("It should be able to navigate to the next page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChange}
      />
    )

    const nextPageButton = wrapper.getByRole("button", {
      name: "Próxima página"
    })

    const user = userEvent.setup();

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(1);
  })

  it("It should be able to navigate to the previous page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChange}
      />
    )

    const nextPageButton = wrapper.getByRole("button", {
      name: "Página anterior"
    })

    const user = userEvent.setup();

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(4);
  })

  it("It should be able to navigate to the first page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChange}
      />
    )

    const nextPageButton = wrapper.getByRole("button", {
      name: "Primeira página"
    })

    const user = userEvent.setup();

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(0);
  })

  it("It should be able to navigate to the last page", async () => {
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChange}
      />
    )

    const nextPageButton = wrapper.getByRole("button", {
      name: "Última página"
    })

    const user = userEvent.setup();

    await user.click(nextPageButton);

    expect(onPageChangeCallback).toHaveBeenCalledWith(19);
  })
})