import { Inject, Injectable } from '@angular/core';
import { WINDOW } from '../providers/window.provider';

/**
 * StorageService забирает window из инжектора и предоставляет свои обертки для сохранения и чтения данных.
 */

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(WINDOW) private readonly window: Window) {}

  set<T>(key: string, keyValue: T): void {
    this.window.localStorage.setItem(key, JSON.stringify(keyValue));
  }

  get<T>(key: string): T {
    try {
      return JSON.parse(this.window.localStorage.getItem(key) ?? '');
    } catch (e) {
      throw new Error('something wrong');
    }
  }

  delete(key: string): void {
    try {
      this.window.localStorage.removeItem(key);
    } catch (e) {
      throw new Error('something wrong');
    }
  }
}
