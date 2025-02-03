import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageService } from './services';
import { Theme } from './types';

@Component({
  selector: 'st-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly storageService = inject(StorageService);

  currentTheme = signal<Theme>(this.storageService.get('theme'));

  syncCurrentTheme = effect(() => {
    this.currentTheme.set(
      this.storageService.storage()?.replace(/"/g, '') as Theme,
    );
  });

  onClick(): void {
    const currentTheme: Theme = this.storageService.get(Theme.key);
    const newTheme = currentTheme === Theme.light ? Theme.dark : Theme.light;

    this.currentTheme.set(newTheme);
    this.storageService.set<Theme>(Theme.key, newTheme);
  }
}
