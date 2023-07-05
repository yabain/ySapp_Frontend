import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GroupsDeleteComponent } from './groups-delete.component';

describe('GroupsDeleteComponent', () => {
  let component: GroupsDeleteComponent;
  let fixture: ComponentFixture<GroupsDeleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsDeleteComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
