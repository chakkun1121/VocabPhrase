import { render, screen, fireEvent } from "@testing-library/react";
import ImportForm from "./ImportForm";
import { fileType } from "@/types/fileType";
import "@testing-library/jest-dom";
import { delay } from "@/lib/delay";

describe("ImportForm component", () => {
  const setFileContent = jest.fn();
  const setTitle = jest.fn();

  beforeEach(() => {
    render(<ImportForm setFileContent={setFileContent} setTitle={setTitle} />);
  });

  test("renders the 'インポート' button", () => {
    const importButton = screen.getByText("インポート");
    expect(importButton).toBeInTheDocument();
  });

  test("opens the dialog when 'インポート' button is clicked", () => {
    const importButton = screen.getByText("インポート");
    fireEvent.click(importButton);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
  });

  // test("closes the dialog when 'キャンセル' button is clicked", async () => {
  //   const importButton = screen.getByText("インポート");
  //   fireEvent.click(importButton);
  //   await delay(1000);
  //   const cancelButton = screen.getByText("キャンセル");
  //   fireEvent.click(cancelButton);

  //   const dialog = screen.queryByRole("dialog");
  //   expect(dialog).toBeNull();
  // });

  // test("calls setFileContent and setTitle when 'インポート' button is clicked with valid form content", () => {
  //   const importButton = screen.getByText("インポート");
  //   fireEvent.click(importButton);

  //   const textarea = screen.getByRole("textbox");
  //   fireEvent.change(textarea, { target: { value: "Hello,こんにちは" } });

  //   const importButtonInDialog = screen.getByText("インポート", {
  //     selector: "button.flex-1",
  //   });
  //   fireEvent.click(importButtonInDialog);

  //   expect(setFileContent).toHaveBeenCalledWith({
  //     content: [{ id: expect.any(String), en: "Hello", ja: "こんにちは" }],
  //   });
  //   expect(setTitle).toHaveBeenCalled();
  // });

  test("does not call setFileContent and setTitle when 'インポート' button is clicked with empty form content", () => {
    const importButton = screen.getByText("インポート");
    fireEvent.click(importButton);

    const importButtonInDialog = screen.getByText("インポート", {
      selector: "button.flex-1",
    });
    fireEvent.click(importButtonInDialog);

    expect(setFileContent).not.toHaveBeenCalled();
    expect(setTitle).not.toHaveBeenCalled();
  });

  // Add more tests for other functionality if needed
});
