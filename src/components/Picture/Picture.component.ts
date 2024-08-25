import { Component, Input } from '@angular/core';
import Picture from '../../types/Picture';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-picture',
  standalone: true,
  imports: [DatePipe, RouterLink],
  template: `
    <div class="PictureItem">
      <img [src]="picture.photo" [alt]="picture.name" style="width:100%;" />
      <div>
        <h2>{{ picture.name }}</h2>
        <p>{{ picture.author }} ({{ picture.publishYear | date : 'yyyy' }})</p>
      </div>
    </div>
  `,
  styleUrls: ['./Picture.component.scss'],
})
export default class PictureComponent {
  @Input() picture!: Picture;
}
