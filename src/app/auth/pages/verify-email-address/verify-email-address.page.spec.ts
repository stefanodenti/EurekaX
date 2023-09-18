import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyEmailAddressPage } from './verify-email-address.page';

describe('VerifyEmailAddressPage', () => {
  let component: VerifyEmailAddressPage;
  let fixture: ComponentFixture<VerifyEmailAddressPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerifyEmailAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
