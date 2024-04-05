import { render, screen, fireEvent } from "@testing-library/react";
import EditTitle from "./editTitle";
import "@testing-library/jest-dom";
import { delay } from "@/lib/delay";

describe("EditTitle component", () => {
  const mockSetTitle = jest.fn();
  const mockSetFileContent = jest.fn();

  beforeEach(() => {
    render(
      <EditTitle
        title="Test Title"
        setTitle={mockSetTitle}
        readOnly={false}
        fileContent={{ mode: "words", content: [] }}
        setFileContent={mockSetFileContent}
      />
    );
  });

  test("renders the input field with correct initial value", () => {
    const inputField =
      screen.getByPlaceholderText("ファイル名を入力してください");
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue("Test Title");
  });

  test("calls setTitle when input value changes", () => {
    const inputField =
      screen.getByPlaceholderText("ファイル名を入力してください");
    fireEvent.change(inputField, { target: { value: "New Title" } });

    expect(mockSetTitle).toHaveBeenCalledWith("New Title");
  });

  test("renders the select field with correct initial value", () => {
    const selectField = screen.getByText("単語");
    expect(selectField).toBeInTheDocument();
  });

  // test("calls setFileContent when select value changes", async () => {
  //   const selectField = screen.getByText("単語");
  //   fireEvent.click(selectField);
  //   await delay(1000);
  //   const sentenceSelector = screen.getByText("文章");
  //   expect(sentenceSelector).toBeInTheDocument();
  //   fireEvent.click(sentenceSelector);
  //   expect(mockSetFileContent).toHaveBeenCalledWith({
  //     mode: "phrases",
  //   });
  // });

  // Add more tests for other functionality if needed
});
