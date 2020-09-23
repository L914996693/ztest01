import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserlistComponent } from './userlist.component';

describe('UserlistComponent', () => {
  let component: UserlistComponent;
  let fixture: ComponentFixture<UserlistComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
