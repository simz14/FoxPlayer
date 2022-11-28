"use strict";
const fakeSongsFetch = () => {
  const fakePromise = new Promise((res, rej) => {
    res([
      {
        id: 1,
        playlist_id: 2,
        title: "Spirirt Blossom",
        artist: "RomanBelov",
        duration: 1.48,
        path: "public/music/spirit-blossom-15285.mp3",
      },
      {
        id: 2,
        playlist_id: 2,
        title: "WatR-Fluid",
        artist: "ItsWatR",
        duration: 2.13,
        path: "public/music/watr-fluid-10149.mp3",
      },
      {
        id: 3,
        playlist_id: 2,
        title: "Chillmore",
        artist: "The Weekend",
        duration: 2.25,
        path: "public/music/he-weekend-117427.mp3",
      },
      {
        id: 4,
        playlist_id: 2,
        title: "Sunset Vibes",
        artist: "Undefined",
        duration: 2.28,
        path: "public/music/sunset-vibes-lo-fichillhop-9503.mp3",
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

//CREATING HTML FOR DONGS LIST
const songsWrapper = document.querySelector(".songsWrapper");

const createLi = (title) => {
  const song = document.createElement("a");
  song.innerText = title;
  song.className = "song";
  songsWrapper.appendChild(song);
};
const getSongsHandler = async () => {
  const songs = await fakeFetch()
    .then((res) => res)
    .catch((err) => err);

  songs.forEach((song) => {
    createLi(song.title);
  });
  songs.forEach((song) => {
    createLi(song.title);
  });
  songs.forEach((song) => {
    createLi(song.title);
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
