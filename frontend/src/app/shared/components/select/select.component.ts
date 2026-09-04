import { Component, ElementRef, forwardRef, HostListener, Input, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: { label: string; value: string }[] = [];
  @Input() placeholder = 'Selecione...';

  isOpen = false;
  value = '';
  selectedLabel = '';
  disabled = false;

  private el = inject(ElementRef);

  onChange: any = () => {};
  onTouched: any = () => {};

  toggle() {
    if (!this.disabled) this.isOpen = !this.isOpen;
  }

  selectOption(opt: { label: string; value: string }, event: Event) {
    event.stopPropagation();
    this.value = opt.value;
    this.selectedLabel = opt.label;
    this.isOpen = false;
    this.onChange(this.value);
    this.onTouched();
  }

  writeValue(val: string): void {
    this.value = val;
    const selected = this.options.find((o) => o.value === val);
    this.selectedLabel = selected ? selected.label : '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
