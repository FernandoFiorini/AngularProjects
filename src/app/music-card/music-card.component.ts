import { Component, OnInit, ViewChild } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';



@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.scss']
})

export class MusicCardComponent implements OnInit {

  @ViewChild('seekbar') progressBar: any;
  @ViewChild('player') musicPlayer: any;

  repeatMusic = false;
  randomMusic = false;
  musicPlaying = false;

  currentMusic: any;
  currentPosition = 0;

  musicList = [
    {
      name: 'Lofi Study',
      artist: 'FASSounds',
      music: '../../assets/MusicCard/music/lofiStudy.mp3',
      image: '../../assets/MusicCard/FASSSounds.jpg'
    }, {
      name: 'Spirit Blossom',
      artist: 'RomanBelov',
      music: '../../assets/MusicCard/music/spiritBlossom.mp3',
      image: '../../assets/MusicCard/music.jpg'
    }, {
      name: 'Once In Paris',
      artist: 'Pumpupthemind',
      music: '../../assets/MusicCard/music/onceInParis.mp3',
      image: './../assets/MusicCard/onceInParis.jpg'
    }, {
      name: 'Good Night',
      artist: 'FASSounds',
      music: '../../assets/MusicCard/music/goodNight.mp3',
      image: './../assets/MusicCard/FASSSounds.jpg'
    }]


  ngOnInit(): void {
    this.currentMusic = this.musicList[this.currentPosition];

    this.initialMusicTime();
  }

  initialMusicTime() {
    this.atualizarProgresso();
  }

  changeProgress(event: any) {

    let me = this;

    var player = me.musicPlayer.nativeElement;

    var progress = me.progressBar.nativeElement;

    var pos = event.pageX - progress.offsetLeft;
    var percent = pos / progress.clientWidth;

    player.currentTime = percent * player.duration;
    progress.value = percent / 100;
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
    const player = me.musicPlayer.nativeElement;

    player.volume = 0.2;

    if (me.musicPlaying) {
      me.musicPlaying = false;
      player.pause();
    } else {
      me.musicPlaying = true;
      player.play();
    }

  }

  previousMusic() {

    if (this.currentPosition > 0 && this.currentPosition <= this.musicList.length) {
      this.currentPosition--;
      this.currentMusic = this.musicList[this.currentPosition]
      this.musicPlaying = false;
    }

  }

  nextMusic() {

    if (this.currentPosition <= this.musicList.length) {
      this.currentPosition++;
      this.currentMusic = this.musicList[this.currentPosition];
      this.musicPlaying = false;
    }

  }

  atualizarProgresso() {
    const me: any = this;

    var player = me.musicPlayer.nativeElement;
    var progress = me.progressBar.nativeElement;
    var tempo: any = <HTMLVideoElement>document.getElementById('tempo');

    var currentTime = player.currentTime;
    var duration = player.duration;


    progress.value = currentTime / duration;

    let tempoAtual = me.formatTime(currentTime);
    let tempoTotal = me.formatTime(duration);

    if (currentTime == "0:00") {
      tempo.innerHTML = "0:00" + "/" + tempoTotal;
    } else {

      tempo.innerHTML = tempoAtual + "/" + tempoTotal;
    }


  }

  repeat() {
    this.repeatMusic = !this.repeatMusic;
  }

  random() {
    this.randomMusic = !this.randomMusic;
  }
}
