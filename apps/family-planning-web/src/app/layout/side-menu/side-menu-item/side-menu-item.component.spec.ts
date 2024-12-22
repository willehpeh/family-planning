import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SideMenuItemComponent } from "./side-menu-item.component";

describe("SideMenuItemComponent", () => {
  let component: SideMenuItemComponent;
  let fixture: ComponentFixture<SideMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SideMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
