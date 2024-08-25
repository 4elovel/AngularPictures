import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import PictureService from '../../services/PictureService';
import Picture from '../../types/Picture';
import PictureComponent from '../Picture/Picture.component';

import { NgFor } from '@angular/common';

@Component({
  selector: 'app-picture-gallery',
  standalone: true,
  imports: [RouterOutlet, NgFor, PictureComponent, RouterLink],
  template: `
    <div class="PicturesGrid">
      <div class="PictureColumn" *ngFor="let column of columns">
        <div *ngFor="let picture of column">
          <a [routerLink]="['/pictures', picture.id]">
            <app-picture [picture]="picture"></app-picture>
          </a>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./PictureGallery.component.scss'],
})
export default class PictureGalleryComponent implements OnInit {
  pictures: Picture[] = [];
  columns: Picture[][] = [];
  columnCount = 3;

  constructor(private pictureService: PictureService) {}

  async ngOnInit() {
    try {
      this.pictures = await this.pictureService.findAll();
      this.distributePicturesIntoColumns();
    } catch (error) {
      console.error('Failed to load pictures:', error);
    }
  }

  distributePicturesIntoColumns() {
    this.columns = Array.from({ length: this.columnCount }, () => []);
    this.pictures.forEach((picture, index) => {
      this.columns[index % this.columnCount].push(picture);
    });
  }
}
