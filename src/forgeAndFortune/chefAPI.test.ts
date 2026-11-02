import { describe, expect, it } from "vitest";
import { jsonToSave, saveToJson } from "./chefAPI";

const saveData = {
  message: "Quotes: \"double\" and 'single'.",
  path: "folder\\file",
  lines: "first\nsecond",
  unicode: "café 雪",
};

const gzipBase64 = async (text: string): Promise<string> => {
  const stream = new Blob([text])
    .stream()
    .pipeThrough(new CompressionStream("gzip"));
  const bytes = new Uint8Array(await new Response(stream).arrayBuffer());
  let binary = "";

  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }

  return btoa(binary);
};

const gunzipBase64 = async (save: string): Promise<string> => {
  const binary = atob(save);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  const stream = new Blob([buffer])
    .stream()
    .pipeThrough(new DecompressionStream("gzip"));

  return new TextDecoder().decode(await new Response(stream).arrayBuffer());
};

describe("save codec", () => {
  it("decodes existing Base64 gzip saves with escaped JSON", async () => {
    const json = JSON.stringify(saveData);
    const escapedJson = JSON.stringify(json);
    const legacySave = await gzipBase64(escapedJson);

    await expect(saveToJson(legacySave)).resolves.toBe(json);
    await expect(saveToJson(` \n${legacySave}!`)).resolves.toBe(json);
  });

  it("encodes JSON as escaped gzip data in Base64", async () => {
    const save = await jsonToSave(saveData);
    const decoded = await gunzipBase64(save);
    const expectedJson = JSON.stringify(saveData);

    expect(decoded).toBe(JSON.stringify(expectedJson));
    await expect(saveToJson(save)).resolves.toBe(expectedJson);
  });

  it("rejects values that cannot be serialized as JSON", async () => {
    await expect(jsonToSave(undefined)).rejects.toThrow(
      "Save data must be JSON-serializable.",
    );
  });
});
