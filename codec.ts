import { ContentTypeId } from "@xmtp/xmtp-js";

// Create a unique identifier for your content type
export const ContentTypeMultiplyNumbers = new ContentTypeId({
  authorityId: "your.domain",
  typeId: "multiply-number",
  versionMajor: 1,
  versionMinor: 0,
});

// Define the MultiplyCodec class
export class ContentTypeMultiplyNumberCodec {
  get contentType() {
    return ContentTypeMultiplyNumbers;
  }

  // The encode method accepts an object with two numbers (a, b) and encodes it as a byte array
  encode({ a, b }: any) {
    console.log("encoding a - ", a, "- b - ", b);
    return {
      type: ContentTypeMultiplyNumbers,
      parameters: {},
      content: new TextEncoder().encode(JSON.stringify({ a, b })),
    };
  }

  // The decode method decodes the byte array, parses the string into numbers (a, b), and returns their product
  decode(content: { content: any }) {
    const uint8Array = content.content;
    const { a, b } = JSON.parse(new TextDecoder().decode(uint8Array));
    console.log("decoding content : a - ", a, " - b - ", b);
    return a * b;
  }

  fallback(content: number): string | undefined {
    return "A number was sent.";
  }
}
