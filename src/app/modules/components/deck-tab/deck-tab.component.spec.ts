import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckTabComponent } from './deck-tab.component';

describe('DeckTabComponent', () => {
  let component: DeckTabComponent;
  let fixture: ComponentFixture<DeckTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeckTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
