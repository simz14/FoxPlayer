"use strict";
//loadstart, play, ended, progress
const playButton = document.getElementById("play");
const media = document.querySelector("audio");
const controlButtons = document.getElementsByClassName("controler");
const pauseButton = document.getElementById("pause");
playButton.addEventListener("click", (e) => {
  if (!media.paused) {
    media.pause();
  } else {
    media.play();
    controlButtons.classList = "active";
  }
});

media.addEventListener("ended", (e) => {
  console.log("ended");
});

media.addEventListener("loadstart", (e) => {
  console.log("loadstart");
});

media.addEventListener("play", (e) => {
  console.log("play");
});
