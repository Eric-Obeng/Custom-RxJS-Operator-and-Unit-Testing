import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { from, of, take } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the correct original values', (done) => {
    component.ngOnInit();

    setTimeout(() => {
      expect(component.originalValues).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      done();
    });
  });

  it('should apply multiplyBy operator correctly', (done) => {
    component.ngOnInit();
    setTimeout(() => {
      expect(component.transformedValues).toEqual([
        10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
      ]);
      done();
    });
  });

  it('multiplyBy operator should multiply numeric values by a factor', (done) => {
    const source$ = from([1, 2, 3]);
    const factor = 2;

    source$.pipe(component.multiplyBy(factor), take(3)).subscribe({
      next: (value) => {
        expect(value).toBeGreaterThan(0);
        expect(value % factor).toBe(0);
      },
      complete: () => done(),
    });
  });

  it('multiplyBy operator should ignore none-numeric value', (done) => {
    const source$ = of('string' as any);
    const factor = 2;
    const results: number[] = [];

    source$.pipe(component.multiplyBy(factor)).subscribe({
      next: (value) => results.push(value),
      error: (err) => {
        expect(err).toBe('Value is not a number');
      },
      complete: () => {
        console.log('MultiplyBy completed');
        done();
      },
    });
  });
});
