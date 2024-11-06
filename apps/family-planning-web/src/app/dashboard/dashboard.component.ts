import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardsContainerComponent } from './cards-container/cards-container.component';

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, CardsContainerComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {}
