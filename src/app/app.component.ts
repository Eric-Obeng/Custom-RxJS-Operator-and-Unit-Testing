import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { filter, from, map, Observable } from 'rxjs';
import { __values } from 'tslib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Custom-RxJS-Operators';
  originalValues: number[] = [];
  transformedValues: number[] = [];

  source$ = from(Array.from({ length: 10 }, (_, index) => index + 1));

  ngOnInit(): void {
    this.source$.pipe(this.multiplyBy(10)).subscribe((value) => {
      this.transformedValues.push(value);
    });

    this.source$.subscribe((value) => {
      if (typeof value === 'number') {
        this.originalValues.push(value);
      }
    });
  }

  multiplyBy(factor: number) {
    return (source$: Observable<number>) => {
      return source$.pipe(
        filter((value) => typeof value === 'number'),
        map((value) => value * factor)
      );
    };
  }
}
