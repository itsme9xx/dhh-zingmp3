const { ZingMp3 } = require("zingmp3-api-full");

class ZingController {
  getSong(req, res) {
    ZingMp3.getSong(req.query.id).then((data) => {
      res.json(data);
    });
  }

  getDetailPlaylist(req, res) {
    ZingMp3.getDetailPlaylist(req.query.id).then((data) => {
      res.json(data);
    });
  }

  getHome(req, res) {
    ZingMp3.getHome().then((data) => {
      res.json(data);
    });
  }

  getTop100(req, res) {
    ZingMp3.getTop100().then((data) => {
      res.json(data);
    });
  }

  getChartHome(req, res) {
    ZingMp3.getChartHome().then((data) => {
      res.json(data);
    });
  }

  getNewReleaseChart(req, res) {
    ZingMp3.getNewReleaseChart().then((data) => {
      res.json(data);
    });
  }

  getInfo(req, res) {
    ZingMp3.getInfoSong(req.query.id).then((data) => {
      res.json(data);
    });
  }

  getArtist(req, res) {
    ZingMp3.getArtist(req.query.name).then((data) => {
      res.json(data);
    });
  }

  getArtistSong(req, res) {
    ZingMp3.getListArtistSong(
      req.query.id,
      req.query.page,
      req.query.count
    ).then((data) => {
      res.json(data);
    });
  }

  getLyric(req, res) {
    ZingMp3.getLyric(req.query.id).then((data) => {
      res.json(data);
    });
  }

  search(req, res) {
    ZingMp3.search(req.query.keyword).then((data) => {
      res.json(data);
    });
  }

  getListMV(req, res) {
    ZingMp3.getListMV(req.query.id, req.query.page, req.query.count).then(
      (data) => {
        res.json(data);
      }
    );
  }

  getCategoryMV(req, res) {
    ZingMp3.getCategoryMV(req.query.id).then((data) => {
      res.json(data);
    });
  }

  getVideo(req, res) {
    ZingMp3.getVideo(req.query.id).then((data) => {
      res.json(data);
    });
  }

  getNonblockip = async (req, res) => {
    try {
      const top = await ZingMp3.getTop100();
      const playlists = Object.values(top?.data || {}).flat();

      let allSongs = [];

      for (const playlist of playlists[1].items) {
        console.log("playlist", playlist);
        const detail = await ZingMp3.getDetailPlaylist(playlist.encodeId);
        const songs = detail?.data?.song?.items || [];
        for (const song of songs) {
          allSongs.push(song);

          if (allSongs.length >= 15) break;
        }

        if (allSongs.length >= 15) break;
      }
      allSongs = allSongs.slice(0, 15);
      const results = await Promise.allSettled(
        allSongs.map((song) => ZingMp3.getSong(song.encodeId))
      );

      const validSongs = results
        .map((result, index) => {
          console.log("result", result);
          if (
            result.status === "fulfilled" &&
            result.value?.msg === "Success"
          ) {
            return {
              id: allSongs[index].encodeId,
              title: allSongs[index].title,
              artists: allSongs[index].artistsNames,
              thumbnail: allSongs[index].thumbnail,
              link128: result.value?.data?.[128],
            };
          }
          return null;
        })
        .filter(Boolean);

      return res.json({
        msg: "Success",
        total: validSongs.length,
        data: validSongs,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Failed" });
    }
  };
}

module.exports = new ZingController();
