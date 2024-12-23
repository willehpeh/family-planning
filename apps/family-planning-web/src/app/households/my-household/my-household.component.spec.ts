import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MyHouseholdComponent } from "./my-household.component";

describe("MyHouseholdComponent", () => {
  let component: MyHouseholdComponent;
  let fixture: ComponentFixture<MyHouseholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyHouseholdComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyHouseholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
