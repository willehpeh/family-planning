import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';

@Component({
    selector: "app-side-menu-item",
    imports: [CommonModule, FaIconComponent],
    templateUrl: "./side-menu-item.component.html",
    styleUrl: "./side-menu-item.component.scss"
})
export class SideMenuItemComponent {
  label = input.required<string>();
  iconDefinition = input<IconDefinition>();
}
