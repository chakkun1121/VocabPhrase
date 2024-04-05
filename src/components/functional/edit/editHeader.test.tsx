import { render, screen, fireEvent } from "@testing-library/react";
import EditHeader from "./editHeader";
import { fileType } from "@/types/fileType";
import "@testing-library/jest-dom";
const mockedUseRouter = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => mockedUseRouter(),
  usePathname: jest.fn().mockReturnValue("/some-route"),
}));
describe("EditHeader component", () => {
  const fileId = "test-file-id";
  const fileContent: fileType = {
    mode: null,
    content: [
      { id: "1", en: "Hello", ja: "こんにちは" },
      { id: "2", en: "Goodbye", ja: "さようなら" },
    ],
  };
  const setFileContent = jest.fn();
  const saving = false;
  const saveFileContent = jest.fn();
  const saveFileInfo = jest.fn();
  const readOnly = false;

  test("renders the '追加' button when not in read-only mode", () => {
    render(
      <EditHeader
        fileId={fileId}
        fileContent={fileContent}
        setFileContent={setFileContent}
        saving={saving}
        saveFileContent={saveFileContent}
        saveFileInfo={saveFileInfo}
        readOnly={readOnly}
        token="test-token"
      />
    );

    const addButton = screen.getByText("追加");
    expect(addButton).toBeInTheDocument();
  });

  test("does not render the '追加' button when in read-only mode", () => {
    render(
      <EditHeader
        fileId={fileId}
        fileContent={fileContent}
        setFileContent={setFileContent}
        saving={saving}
        saveFileContent={saveFileContent}
        saveFileInfo={saveFileInfo}
        readOnly={true}
        token="test-token"
      />
    );

    const addButton = screen.queryByText("追加");
    expect(addButton).toBeNull();
  });

  test("calls setFileContent with updated file content when '追加' button is clicked", () => {
    render(
      <EditHeader
        fileId={fileId}
        fileContent={fileContent}
        setFileContent={setFileContent}
        saving={saving}
        saveFileContent={saveFileContent}
        saveFileInfo={saveFileInfo}
        readOnly={readOnly}
        token="test-token"
      />
    );

    const addButton = screen.getByText("追加");
    fireEvent.click(addButton);

    expect(setFileContent).toHaveBeenCalledWith({
      ...fileContent,
      content: [
        ...fileContent.content,
        { id: expect.any(String), en: "", ja: "" },
      ],
    });
  });

  test("calls saveFileContent and saveFileInfo when '保存' button is clicked", () => {
    render(
      <EditHeader
        fileId={fileId}
        fileContent={fileContent}
        setFileContent={setFileContent}
        saving={saving}
        saveFileContent={saveFileContent}
        saveFileInfo={saveFileInfo}
        readOnly={readOnly}
        token="test-token"
      />
    );

    const saveButton = screen.getByText("保存");
    fireEvent.click(saveButton);

    expect(saveFileContent).toHaveBeenCalled();
    expect(saveFileInfo).toHaveBeenCalled();
  });

  // Add more tests for other functionality if needed
});
