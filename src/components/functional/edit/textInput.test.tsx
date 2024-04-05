import { render, screen, fireEvent } from "@testing-library/react";
import TextInput from "./textInput";
import { fileType } from "@/types/fileType";
import "@testing-library/jest-dom";

describe("TextInput component", () => {
  const mockSetFileContent = jest.fn();
  const mockField = {
    id: "test-id",
    en: "Hello",
    ja: "こんにちは",
  };
  const mockFileContent: fileType = {
    mode: "phrases",
    content: [mockField],
  };

  test("renders the text input field with correct placeholder and default value", () => {
    render(
      <TextInput
        mode={mockFileContent.mode}
        field={mockField}
        index={0}
        fileContent={mockFileContent}
        setFileContent={mockSetFileContent}
        readOnly={false}
        lang="en"
      />
    );

    const input = screen.getByPlaceholderText("英文を入力");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("Hello");
  });

  test("updates the file content when the input value changes", () => {
    render(
      <TextInput
        mode={mockFileContent.mode}
        field={mockField}
        index={0}
        fileContent={mockFileContent}
        setFileContent={mockSetFileContent}
        readOnly={false}
        lang="en"
      />
    );

    const input = screen.getByPlaceholderText("英文を入力");
    fireEvent.change(input, { target: { value: "New value" } });

    expect(mockSetFileContent).toHaveBeenCalledWith({
      ...mockFileContent,
      content: [{ ...mockField, en: "New value" }],
    });
  });

  test("renders the read-only text when in read-only mode", () => {
    render(
      <TextInput
        mode={mockFileContent.mode}
        field={mockField}
        index={0}
        fileContent={mockFileContent}
        setFileContent={mockSetFileContent}
        readOnly={true}
        lang="en"
      />
    );

    const readOnlyText = screen.getByText("Hello", {
      selector: "p[lang='en']",
    });
    expect(readOnlyText).toBeInTheDocument();
  });
});
