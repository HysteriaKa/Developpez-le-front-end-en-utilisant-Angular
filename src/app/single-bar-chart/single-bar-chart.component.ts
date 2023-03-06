import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Participation } from 'src/app/core/models/Participation';
@Component({
  selector: 'app-single-bar-chart',
  templateUrl: './single-bar-chart.component.html',
  styleUrls: ['./single-bar-chart.component.scss']
})
export class SingleBarChartComponent implements OnInit {

  public olympics$: Observable<Array<Olympic> | undefined | null> = of(null);
  public olympic: Olympic | undefined;
  public resSafe: any;
  public participations: Participation[] | undefined;
  public datas: any[];
  public years:number[]=[];
  public series: any[];
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
        const nbrId: number = +olympicId;
        this.olympic = this.resSafe[nbrId];
        if (this.olympic) {
          this.participations = this.olympic['participations'];
          // console.log(this.participations);
          this.years = this.participations.map((an)=>an.year);
          const nbrMedals =this.participations.map((nbr)=>nbr.medalsCount);

          this.datas = this.years.map((year: number, i: number) => {
            return {
              'name':this. years[i],
              'value': nbrMedals[i],
            }
          });
// this.series.push(this.datas);
          console.log(this.years,nbrMedals,this.datas);
// for (let i = 0; i <this. years.length; i++) {
//   const element = {name :this. years[i],value: nbrMedals[i]};
//   this.datas.push(element);
// }
// console.log(this.datas);
        }
      })
    }

  }



}

