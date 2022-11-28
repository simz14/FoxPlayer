"use strict";
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
        playlist: "favourite",
        system_rank: 1,
      },
      {
        id: 2,
        playlist: "lofi",
        system_rank: 0,
      },
    ]);
    rej("Database error");
  });
  return fakePromise;
};
//CREATING HTML FOR PLAYLISTS
const playlistsWrapper = document.querySelector(".allPlaylists");
const createAPlaylist = (title) => {
  const playlist = document.createElement("li");
  playlist.innerText = title;
  playlist.className = "playlist";
  playlistsWrapper.appendChild(playlist);
};
const getPlaylistHandler = async () => {
  const playlists = await fakePlaylistsFetch()
    .then((res) => res)
    .catch((err) => err);

  playlists.forEach((playlist) => {
    createAPlaylist(playlist.playlist);
  });
};
getPlaylistHandler();

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
const getSongsHandler = async () => {
  const songs = await fakeSongsFetch()
    .then((res) => res)
    .catch((err) => err);

  songs.forEach((song) => {
    const songElement = createASong(song.title, song.path, song.duration);
    //CREATING SONG PLAYING FUNCTIONALITY
    console.log(songElement);
    songElement.addEventListener("click", (e) => {
      e.preventDefault();
      toPlay.src = songElement.dataset.path;
    });
  });
};
getSongsHandler();

//loadstart, play, ended, progress
const playButton = document.getElementById("play");
const media = document.querySelector("audio");
const controlButtons = document.getElementsByClassName("controler");
const pauseButton = document.getElementById("pause");
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
