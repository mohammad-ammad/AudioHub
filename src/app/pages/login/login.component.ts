import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AudioService } from '../../services/audio.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;


  constructor(private fb: FormBuilder, private audioService: AudioService, private router: Router, private authService: AuthService){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.audioService.loginAudio(this.loginForm.value).then((response) => {
        console.log(response);
        this.errorMessage = null;
        this.loginForm.reset();
        this.authService.setToken(response.message);
        if(response.message == "1|1"){
          this.authService.setRole("admin")
        }else{
          this.authService.setRole("user")
        }
        this.router.navigate(['/dashboard']);
      }).catch((error) => {
        this.errorMessage = error.message;
      });
    }
  }
}
