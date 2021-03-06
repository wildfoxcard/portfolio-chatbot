interface ParamObject {
  userId: string;
}

export async function generateToken({ userId }: ParamObject): Promise<void> {
  console.log('CHANNELSECRETKEY', process.env.CHANNEL_SECRET)
  //   try {
  const response = await fetch(
    "https://directline.botframework.com/v3/directline/tokens/generate",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CHANNEL_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          id: `dl_${userId}`,
          name: "user",
        },
      }),
    }
  );

  return {
    ...(await response.json()),
    userId,
  };
  // const data = await response.json();

  // data.userId = id;

  // res.json({
  //   success: true,
  //   data
  // });
  //   } catch (e) {
  //     res.status(500).json({ message: e.message });
  //   }
}

export default {
  generateToken
};
