import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui-elements/button/button.component';
import { ScaffoldingComponent } from '../layout/scaffolding/scaffolding.component';
import { Router } from '@angular/router';

@Component({
  selector: "app-disclaimer",
  standalone: true,
  imports: [CommonModule, ButtonComponent, ScaffoldingComponent],
  templateUrl: "./disclaimer.component.html",
  styleUrl: "./disclaimer.component.scss",
})
export class DisclaimerComponent {

  private router = inject(Router);

  onAcceptDisclaimer() {
    this.router.navigate(['dashboard']);
  }
}
