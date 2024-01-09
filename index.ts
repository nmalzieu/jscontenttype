import { Client } from "@xmtp/xmtp-js";
import { Wallet } from "ethers";
import nanoid from "nanoid";
import {
  ContentTypeMultiplyNumberCodec,
  ContentTypeMultiplyNumbers,
} from "./codec";

const go = async () => {
  const signer1 = new Wallet(
    "0x8f85c84d86b067bfcae63f2d2557b0fe35a5cfe68da793c908207a5f971011da"
  ); // address 0x1F9aa90E8634Ad363831E33759A091b2CA0D69E1
  const signer2 = new Wallet(
    "0x30138ae740a78d13cb2b1bda894671024492f5bf8a3a650d4247508ee6346bb5"
  ); // address 0x25fb715F87E9c6a9999dB167Ee782BA7214F4Fb5

  const client1 = await Client.create(signer1, {
    env: "dev",
  });
  client1.registerCodec(new ContentTypeMultiplyNumberCodec());

  const client2 = await Client.create(signer2, {
    env: "dev",
  });
  client2.registerCodec(new ContentTypeMultiplyNumberCodec());

  const conversationId = nanoid.nanoid();

  const conversation1to2 = await client1.conversations.newConversation(
    "0x25fb715F87E9c6a9999dB167Ee782BA7214F4Fb5",
    { conversationId, metadata: {} }
  );

  const numbersToMultiply = { a: 3, b: 7 };

  await conversation1to2.send(numbersToMultiply as any, {
    contentType: ContentTypeMultiplyNumbers,
  });

  const conversation2to1 = await client2.conversations.newConversation(
    "0x1F9aa90E8634Ad363831E33759A091b2CA0D69E1",
    { conversationId, metadata: {} }
  );

  const messages = await conversation2to1.messages();
  console.log("Got back message of type", messages[0].contentType.toString(), "with content", messages[0].content);
};

go();
