import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenumComponent } from './menum.component';

describe('MenumComponent', () => {
  let component: MenumComponent;
  let fixture: ComponentFixture<MenumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
