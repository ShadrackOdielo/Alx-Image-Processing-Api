import sharp from "sharp";
import fs from "fs";
import resizeAndSaveImage from "../resizer";

describe("resizeAndSaveImage", (): void => {
  beforeEach((): void => {
    spyOn(fs, "existsSync").and.callFake((path): boolean => {
      return path === "assets/images/full/existing-image.jpg";
    });
    spyOn(fs, "writeFileSync");
    spyOn(sharp.prototype, "resize").and.callFake((): { toBuffer: () => string; } => {
      return { toBuffer: (): string => "resized-image-buffer" };
    });
  });

  it("should return an error if the image does not exist", async (): Promise<void> => {
    const result = await resizeAndSaveImage("non-existent-image.jpg", 100, 100);
    expect(result).toEqual({ error: "image not found" });
  });

  it("should resize and save the image iin the thumb folder", async (): Promise<void> => {
    const result = await resizeAndSaveImage(
      "assets/images/full/existing-image.jpg",
      100,
      100
    );
    expect(result).toEqual({
      image: "assets/images/thumb/100x100_existing-image.jpg",
    });
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "assets/images/thumb/100x100_existing-image.jpg",
      "resized-image-buffer"
    );
    expect(sharp.prototype.resize).toHaveBeenCalledWith(100, 100);
  });
});
