import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetsHomeComponent } from './tweetshome.component';

describe('TweetshomeComponent', () => {
  let component: TweetsHomeComponent;
  let fixture: ComponentFixture<TweetsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
