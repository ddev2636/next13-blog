import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    const { creator } = prompt;
    const made = await User.findById(creator);

    if (!made) return new Response("Creator Not Found", { status: 404 });

    return new Response(JSON.stringify(made), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
