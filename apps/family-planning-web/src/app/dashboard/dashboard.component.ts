import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { HeaderComponent } from '../layout/header/header.component';

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, CardsContainerComponent, HeaderComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {}
