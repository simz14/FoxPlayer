"use strict";
const main = async () => {
  const playButton = document.getElementById("play");
  const media = document.querySelector("audio");
  const fakeSongsFetch = () => {
    const fakePromise = new Promise((res, rej) => {
      res([
        {
          id: 1,
          playlist_id: 3,
          title: "Spirirt Blossom",
          artist: "RomanBelov",
          duration: 1.48,
          path: "music/spirit-blossom-15285.mp3",
        },
        {
          id: 2,
          playlist_id: 3,
          title: "WatR-Fluid",
          artist: "ItsWatR",
          duration: 2.13,
          path: "music/watr-fluid-10149.mp3",
        },
        {
          id: 3,
          playlist_id: 3,
          title: "The Weekend ",
          artist: "Chillmore",
          duration: 2.25,
          path: "music/the-weekend-117427.mp3",
        },
        {
          id: 4,
          playlist_id: 3,
          title: "Sunset Vibes",
          artist: "Undefined",
          duration: 2.28,
          path: "music/sunset-vibes-lo-fichillhop-9503.mp3",
        },
        {
          id: 5,
          playlist_id: 3,
          title: "bathroom-chill",
          artist: "Chillmore",
          duration: 4.0,
          path: "music/bathroom-chill-background-music-14977.mp3",
        },
        {
          id: 6,
          playlist_id: 3,
          title: "The Weekend ",
          artist: "Chillmore",
          duration: 2.25,
          path: "music/the-weekend-117427.mp3",
        },
        {
          id: 7,
          playlist_id: 3,
          title: "Spirirt Blossom",
          artist: "RomanBelov",
          duration: 1.48,
          path: "music/spirit-blossom-15285.mp3",
        },
        {
          id: 8,
          playlist_id: 3,
          title: "Sunset Vibes",
          artist: "Undefined",
          duration: 2.28,
          path: "music/sunset-vibes-lo-fichillhop-9503.mp3",
        },
        {
          id: 9,
          playlist_id: 3,
          title: "Sunset Vibes",
          artist: "Undefined",
          duration: 2.28,
          path: "music/sunset-vibes-lo-fichillhop-9503.mp3",
        },
        {
          id: 10,
          playlist_id: 3,
          title: "bathroom-chill",
          artist: "Chillmore",
          duration: 4.0,
          path: "music/bathroom-chill-background-music-14977.mp3",
        },
        {
          id: 11,
          playlist_id: 3,
          title: "The Weekend ",
          artist: "Chillmore",
          duration: 2.25,
          path: "music/the-weekend-117427.mp3",
        },
        {
          id: 12,
          playlist_id: 4,
          title: "Sweet love",
          artist: "Day Fox",
          duration: 3.13,
          path: "music/sweet-love-121561.mp3",
        },
        {
          id: 13,
          playlist_id: 4,
          title: "Goat",
          artist: "Prazkhanal",
          duration: 2.18,
          path: "music/goat-20930.mp3",
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
        {
          id: 4,
          playlist: "Upbeat",
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

  ///////////////////CHANGING TITLE OF CURRENT SONG PLAYING
  const currentSong = (title, author) => {
    const titleElement = document.querySelector(".currentSongTitle");
    titleElement.innerText = title;

    const authorElement = document.querySelector(".currentSongAuthor");
    authorElement.innerText = author;
  };
  media.src = data[0].path;
  currentSong(data[0].title, data[0].artist);
  ///////////////////////////ADD SONG TO PLAYLIST BUTTON
  document.querySelector(".controlButtonsAdd").innerHTML +=
    "<a class=addToPlaylist href=#></a>";
  document.querySelector(".controlButtonsAdd").innerHTML +=
    "<a class=addToFavourites href=#></a>";
  const addTrackToPlaylistBtn = document.querySelector(".addToPlaylist");
  addTrackToPlaylistBtn.addEventListener("click", (e) => {});
  const addTrackToFavBtn = document.querySelector(".addToFavourites");
  addTrackToFavBtn.addEventListener("click", (e) => {});

  ///////////////////////////////CREATING HTML FOR SONGS LIST
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

  //////////////////////CREATING ELEMENTS SONGS BY PLAYLIST ID
  const loopSongs = async (playlistId = 2) => {
    songsWrapper.innerHTML = "";

    if (playlistId !== 2) {
      const filteredSongs = data.filter(
        (song) => song.playlist_id == playlistId
      );
      filteredSongs.forEach((song) => {
        const songElement = createASong(song.title, song.path, song.duration);
        //CREATING SONG PLAYING FUNCTIONALITY
        songElement.addEventListener("click", (e) => {
          e.preventDefault();
          currentSong(song.title, song.artist);
          media.src = songElement.dataset.path;
          playButton.classList.remove("active");
        });
      });
    }
    if (playlistId == 2) {
      data.forEach((song) => {
        const songElement = createASong(song.title, song.path, song.duration);
        //CREATING SONG PLAYING FUNCTIONALITY
        songElement.addEventListener("click", (e) => {
          e.preventDefault();
          currentSong(song.title, song.artist);
          media.src = songElement.dataset.path;
          playButton.classList.remove("active");
        });
      });
    }
  };
  loopSongs();

  /////////////////////////////////////CREATING HTML FOR PLAYLISTS
  const playlistsWrapper = document.querySelector(".allPlaylists");
  const createAPlaylist = (title, id, system_rank) => {
    const playlist = document.createElement("li");
    playlist.innerText = title;
    playlist.className = "playlist";
    playlist.setAttribute("data-id", id);
    playlistsWrapper.appendChild(playlist);

    /////////////////DELETE PLAYLIST FUNCTIONALITY
    if (system_rank !== 1) {
      const removeTrack = document.createElement("a");
      removeTrack.href = "#";
      removeTrack.className = "removeIcon";
      playlist.appendChild(removeTrack);
      removeTrack.addEventListener("click", (e) => {
        console.log(removeTrack.parentElement.dataset.id);
      });
    }
    return playlist;
  };

  const getPlaylistHandler = async () => {
    const playlists = await fakePlaylistsFetch()
      .then((res) => res)
      .catch((err) => err);

    playlists.forEach((playlist) => {
      const playlistElement = createAPlaylist(
        playlist.playlist,
        playlist.id,
        playlist.system_rank
      );
      playlistElement.addEventListener("click", (e) => {
        e.preventDefault();
        loopSongs(playlistElement.dataset.id);
      });
    });
  };
  getPlaylistHandler();

  /////////////////////////CREATE PLAYLIST
  document.querySelector(".addPlaylist").innerHTML += "<a href=#></a>";
  const addPlaylistBtn = document.querySelector(".addPlaylist>a");
  addPlaylistBtn.addEventListener("click", (e) => {
    document.querySelector("#modalAddPlaylist").style.display = "flex";
  });

  ///////////////////////GET INPUT TO CREATE PLAYLIST
  const submitPlaylistBtn = document.querySelector("#addPlaylistBtn");
  submitPlaylistBtn.addEventListener("click", (e) => {
    console.log(document.getElementById("pname").value);
    document.querySelector("#modalAddPlaylist").style.display = "none";
  });

  //loadstart, play, ended, progress
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
