"use strict";

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

media.addEventListener("play", (e) => {
  console.log("play");
});
