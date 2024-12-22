import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ScaffoldingComponent } from "./scaffolding.component";

describe("HeaderComponent", () => {
  let component: ScaffoldingComponent;
  let fixture: ComponentFixture<ScaffoldingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScaffoldingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScaffoldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
