import { Injectable } from '@angular/core';
import Recorder from 'recorder-js';
// @ts-ignore
import { Mp3Encoder } from 'lamejs';

@Injectable({
  providedIn: 'root'
})
export class RecorderService {
  private recorder: Recorder;
  private audioContext: AudioContext;

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.recorder = new Recorder(this.audioContext, {
      onAnalysed: () => {
        // Optional: analyze data for visualization
      }
    });
  }

  async startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.recorder.init(stream);
    this.recorder.start();
  }

  async stopRecording(): Promise<Blob> {
    const { buffer } = await this.recorder.stop();
    // @ts-ignore
    const mp3Blob = this.encodeMp3(buffer[0]);
    return mp3Blob;
  }

  private encodeMp3(buffer: Float32Array): Blob {
    const sampleRate = this.audioContext.sampleRate;
    const encoder = new Mp3Encoder(1, sampleRate, 128);
    // @ts-ignore
    const samples = this.convertFloat32ToInt16(buffer);
    const mp3Data = [];
    const sampleBlockSize = 1152;

    for (let i = 0; i < samples.length; i += sampleBlockSize) {
      const sampleChunk = samples.subarray(i, i + sampleBlockSize);
      const mp3buf = encoder.encodeBuffer(sampleChunk);
      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }
    }
    const mp3buf = encoder.flush();
    if (mp3buf.length > 0) {
      mp3Data.push(mp3buf);
    }

    return new Blob(mp3Data, { type: 'audio/mp3' });
  }

  private convertFloat32ToInt16(buffer: Float32Array): Int16Array {
    const l = buffer.length;
    const buf = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      buf[i] = Math.min(1, buffer[i]) * 0x7FFF;
    }
    return buf;
  }

  
}
