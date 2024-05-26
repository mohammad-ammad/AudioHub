import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AudioService } from '../../services/audio.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;


  constructor(private fb: FormBuilder, private audioService: AudioService, private router: Router){
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.audioService.registerAudio(this.registerForm.value).then((response) => {
        this.errorMessage = null;
        this.registerForm.reset();
        this.router.navigate(['/login']);
      }).catch((error) => {
        this.errorMessage = error.message;
      });
    }
  }

}
