import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AudioService } from '../../services/audio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.css'
})
export class AudioComponent {
  audioForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private audioService: AudioService) {
    this.audioForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required],
      album: ['', Validators.required],
      duration: ['', Validators.required],
      audioFile: [null, Validators.required],
      imageFile: [null, Validators.required]
    });
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    this.audioForm.patchValue({
      [controlName]: file
    });
  }

  onSubmit() {
    if (this.audioForm.valid) {
      const formData = new FormData();
      formData.append('name', this.audioForm.get('title')?.value);
      formData.append('description', this.audioForm.get('description')?.value);
      formData.append('audio_file', this.audioForm.get('audioFile')?.value);
      formData.append('genre', this.audioForm.get('genre')?.value);
      formData.append('album', this.audioForm.get('album')?.value);
      formData.append('duration', this.audioForm.get('duration')?.value);
      formData.append('image', this.audioForm.get('imageFile')?.value);
      formData.append('user_id', '1');

      this.audioService.uploadAudio(formData).then((response) => {
        console.log(response);
        this.successMessage = 'Audio uploaded successfully';
        this.errorMessage = null;
        this.audioForm.reset();
      }).catch((error) => {
        console.log(error);
        this.errorMessage = error.message;
      });
    }
  }
}
