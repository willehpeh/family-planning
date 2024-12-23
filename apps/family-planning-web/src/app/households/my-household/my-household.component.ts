import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScaffoldingComponent } from '../../layout/scaffolding/scaffolding.component';

@Component({
  selector: "app-my-household",
  standalone: true,
  imports: [CommonModule, ScaffoldingComponent],
  templateUrl: "./my-household.component.html",
  styleUrl: "./my-household.component.scss",
})
export class MyHouseholdComponent {}
