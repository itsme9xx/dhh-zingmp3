const { kv } = require("@vercel/kv");

module.exports = async (req, res) => {
  try {
    const top = await ZingMp3.getTop100();
    const playlists = Object.values(top?.data || {}).flat();

    let allSongs = [];

    for (const playlist of playlists[1].items) {
      const detail = await ZingMp3.getDetailPlaylist(playlist.encodeId);
      const songs = detail?.data?.song?.items || [];

      for (const song of songs) {
        allSongs.push(song);
        if (allSongs.length >= 20) break;
      }

      if (allSongs.length >= 20) break;
    }

    const results = await Promise.allSettled(
      allSongs.map((song) => ZingMp3.getSong(song.encodeId))
    );

    const validSongs = results
      .filter((r) => r.status === "fulfilled" && r.value?.err === 0)
      .map((r, index) => ({
        id: allSongs[index].encodeId,
        title: allSongs[index].title,
        artists: allSongs[index].artistsNames,
        link128: r.value.data?.[128],
      }));

    await kv.set("nonblock:songs", validSongs);
    await kv.set("nonblock:lastBuild", new Date().toISOString());

    return res.json({
      msg: "Build success",
      total: validSongs.length,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
