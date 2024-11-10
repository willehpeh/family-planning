import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TodoListsListComponent } from "./todo-lists-list.component";

describe("TodoListsListComponent", () => {
  let component: TodoListsListComponent;
  let fixture: ComponentFixture<TodoListsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
