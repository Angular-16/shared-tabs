import { InjectionToken } from '@angular/core';

/**
 * Инжектор DI в Angular запоминает токены и отдает сущности, которые с ними связаны.
 * Токен — это может быть объект InjectionToken, строка или класс.
 * Тут создается новый InjectionToken root-уровня и связывается с фабрикой, которая возвращает браузерный window.
 */

export const WINDOW = new InjectionToken('Window', {
  providedIn: 'root',
  factory: () => window,
});
