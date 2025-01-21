import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';

@Component({
    imports: [RouterModule, ToolbarComponent],
    selector: 'app-root',
    template: `
		<app-toolbar/>
		<router-outlet/>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
