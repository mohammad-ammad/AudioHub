import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements OnInit {
  cards: any[] = [];
  filteredCards: any[] = [];
  currentAudio: HTMLAudioElement | null = null;
  currentAudioUrl: string | null = null;

  genreFilter: string = '';
  albumFilter: string = '';
  durationFilter: string = '';

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.getAudios().then((data) => {
      console.log(data);
      this.cards = data.audios.map((item : any) => ({
        ...item,
        audioUrl: `http://127.0.0.1:8000/audio/${item.audio_file}`,
        image: item.image !== null ? `http://127.0.0.1:8000/images/${item.image}` : '/assets/bili.jpeg',
      }));
      this.filteredCards = this.cards;
    });
  }

  applyFilters(): void {
    this.filteredCards = this.cards.filter((item) => {
      let result = true;
      if (this.genreFilter !== '') {
        result = result && item.genre === this.genreFilter;
      }
      if (this.albumFilter !== '') {
        result = result && item.album === this.albumFilter;
      }
      if (this.durationFilter !== '') {
        result = result && item.duration === this.durationFilter;
      }
      return result;
    });
  }

  resetFilters(): void {
    this.genreFilter = '';
    this.albumFilter = '';
    this.durationFilter = '';
    this.filteredCards = this.cards;
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
