import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { PeriodicElement } from '../../shared/models/periodic-element.interface';
import { PeriodicTableStore } from '../../shared/stores/periodic-table.store';
import { ElementFormDialogComponent } from './element-form-dialog/element-form-dialog.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss']
})
export class PeriodicTableComponent implements OnInit {
  private store = inject(PeriodicTableStore);
  private dialog = inject(MatDialog);
  private filterSubject = new Subject<string>();

  // Signals from store
  readonly elements = this.store.filteredElements;
  readonly isLoading = this.store.isLoading;

  // Table configuration
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];

  ngOnInit() {
    // Load data on component init
    this.store.loadElements();

    // Setup filter with debounce
    this.filterSubject
      .pipe(
        debounceTime(2000), // 2 seconds delay
        distinctUntilChanged()
      )
      .subscribe(filterValue => {
        this.store.updateFilter(filterValue);
      });
  }

  onFilterChange(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterValue);
  }

  editElement(element: PeriodicElement) {
    const dialogRef = this.dialog.open(ElementFormDialogComponent, {
      data: { 
        ...element, 
        isEdit: true,
        originalPosition: element.position,
        existingElements: this.elements()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.updateElement(result, element.position);
      }
    });
  }

  addNewElement() {
    const newElement: Partial<PeriodicElement> = {
      position: 0,
      name: '',
      weight: 0,
      symbol: ''
    };

    const dialogRef = this.dialog.open(ElementFormDialogComponent, {
      data: { 
        ...newElement, 
        isEdit: false,
        existingElements: this.elements()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.addElement(result);
      }
    });
  }
} 