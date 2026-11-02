const bytesFromBase64 = (base64: string): Uint8Array => {
  const binary = atob(base64.replace(/[^A-Za-z0-9+/=]/g, ""));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
};

const base64FromBytes = (bytes: Uint8Array): string => {
  const chunks: string[] = [];
  const chunkSize = 0x8000;

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    chunks.push(
      String.fromCharCode(...bytes.subarray(offset, offset + chunkSize)),
    );
  }

  return btoa(chunks.join(""));
};

const transformBytes = async (
  bytes: Uint8Array,
  transform: CompressionStream | DecompressionStream,
): Promise<Uint8Array> => {
  const input = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(input).set(bytes);
  const stream = new Blob([input]).stream().pipeThrough(transform);
  const buffer = await new Response(stream).arrayBuffer();
  return new Uint8Array(buffer);
};

const unescapeJsonString = (escaped: string): string =>
  JSON.parse(escaped) as string;

export const saveToJson = async (save: string): Promise<string> => {
  const compressed = bytesFromBase64(save);
  const unescaped = await transformBytes(
    compressed,
    new DecompressionStream("gzip"),
  );
  const escaped = new TextDecoder().decode(unescaped);

  return unescapeJsonString(escaped).replace(/^"|"$/g, "");
};

export const jsonToSave = async (json: unknown): Promise<string> => {
  const jsonString = JSON.stringify(json);
  if (jsonString === undefined) {
    throw new TypeError("Save data must be JSON-serializable.");
  }

  const escaped = JSON.stringify(jsonString);
  const compressed = await transformBytes(
    new TextEncoder().encode(escaped),
    new CompressionStream("gzip"),
  );

  return base64FromBytes(compressed);
};
