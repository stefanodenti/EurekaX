import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManagerComponent } from './users-manager.component';

describe('UsersManagerComponent', () => {
  let component: UsersManagerComponent;
  let fixture: ComponentFixture<UsersManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersManagerComponent]
    });
    fixture = TestBed.createComponent(UsersManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
