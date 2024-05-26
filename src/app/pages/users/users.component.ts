import { Component } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: any[] = [];
  successMessage: string = '';  

  constructor(private audioService: AudioService){}

  ngOnInit(): void {
    this.audioService.getAllUsers().then((data) => {
      this.users = data.users;
    });
  }

  deleteUser(id: number): void {
    this.audioService.deleteUserById(id).then(() => {
      this.users = this.users.filter((user) => user.id !== id);
      this.successMessage = 'User deleted successfully';
    });
  }
}
