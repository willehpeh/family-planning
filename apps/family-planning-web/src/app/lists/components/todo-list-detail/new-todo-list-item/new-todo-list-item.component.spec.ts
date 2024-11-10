import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NewTodoListItemComponent } from "./new-todo-list-item.component";

describe("NewTodoListItemComponent", () => {
  let component: NewTodoListItemComponent;
  let fixture: ComponentFixture<NewTodoListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTodoListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTodoListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
