import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Participation } from 'src/app/core/models/Participation';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	public olympics$: Observable<Array<Olympic> | undefined | null> = of(null);
	public resSafe!: any;
	public sumByCountry!: any;
	public sumMedals!: any;
	public countrys!: any | undefined;
	public datas: string[] = [];
	public surveyData: string;
	public totalParticipations: number = 0;
	constructor(private olympicService: OlympicService) { }

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
			let nbrJo = 0;
			// nbrJo = nbrMedalsByCountry.map((participation) => participation.length);
			console.log(nbrJo);
			this.sumByCountry = nbrMedalsByCountry.map((sum) => sum.reduce(add, 0));
			this.surveyData = this.countrys.map((country: string, i: number) => {
				return {
					'name': country,
					'value': this.sumByCountry[i],
				}
			});


		})
	}
}
