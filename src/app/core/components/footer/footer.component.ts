import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  protected footerLink = 'http://linkedin.com/in/liudmyla-kadziolka/';
  protected footerLinkText = 'Liudmyla Kadziolka';

  protected footerYear = new Date().getFullYear();
}
