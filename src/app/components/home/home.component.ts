import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StorageService } from '../../services';
import { Theme } from '../../types';

@Component({
  selector: 'st-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly storageService = inject(StorageService);
  currentTheme = this.storageService.get('theme');

  onClick(): void {
    const theme = this.currentTheme === Theme.light ? Theme.dark : Theme.light;
    this.storageService.set<Theme>('theme', theme);
    this.currentTheme = this.storageService.get<string>('theme');
  }
}
