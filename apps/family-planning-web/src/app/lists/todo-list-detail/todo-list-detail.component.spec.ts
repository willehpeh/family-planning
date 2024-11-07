import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TodoListDetailComponent } from "./todo-list-detail.component";

describe("TodoListDetailComponent", () => {
  let component: TodoListDetailComponent;
  let fixture: ComponentFixture<TodoListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
