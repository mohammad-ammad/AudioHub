import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AudioService {

  private baseUrl = 'http://127.0.0.1:8000/api';
  
  async getAudios(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/all/audios`);
    return response.json();
  }

  async registerAudio(data: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return response.json();
  }

  async loginAudio(data: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
  }

  async uploadAudio(data: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/audio-upload-path`, {
      method: 'POST',
      body: data
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Upload failed');
    }

    return response.json();
  }

  async deleteAudiobyFileName(fileName: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/audio/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ audio_file_name: fileName })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Delete failed');
    }

    return response.json();
  }

  async getAllUsers(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/users`);
    return response.json();
  }

  async deleteUserById(userId: number): Promise<any> {
    const response = await fetch(`${this.baseUrl}/user/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Delete failed');
    }

    return response.json();
  }
}
