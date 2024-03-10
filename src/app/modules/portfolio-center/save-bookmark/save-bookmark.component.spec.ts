import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveBookmarkComponent } from './save-bookmark.component';

describe('SaveBookmarkComponent', () => {
  let component: SaveBookmarkComponent;
  let fixture: ComponentFixture<SaveBookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveBookmarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
