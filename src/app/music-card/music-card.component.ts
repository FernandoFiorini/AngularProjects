import { Component, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.scss']
})

export class MusicCardComponent implements OnInit {

  @ViewChild('seekbar') progressBar: any;

  musicPlaying = false;
  currentMusic = '';
  currentPosition = 0;
  musicList = [
    '../../assets/MusicCard/music/music1.mp3',
    '../../assets/MusicCard/music/music2.mp3',
    '../../assets/MusicCard/music/music3.mp3',
    '../../assets/MusicCard/music/music4.mp3']


  ngOnInit(): void {
    this.currentMusic = this.musicList[this.currentPosition];

    // this.progressBar.nativeElement.addEventListener("timeupdate", (time: any) => {
    //   this.atualizarProgresso();
    // });


    this.timeUpdateRegister();

  }

  timeUpdateRegister() {

    var player: any = <HTMLVideoElement>document.getElementById('player');
    player.addEventListener("timeupdate", function () {

      var progressBar: any = <HTMLVideoElement>document.getElementById('seekbar');
      var tempo: any = <HTMLVideoElement>document.getElementById('tempo');

      var currentTime = player.currentTime;
      var duration = player.duration;
      progressBar.value = player.currentTime / player.duration;



    });
  }

  formatTime(tempo: any) {
    const seconds = tempo.toFixed(0);

    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
      .filter(a => a)
      .join(':')
  }


  playMusic() {
    const me = this;
    const player = <HTMLVideoElement>document.getElementById('player');
    const tempo = <HTMLVideoElement>document.getElementById('tempo');

    player.volume = 0.2;


    tempo.innerHTML = this.formatTime(player.duration)


    if (me.musicPlaying) {
      me.musicPlaying = false;
      player.pause();
    } else {
      me.musicPlaying = true;
      player.play();
    }

  }

  previousMusic() {
   
    this.currentPosition--;
    this.currentMusic = this.musicList[this.currentPosition]
    this.timeUpdateRegister();
  }

  nextMusic() {

    this.currentPosition--;
    this.currentMusic = this.musicList[this.currentPosition]
    this.timeUpdateRegister();
  }

  atualizarProgresso() {
    const progressBar = <HTMLVideoElement>document.getElementById('seekbar');


  }
}
