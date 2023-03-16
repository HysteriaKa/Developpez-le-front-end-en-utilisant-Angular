import { Component, OnInit, HostListener } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pie-chat',
  templateUrl: './pie-chat.component.html',
  styleUrls: ['./pie-chat.component.scss']
})
export class PieChatComponent implements OnInit {
  public olympics$: Observable<Array<Olympic> | undefined | null> = of(null);
  public resSafe: Array<Olympic>;
  public sumByCountry: Array<number> = [];
  public countrys: any | undefined;
  public datas: string[] = [];
  public surveyData: string;
  public totalParticipations: number = 0;
  public nbrJo: any = 0;
  public view:any=[];

  constructor(private olympicService: OlympicService, private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    function add(accumulator: number, a: number) {
      return accumulator + a;
    }
    this.olympics$.subscribe(res => {
      if (!res) return;
      this.resSafe = res;
      this.countrys = this.resSafe.map((pays: any) => pays.country);
      const medalsByCountry = res.map((pays: any) => pays.participations);
      const nbr = medalsByCountry.forEach((participation) => participation.length);
      const nbrMedalsByCountry = medalsByCountry.map(
        (participation: any) => participation.map((medals: any) => medals.medalsCount)
      );

      this.nbrJo = nbrMedalsByCountry.map((participation) => participation.length);

      this.sumByCountry = nbrMedalsByCountry.map((sum) => sum.reduce(add, 0));
      this.surveyData = this.countrys.map((country: string, i: number) => {
        return {
          'name': country,
          'value': this.sumByCountry[i],
        }
      });
      console.log(this.surveyData);
    })
  }
  resizeChart(width: number): void {
    this.view = [width, 320]
  }
  // When user clicks on a specific slice on the pie chart
  onPieSliceSelect(event: any) {
    this.countrys.map((country: string, key: number) => {
      if (country === event['name']) {
        this.router.navigate(['/details/', key]);
      }
    })

  }


}

