import { Component, inject, ChangeDetectorRef, OnInit, PLATFORM_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { InputComponent } from '../../../shared/components/input/input.component';
import { MenuComponent } from '../../../core/layout/menu/menu.component';
import { PricingCardsComponent } from '../components/pricing-cards/pricing-cards.component';
import { CreateEventFacade } from './create-event.facade';
import { FlatpickrModule } from 'angularx-flatpickr';

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
  private platformId = inject(PLATFORM_ID);

  isDragging = false;
  isDraggingCover = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id && isPlatformBrowser(this.platformId)) {
      this.facade.loadEventData(id).subscribe(() => {
        this.cdr.markForCheck();
      });
    }
  }

  // Banner
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
      this.handleFile(e.dataTransfer.files[0], 'banner');
    }
  }

  onFileSelected(e: Event) {
    const input = e.target as HTMLInputElement;

    if (input.files?.length) {
      this.handleFile(input.files[0], 'banner');
    }
  }

  // Capa
  onDragOverCover(e: DragEvent) {
    e.preventDefault();
    this.isDraggingCover = true;
  }

  onDragLeaveCover(e: DragEvent) {
    e.preventDefault();
    this.isDraggingCover = false;
  }

  onDropCover(e: DragEvent) {
    e.preventDefault();
    this.isDraggingCover = false;

    if (e.dataTransfer?.files?.length) {
      this.handleFile(e.dataTransfer.files[0], 'cover');
    }
  }

  onFileSelectedCover(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFile(input.files[0], 'cover');
    }
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  triggerCoverInput(coverInput: HTMLInputElement) {
    coverInput.click();
  }

  private handleFile(file: File, type: 'banner' | 'cover') {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = () => {
        if (type === 'banner') {
          this.facade.form.patchValue({ bannerFile: file });
          this.facade.bannerPreview = reader.result;
        } else {
          this.facade.form.patchValue({ coverFile: file });
          this.facade.coverPreview = reader.result;
        }

        this.cdr.markForCheck();
      };

      reader.readAsDataURL(file);
    }
  }
}
