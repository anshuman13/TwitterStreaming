import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetcardComponent } from './tweetcard.component';

describe('TweetcardComponent', () => {
  let component: TweetcardComponent;
  let fixture: ComponentFixture<TweetcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
