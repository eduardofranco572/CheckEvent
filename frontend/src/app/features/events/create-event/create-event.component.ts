import {
  Component,
  inject,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { InputComponent } from '../../../shared/components/input/input.component';
import { MenuComponent } from '../../../core/layout/menu/menu.component';
import { PricingCardsComponent } from '../components/pricing-cards/pricing-cards.component';
import { CreateEventFacade } from './create-event.facade';
import { FlatpickrModule, FlatpickrDefaults } from 'angularx-flatpickr';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    MenuComponent,
    PricingCardsComponent,
    FlatpickrModule,
  ],
  templateUrl: './create-event.component.html',
  providers: [CreateEventFacade],
})
export class CreateEventComponent implements OnInit {
  public facade = inject(CreateEventFacade);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private flatpickrDefaults = inject(FlatpickrDefaults);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('fileInput') fileInputRef!: ElementRef;
  isDragging = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id && isPlatformBrowser(this.platformId)) {
      this.facade.loadEventData(id).subscribe(() => this.cdr.detectChanges());
    }
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(e: DragEvent) {
    e.preventDefault();
    this.isDragging = false;
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging = false;

    if (e.dataTransfer?.files?.length) {
      this.handleFile(e.dataTransfer.files[0]);
    }
  }

  onFileSelected(e: Event) {
    const input = e.target as HTMLInputElement;

    if (input.files?.length) {
      this.handleFile(input.files[0]);
    }
  }

  triggerFileInput() {
    this.fileInputRef.nativeElement.click();
  }

  private handleFile(file: File) {
    if (file.type.startsWith('image/')) {
      this.facade.form.patchValue({ bannerFile: file });
      const reader = new FileReader();

      reader.onload = () => {
        this.facade.bannerPreview = reader.result;
        this.cdr.detectChanges();
      };

      reader.readAsDataURL(file);
    }
  }
}
