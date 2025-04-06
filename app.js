console.log("Welcome");

let songIndex = 0;
let audioelement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songitem')); 

let song = [
    {songName: "NCS-1", filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName: "NCS-2", filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName: "NCS-3", filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName: "NCS-4", filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName: "NCS-5", filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName: "NCS-6", filePath:"songs/6.mp3", coverPath:"covers/6.jpg"},
    {songName: "NCS-7", filePath:"songs/7.mp3", coverPath:"covers/7.jpg"},
    {songName: "NCS-8", filePath:"songs/8.mp3", coverPath:"covers/8.jpg"},
    {songName: "Big Dawg", filePath:"songs/9.mp3", coverPath:"covers/9.jpg"},
    {songName: "Timeless", filePath:"songs/10.mp3", coverPath:"covers/10.jpg"},
    {songName: "Jo tum mere ho", filePath:"songs/11.mp3", coverPath:"covers/11.jpg"}

]

songItem.forEach((element , i) => {
    element.getElementsByTagName('img')[0].src = song[i].coverPath;
    element.getElementsByClassName('songname')[0].innerText = song[i].songName;
});

const makeAllPlay = () =>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}


Array.from(document.getElementsByClassName('songitemplay')).forEach((element) =>{
    element.addEventListener('click', (e)=> {
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioelement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = song[songIndex].songName;
        audioelement.currentTime = 0;
        audioelement.play();
    })
});

masterplay.addEventListener('click', () =>{
    if(audioelement.paused || audioelement.currentTime<=0)
    {
        audioelement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioelement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

audioelement.addEventListener('timeupdate', () => {
    console.log('timeupdate');

    let progress = parseInt((audioelement.currentTime/audioelement.duration) * 100);
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change', ()=>{
    audioelement.currentTime = myprogressbar.value * audioelement.duration / 100;
})

document.getElementById('next').addEventListener('click',() =>{
    if(songIndex>=10){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioelement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = song[songIndex].songName;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-circle-pause');
    masterplay.classList.add('fa-circle-play');
})
document.getElementById('previous').addEventListener('click',() =>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioelement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = song[songIndex].songName;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-circle-pause');
    masterplay.classList.add('fa-circle-play');
})