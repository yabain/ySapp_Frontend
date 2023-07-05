import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComposeGroupComponent } from './compose.group.component';

describe('ComposeGroupComponent', () => {
  let component: ComposeGroupComponent;
  let fixture: ComponentFixture<ComposeGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ComposeGroupComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
