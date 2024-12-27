import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CommandCentreComponent } from "./command-centre.component";

describe("CommandCentreComponent", () => {
  let component: CommandCentreComponent;
  let fixture: ComponentFixture<CommandCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandCentreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
