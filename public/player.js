"use strict";
const main = async () => {
  const playButton = document.getElementById("play");
  const media = document.querySelector("audio");

  ////////////FETCH tracks
  const tracks = await fetch(`/playlist-tracks`)
    .then((res) => res.json())
    .catch((err) => err);

  ///////////FETCH playlists
  const playlists = await fetch(`/playlist`)
    .then((res) => res.json())
    .catch((err) => err);

  ///////////////////CHANGING TITLE OF CURRENT SONG PLAYING
  const currentSong = (title, author) => {
    const titleElement = document.querySelector(".currentSongTitle");
    titleElement.innerText = title;

    const authorElement = document.querySelector(".currentSongAuthor");
    authorElement.innerText = author;
  };
  media.src = tracks[0].path;
  currentSong(tracks[0].title, tracks[0].artist);

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
    song.setAttribute("tracks-path", path);

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
      const filteredSongs = tracks.filter(
        (song) => song.playlist_id == playlistId
      );
      filteredSongs.forEach((song) => {
        const songElement = createASong(song.title, song.path, song.duration);
        //CREATING SONG PLAYING FUNCTIONALITY
        songElement.addEventListener("click", (e) => {
          e.preventDefault();
          currentSong(song.title, song.artist);
          media.src = songElement.tracksset.path;
          playButton.classList.remove("active");
        });
      });
    }
    if (playlistId == 2) {
      tracks.forEach((song) => {
        const songElement = createASong(song.title, song.path, song.duration);
        //CREATING SONG PLAYING FUNCTIONALITY
        songElement.addEventListener("click", (e) => {
          e.preventDefault();
          currentSong(song.title, song.artist);
          media.src = songElement.tracksset.path;
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
    playlist.setAttribute("tracks-id", id);
    playlistsWrapper.appendChild(playlist);

    /////////////////DELETE PLAYLIST FUNCTIONALITY
    if (system_rank !== 1) {
      const removeTrack = document.createElement("a");
      removeTrack.href = "#";
      removeTrack.className = "removeIcon";
      playlist.appendChild(removeTrack);
      removeTrack.addEventListener("click", (e) => {
        console.log(removeTrack.parentElement.tracksset.id);
      });
    }
    return playlist;
  };

  const getPlaylistHandler = async () => {
    playlists.forEach((playlist) => {
      const playlistElement = createAPlaylist(
        playlist.playlist,
        playlist.id,
        playlist.system_rank
      );
      playlistElement.addEventListener("click", (e) => {
        e.preventDefault();
        loopSongs(playlistElement.tracksset.id);
      });
    });
  };
  getPlaylistHandler();

  /////////////////////////CREATE PLAYLIST FUNCTIONALITY
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
