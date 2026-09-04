import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { SelectComponent } from '../../../../shared/components/select/select.component';

@Component({
  selector: 'app-event-filter',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, SelectComponent],
  templateUrl: './event-filter.component.html',
})
export class EventFilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<{
    name: string;
    city: string;
    price: string;
    date: string;
  }>();

  private fb = inject(FormBuilder);

  filterForm = this.fb.group({
    name: [''],
    city: [''],
    price: [''],
    date: [''],
  });

  priceOptions = [
    { label: 'Qualquer valor', value: '' },
    { label: 'Gratuito', value: 'gratuito' },
    { label: 'Pago', value: 'pago' },
  ];

  dateOptions = [
    { label: 'Qualquer data', value: '' },
    { label: 'Nesta semana', value: 'week' },
    { label: 'Neste mês', value: 'month' },
  ];

  ngOnInit() {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      )
      .subscribe((values) => {
        this.filterChanged.emit({
          name: values.name || '',
          city: values.city || '',
          price: values.price || '',
          date: values.date || '',
        });
      });
  }
}
