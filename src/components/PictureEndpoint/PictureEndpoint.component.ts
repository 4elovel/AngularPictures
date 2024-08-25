import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Picture from '../../types/Picture';
import PictureService from '../../services/PictureService';
import { ChangeDetectorRef } from '@angular/core';
import PictureComponent from '../Picture/Picture.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-picture-endpoint',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    PictureComponent,
    NgFor,
    RouterLink,
  ],
  template: `
    <div *ngIf="!isLoading; else loading">
      <div class="picture-container">
        <app-picture [picture]="picture"></app-picture>
      </div>
      <h3>Related by Author</h3>
      <div class="related-pictures">
        <a
          class="related-picture"
          *ngFor="let relatedPicture of relatedPictures"
          [routerLink]="['/pictures/', relatedPicture.id]"
        >
          <app-picture [picture]="relatedPicture"></app-picture>
        </a>
      </div>
    </div>
    <ng-template #loading>Loading...</ng-template>
  `,
  styleUrls: ['./PictureEndpoint.component.scss'],
})
export default class PictureEndpointComponent implements OnInit {
  picture!: Picture;
  relatedPictures: Picture[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      const id = Number(params.get('id'));
      if (!isNaN(id)) {
        this.picture = await this.pictureService.findById(id);
        this.relatedPictures = await this.pictureService.findByAuthor(
          this.picture.author
        );
        this.relatedPictures = this.relatedPictures.filter(
          (p) => p.id !== this.picture.id
        );
        this.isLoading = false;
        this.cdr.detectChanges();
      } else {
        console.error('Invalid picture ID:', id);
      }
    });
  }
}
