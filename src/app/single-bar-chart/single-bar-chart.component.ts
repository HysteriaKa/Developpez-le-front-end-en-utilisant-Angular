import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, filter, tap, find } from 'rxjs/operators';
@Component({
  selector: 'app-single-bar-chart',
  templateUrl: './single-bar-chart.component.html',
  styleUrls: ['./single-bar-chart.component.scss']
})
export class SingleBarChartComponent implements OnInit {

  public olympics$: Observable<Array<Olympic> | undefined | null> = of(null);
  public olympic: Olympic | undefined;
  public resSafe: any;

  constructor(private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    const olympicId: string | null = this.route.snapshot.paramMap.get('id');
    if (olympicId) {
      this.olympics$.subscribe(res => {
        if (!res) return;
        this.resSafe = res;
        const nbrId:number = +olympicId;
        this.olympic =this.resSafe[nbrId];
        console.log(this.olympic);
      })
    }
  }
}

