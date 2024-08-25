import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import PictureEndpointComponent from '../components/PictureEndpoint/PictureEndpoint.component';
import PictureGalleryComponent from '../components/PictureGallery/PictureGallery.component';

export const routes: Routes = [
  {
    path: 'pictures/:id',
    component: PictureEndpointComponent,
  },
  {
    path: '',
    component: PictureGalleryComponent,
  },
];
