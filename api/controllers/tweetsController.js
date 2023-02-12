const db = require("../utils/db");

exports.getTweetsController = async (req, res) => {
  const data = await db
    .collection("tweets")
    .aggregate([
      {
        $lookup: {
          foreignField: "_id",
          localField: "owner",
          from: "users",
          as: "owner_user",
        },
      },
      {
        $sort: { order: -1 },
      },
      {
        $limit: 20,
      },
    ])
    .toArray();

  res.status(200).send(data);
};
