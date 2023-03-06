import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChatComponent } from './pie-chat.component';

describe('PieChatComponent', () => {
  let component: PieChatComponent;
  let fixture: ComponentFixture<PieChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
