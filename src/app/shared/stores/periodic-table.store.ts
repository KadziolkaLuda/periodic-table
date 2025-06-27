import { Injectable, computed, signal } from '@angular/core';
import { PeriodicElement } from '../models/periodic-element.interface';
import { ELEMENT_DATA } from '../data/element-data';

export interface PeriodicTableState {
  elements: PeriodicElement[];
  filteredElements: PeriodicElement[];
  filterValue: string;
  isLoading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PeriodicTableStore {
  // State signals
  private readonly _elements = signal<PeriodicElement[]>([]);
  private readonly _filterValue = signal<string>('');
  private readonly _isLoading = signal<boolean>(false);

  // Computed signals
  readonly elements = this._elements.asReadonly();
  readonly filterValue = this._filterValue.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  readonly filteredElements = computed(() => {
    const elements = this._elements();
    const filterValue = this._filterValue().toLowerCase().trim();
    
    if (!filterValue) {
      return elements;
    }

    return elements.filter(element => 
      element.position.toString().includes(filterValue) ||
      element.name.toLowerCase().includes(filterValue) ||
      element.weight.toString().includes(filterValue) ||
      element.symbol.toLowerCase().includes(filterValue)
    );
  });

  // Actions
  loadElements() {
    this._isLoading.set(true);
    
    // Simulate API call
    setTimeout(() => {
      this._elements.set([...ELEMENT_DATA]);
      this._isLoading.set(false);
    }, 1000);
  }

  updateFilter(filterValue: string) {
    this._filterValue.set(filterValue);
  }

  updateElement(updatedElement: PeriodicElement, originalPosition: number) {
    const elements = this._elements();
    const index = elements.findIndex(el => el.position === originalPosition);
    
    if (index !== -1) {
      const newElements = [...elements];
      newElements[index] = updatedElement;
      this._elements.set(newElements);
    }
  }

  addElement(newElement: PeriodicElement) {
    const elements = this._elements();
    const newElements = [...elements, newElement];
    this._elements.set(newElements);
  }
} 