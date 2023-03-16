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
  private Olympic: Olympic | undefined
  constructor(private http: HttpClient) { }

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
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
