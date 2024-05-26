import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioListingComponent } from './audio-listing.component';

describe('AudioListingComponent', () => {
  let component: AudioListingComponent;
  let fixture: ComponentFixture<AudioListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AudioListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
