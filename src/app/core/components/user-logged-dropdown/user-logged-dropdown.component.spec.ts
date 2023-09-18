import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoggedDropdownComponent } from './user-logged-dropdown.component';

describe('UserLoggedDropdownComponent', () => {
  let component: UserLoggedDropdownComponent;
  let fixture: ComponentFixture<UserLoggedDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLoggedDropdownComponent]
    });
    fixture = TestBed.createComponent(UserLoggedDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
