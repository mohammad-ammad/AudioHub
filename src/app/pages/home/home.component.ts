import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements OnInit {
  cards: any[] = [];
  currentAudio: HTMLAudioElement | null = null;
  currentAudioUrl: string | null = null;

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.getAudios().then((data) => {
      this.cards = data.audios.map((item : any) => ({
        ...item,
        audioUrl: `http://127.0.0.1:8000/audio/${item.audio_file}`
      }));
    });
  }

  toggleAudio(url: string): void {
    if (this.currentAudio && this.currentAudioUrl === url) {
      this.currentAudio.pause();
      this.currentAudio = null;
      this.currentAudioUrl = null;
    } else {
      if (this.currentAudio) {
        this.currentAudio.pause();
      }
      this.currentAudio = new Audio(url);
      this.currentAudio.play();
      this.currentAudioUrl = url;
    }
  }
}
