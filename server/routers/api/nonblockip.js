const { kv } = require("@vercel/kv");

module.exports = async (req, res) => {
  try {
    const data = await kv.get("nonblock:songs");
    const lastBuild = await kv.get("nonblock:lastBuild");

    return res.json({
      msg: "Success",
      lastBuild,
      total: data?.length || 0,
      data: data || [],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
