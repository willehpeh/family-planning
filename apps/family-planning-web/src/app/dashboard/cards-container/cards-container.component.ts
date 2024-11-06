import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardComponent } from '../../ui-elements/card/card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: "app-cards-container",
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    FontAwesomeModule
  ],
  templateUrl: "./cards-container.component.html",
  styleUrl: "./cards-container.component.scss",
})
export class CardsContainerComponent {
  faListCheck = faListCheck;

  constructor(private router: Router) {}

  onChooseLists() {
    this.router.navigate(['/lists/todo']);
  }
}
