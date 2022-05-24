import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  save<T>(key: string, value: T) {
    if (key) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  saveString(key: string, value: string) {
    if (key) {
      localStorage.setItem(key, value);
    }
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

  load<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key) || '');
  }

  loadString(key: string): string | null {
    return localStorage.getItem(key);
  }
}
