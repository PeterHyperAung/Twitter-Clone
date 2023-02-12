const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = "A super duper huge secret!";
const db = require("../utils/db");

exports.getUsersController = async (req, res) => {
  const users = await db.collection("users").find().toArray();
  res.json(users);
};

exports.updateUserController = async (req, res) => {
  const { id } = req.params;
  const { name, profile, password } = req.body;

  if (!name) {
    return res.status(400).json({ msg: "name required" });
  }

  const data = {};
  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }

  data.name = name;
  data.profile = profile;

  const result = await db.collection("users").updateOne(
    { _id: ObjectId(id) },
    {
      $set: data,
    }
  );

  console.log(result);

  if (result.modifiedCount) {
    const user = await db.collection("users").findOne({ _id: ObjectId(id) });
    return res.status(200).json(user);
  }

  res.status(500);
};

exports.userLoginController = async (req, res) => {
  const { handle, password } = req.body;

  console.log(handle, password);
  if (!handle || !password)
    return res.status(401).json({ msg: "handle or password missing" });

  const user = await db.collection("users").findOne({ handle });
  if (user) {
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      const token = jwt.sign(user, secret);
      console.log(token);
      return res.status(200).json(token);
    }
  }

  res.status(401).json({ msg: "handle or password incorrect" });
};

exports.userRegisterController = async (req, res) => {
  const { name, handle, password, profile } = req.body;

  if (!name || !handle || !password || !profile) {
    return res
      .status(400)
      .json({ msg: "name, handle, password and profile required" });
  }

  const hash = await bcrypt.hash(password, 10);
  const result = await db.collection("users").insertOne({
    name,
    handle,
    password: hash,
    profile,
  });

  if (result.insertedId) {
    const user = await db.collection("users").findOne({
      _id: ObjectId(result.insertedId),
    });

    return res.json(user);
  }

  res.status(500).json({ msg: "something is wrong" });
};
