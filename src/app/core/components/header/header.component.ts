import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatToolbarModule, MatIconModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  protected headerTitle = 'Recruitment Task';
  protected headerDescription = 'Junior Angular Developer';
  protected headerLink = 'https://github.com/KadziolkaLuda/periodic-table';
  protected headerLinkText = 'GitHub';
}
