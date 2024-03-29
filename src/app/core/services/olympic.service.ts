import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap, of, find } from 'rxjs';
import { catchError, map, filter } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Array<Olympic> | undefined | null>(null);

  constructor(private http: HttpClient) { }

  loadInitialData() {
    return this.http.get<Array<Olympic> | null>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error(error);
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }


    ngOnDestroy() {
    this.olympics$.unsubscribe()
  }

}
