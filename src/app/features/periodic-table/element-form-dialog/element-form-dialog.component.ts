import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PeriodicElement } from '../../../shared/models/periodic-element.interface';
import { uniquePositionValidator } from '../../../shared/validators';

interface DialogData extends Partial<PeriodicElement> {
  isEdit: boolean;
  originalPosition?: number;
  existingElements?: PeriodicElement[];
}

@Component({
  selector: 'app-element-form-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './element-form-dialog.component.html'
})
export class ElementFormDialogComponent implements OnInit {
  form: FormGroup;
  isEdit: boolean;
  existingElements: PeriodicElement[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ElementFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEdit = data.isEdit;
    this.existingElements = data.existingElements || [];

    this.form = this.fb.group({
      position: ['', [Validators.required, Validators.min(1), uniquePositionValidator({
        existingElements: this.existingElements,
        isEdit: this.isEdit,
        originalPosition: this.data.originalPosition
      })]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      weight: ['', [Validators.required, Validators.min(0)]],
      symbol: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]]
    });
  }

  ngOnInit() {
    this.form.patchValue(this.data);
  }

  onSubmit() {
    if (this.form.valid) {
      const elementData: PeriodicElement = {
        position: this.form.value.position,
        name: this.form.value.name,
        weight: this.form.value.weight,
        symbol: this.form.value.symbol
      };
      this.dialogRef.close(elementData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
