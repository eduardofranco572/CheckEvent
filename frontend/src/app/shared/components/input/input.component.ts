import {
  Component,
  forwardRef,
  Input,
  inject,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, LucideAngularModule, NgClass],
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('inputEl') inputEl!: ElementRef<HTMLInputElement>;

  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() placeholder = '';
  @Input() variant: 'default' | 'card' = 'default';

  value = '';
  disabled = false;
  showPassword = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  get inputType(): string {
    if (this.type === 'password') {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onModelChange(val: string) {
    this.value = val;
    this.onChange(val);
  }

  writeValue(value: any): void {
    this.value = value || '';

    if (this.inputEl) {
      this.inputEl.nativeElement.value = this.value;
    }

    this.cdr.markForCheck();
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
}
