import { renderHook } from "@testing-library/react-hooks";
import { useFilePermission } from "./useFilePermission";
import { getFilePermission } from ".";

jest.mock(".", () => ({
  getFilePermission: jest.fn(),
}));

describe("useFilePermission", () => {
  const token = "test-token";
  const fileId = "test-file-id";

  beforeEach(() => {
    (getFilePermission as jest.Mock).mockClear();
  });

  test("should set readOnly to true when permission error occurs", async () => {
    (getFilePermission as jest.Mock).mockResolvedValueOnce({
      error: { message: "Permission error" },
    });

    const { result } = renderHook(() => useFilePermission(token, fileId));

    expect(result.current.readOnly).toBe(true);

    expect(getFilePermission).toHaveBeenCalledWith(token, fileId);
    expect(result.current.readOnly).toBe(true);
  });

  test("should set readOnly to false when permission is granted", async () => {
    (getFilePermission as jest.Mock).mockResolvedValueOnce({});

    const { result, waitForNextUpdate } = renderHook(() =>
      useFilePermission(token, fileId)
    );

    expect(result.current.readOnly).toBe(true);

    await waitForNextUpdate();

    expect(getFilePermission).toHaveBeenCalledWith(token, fileId);
    expect(result.current.readOnly).toBe(false);
  });
});
