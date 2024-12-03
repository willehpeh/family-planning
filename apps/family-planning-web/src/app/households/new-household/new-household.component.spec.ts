import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NewHouseholdComponent } from "./new-household.component";

describe("NewHouseholdComponent", () => {
  let component: NewHouseholdComponent;
  let fixture: ComponentFixture<NewHouseholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewHouseholdComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewHouseholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
