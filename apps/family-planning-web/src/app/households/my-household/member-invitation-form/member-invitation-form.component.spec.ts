import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MemberInvitationFormComponent } from "./member-invitation-form.component";

describe("MemberInvitationFormComponent", () => {
  let component: MemberInvitationFormComponent;
  let fixture: ComponentFixture<MemberInvitationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberInvitationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MemberInvitationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
