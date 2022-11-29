"use strict";
const main = async () => {
  const toPlay = document.querySelector("audio");
  const fakeSongsFetch = () => {
    const fakePromise = new Promise((res, rej) => {
      res([
        {
          id: 1,
          playlist_id: 2,
          title: "Spirirt Blossom",
          artist: "RomanBelov",
          duration: 1.48,
          path: "music/spirit-blossom-15285.mp3",
        },
        {
          id: 2,
          playlist_id: 2,
          title: "WatR-Fluid",
          artist: "ItsWatR",
          duration: 2.13,
          path: "music/watr-fluid-10149.mp3",
        },
        {
          id: 3,
          playlist_id: 2,
          title: "Chillmore",
          artist: "The Weekend",
          duration: 2.25,
          path: "music/the-weekend-117427.mp3",
        },
        {
          id: 4,
          playlist_id: 2,
          title: "Sunset Vibes",
          artist: "Undefined",
          duration: 2.28,
          path: "music/sunset-vibes-lo-fichillhop-9503.mp3",
        },
      ]);
      rej("Database error");
    });
    return fakePromise;
  };

  const fakePlaylistsFetch = () => {
    const fakePromise = new Promise((res, rej) => {
      res([
        {
          id: 1,
          playlist: "Favourite",
          system_rank: 1,
        },
        {
          id: 2,
          playlist: "All tracks",
          system_rank: 1,
        },
        {
          id: 3,
          playlist: "Lofi",
          system_rank: 0,
        },
      ]);
      rej("Database error");
    });
    return fakePromise;
  };

  const data = await fakeSongsFetch()
    .then((res) => res)
    .catch((err) => err);

  //CREATING HTML FOR SONGS LIST
  const songsWrapper = document.querySelector(".songsWrapper");
  const createASong = (title, path, duration) => {
    const song = document.createElement("li");
    song.className = "song";
    song.setAttribute("data-path", path);

    const songTitle = document.createElement("div");
    songTitle.className = "songTitle";
    songTitle.innerText = title;
    song.appendChild(songTitle);

    const time = document.createElement("span");
    time.className = "time";
    time.innerText = duration;
    song.appendChild(time);
    songsWrapper.appendChild(song);
    return song;
  };

  //CREATING ELEMENTS SONGS BY PLAYLIST ID
  const loopSongs = async (playlistId = 2) => {
    if (songsWrapper) {
      songsWrapper.innerHTML = "";
    }
    const filteredSongs = data.filter((song) => song.playlist_id == playlistId);

    filteredSongs.forEach((song) => {
      const songElement = createASong(song.title, song.path, song.duration);
      console.log("After create");

      //CREATING SONG PLAYING FUNCTIONALITY
      songElement.addEventListener("click", (e) => {
        e.preventDefault();
        toPlay.src = songElement.dataset.path;
      });
    });
  };

  loopSongs();

  //CREATING HTML FOR PLAYLISTS
  const playlistsWrapper = document.querySelector(".allPlaylists");
  const createAPlaylist = (title, id) => {
    const playlist = document.createElement("li");
    playlist.innerText = title;
    playlist.className = "playlist";
    playlist.setAttribute("data-id", id);
    playlistsWrapper.appendChild(playlist);
    return playlist;
  };

  const getPlaylistHandler = async () => {
    const playlists = await fakePlaylistsFetch()
      .then((res) => res)
      .catch((err) => err);

    playlists.forEach((playlist) => {
      const playlistElement = createAPlaylist(playlist.playlist, playlist.id);
      playlistElement.addEventListener("click", (e) => {
        e.preventDefault();
        loopSongs(playlistElement.dataset.id);
        console.log(playlistElement.dataset.id);
      });
    });
  };
  getPlaylistHandler();

  //loadstart, play, ended, progress
  const playButton = document.getElementById("play");
  const media = document.querySelector("audio");
  playButton.addEventListener("click", function () {
    if (!media.paused) {
      media.pause();
      this.classList.remove("active");
    } else {
      media.play();
      this.classList.add("active");
    }
  });

  media.addEventListener("ended", (e) => {
    console.log("ended");
  });

  media.addEventListener("loadstart", (e) => {
    console.log("loadstart");
  });
  media.addEventListener("progress", (e) => {
    console.log("progress");
  });

  media.addEventListener("play", (e) => {
    console.log("play");
  });
};
document.addEventListener("DOMContentLoaded", main);
