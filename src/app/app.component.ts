import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import PictureService from '../services/PictureService';
import Picture from '../types/Picture';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgFor, DatePipe],
  standalone: true,
  template: ` <router-outlet /> `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
