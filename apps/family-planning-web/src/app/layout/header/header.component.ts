import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  title = input<string>();
}
