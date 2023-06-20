import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PresetMsgComponent } from './preset-msg.component';


describe('PresetMsgComponent', () => {
  let component: PresetMsgComponent;
  let fixture: ComponentFixture<PresetMsgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PresetMsgComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresetMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
