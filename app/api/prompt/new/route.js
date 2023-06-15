import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export const POST = async (req, res) => {
  const { userId, prompt, tag, image } = await req.json();
  console.log(userId, prompt, tag, image);
  try {
    await connectToDB(); //lambda function ,It dies when its job is done once
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag: tag,
      image: image,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    return new Response("Failed to create a new prompt", {
      status: 500,
    });
  }
};
