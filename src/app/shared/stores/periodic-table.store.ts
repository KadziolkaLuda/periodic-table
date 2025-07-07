import { Injectable, computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { PeriodicElement } from '../models/periodic-element.interface';
import { ELEMENT_DATA } from '../data/element-data';

interface PeriodicTableState {
  elements: PeriodicElement[];
  filterValue: string;
  isLoading: boolean;
}

const initialState: PeriodicTableState = {
  elements: [],
  filterValue: '',
  isLoading: false
};

@Injectable({ providedIn: 'root' })
export class PeriodicTableStore extends signalStore(
  withState(initialState),
  withComputed((state) => ({
    filteredElements: computed(() => {
      const elements = state.elements();
      const filterValue = state.filterValue().toLowerCase().trim();

      if (!filterValue) {
        return elements;
      }

      return elements.filter(element =>
        element.position.toString().includes(filterValue) ||
        element.name.toLowerCase().includes(filterValue) ||
        element.weight.toString().includes(filterValue) ||
        element.symbol.toLowerCase().includes(filterValue)
      );
    })
  })),
  withMethods((store) => ({
    loadElements() {
      patchState(store, { isLoading: true });

      // Simulate API call
      setTimeout(() => {
        patchState(store, {
          elements: [...ELEMENT_DATA],
          isLoading: false
        });
      }, 1000);
    },

    updateFilter(filterValue: string) {
      patchState(store, { filterValue });
    },

    updateElement(updatedElement: PeriodicElement, originalPosition: number) {
      const elements = store.elements();
      const index = elements.findIndex(el => el.position === originalPosition);

      if (index !== -1) {
        const newElements = [...elements];
        newElements[index] = updatedElement;
        patchState(store, { elements: newElements });
      }
    },

    addElement(newElement: PeriodicElement) {
      const elements = store.elements();
      const newElements = [...elements, newElement];
      patchState(store, { elements: newElements });
    }
  }))
) {}
