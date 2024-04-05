import { renderHook, act } from "@testing-library/react-hooks";
import { useFileInfo } from "./useFileInfo";
import { getFileInfo, updateFileInfo } from ".";

jest.mock(".", () => ({
  getFileInfo: jest.fn(),
  updateFileInfo: jest.fn(),
}));

describe("useFileInfo", () => {
  const token = "test-token";
  const fileId = "test-file-id";

  beforeEach(() => {
    (getFileInfo as jest.Mock).mockClear();
    (updateFileInfo as jest.Mock).mockClear();
  });

  test("should set initial state correctly", async () => {
    (getFileInfo as jest.Mock).mockResolvedValueOnce({ name: "test-file" });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFileInfo(token, fileId)
    );

    expect(result.current.title).toBe("");
    expect(result.current.loading).toBe(true);
    expect(result.current.saving).toBe(false);
    expect(result.current.saved).toBe(false);

    await waitForNextUpdate();

    expect(result.current.title).toBe("test-file");
    expect(result.current.loading).toBe(false);
    expect(result.current.saving).toBe(false);
    expect(result.current.saved).toBe(true);
  });

  test("should update title and save file info", async () => {
    (getFileInfo as jest.Mock).mockResolvedValueOnce({ name: "test-file" });
    (updateFileInfo as jest.Mock).mockResolvedValueOnce({});

    const { result, waitForNextUpdate } = renderHook(() =>
      useFileInfo(token, fileId)
    );

    await waitForNextUpdate();

    act(() => {
      result.current.setTitle("new-title");
    });

    expect(result.current.title).toBe("new-title");
    expect(result.current.saved).toBe(false);

    await act(async () => {
      await result.current.saveFileInfo();
    });

    expect(updateFileInfo).toHaveBeenCalledWith(token, fileId, {
      name: "new-title",
    });
    expect(result.current.saving).toBe(false);
    expect(result.current.saved).toBe(true);
  });
  
});
