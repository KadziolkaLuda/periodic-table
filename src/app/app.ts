import { Component } from '@angular/core';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { PeriodicTableComponent } from './features/periodic-table/periodic-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, PeriodicTableComponent],
  templateUrl: './app.html'
})
export class App {
  protected title = 'Periodic table';
}
