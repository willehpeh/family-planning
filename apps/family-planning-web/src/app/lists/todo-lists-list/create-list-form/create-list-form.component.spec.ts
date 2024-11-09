import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CreateListFormComponent } from "./create-list-form.component";

describe("CreateListFormComponent", () => {
  let component: CreateListFormComponent;
  let fixture: ComponentFixture<CreateListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateListFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
