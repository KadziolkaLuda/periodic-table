import { AbstractControl, ValidationErrors } from '@angular/forms';
import { PeriodicElement } from '../models/periodic-element.interface';

export interface UniquePositionValidatorConfig {
  existingElements: PeriodicElement[];
  isEdit: boolean;
  originalPosition?: number;
}

export function uniquePositionValidator(config: UniquePositionValidatorConfig) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    
    const position = control.value;
    const { existingElements, isEdit, originalPosition } = config;
    
    const isDuplicate = existingElements.some(element => 
      element.position === position && 
      (!isEdit || element.position !== originalPosition)
    );
    
    return isDuplicate ? { positionExists: true } : null;
  };
} 