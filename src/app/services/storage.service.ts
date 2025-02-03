import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, fromEvent, map } from 'rxjs';
import { WINDOW } from '../providers/window.provider';
import { Theme } from '../types';

/**
 * StorageService забирает window из инжектора и предоставляет свои обертки для сохранения и чтения данных.
 */

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly window = inject(WINDOW);

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

  readonly storage = toSignal(
    fromEvent<StorageEvent>(this.window, 'storage').pipe(
      filter((event) => event.storageArea === localStorage),
      filter((event) => event.key === Theme.key),
      map((event) => event.newValue),
    ),
  );
}
