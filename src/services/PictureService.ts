import { Injectable } from '@angular/core';
import Picture from '../types/Picture';

@Injectable({
  providedIn: 'root',
})
export default class PictureService {
  private baseUrl = 'http://localhost:3000/pictures';

  constructor() {}

  async findAll(): Promise<Picture[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch pictures');
    }
    return await response.json();
  }

  async findById(id: number): Promise<Picture> {
    const url = `${this.baseUrl}/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch picture with id ${id}`);
    }
    return await response.json();
  }
  async findByAuthor(author: string): Promise<Picture[]> {
    const data = await this.findAll();
    return data.filter(
      (picture) => picture.author.toLowerCase() === author.toLowerCase()
    );
  }
}
