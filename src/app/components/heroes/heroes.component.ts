import { Heroe } from './../../interfaces/heroe.interface';
import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes :any = [];
  loading :boolean = true;
  heroeSelected :Heroe;

  constructor(private heroesService :HeroesService) {

    this.heroesService.getHeroes()
      .subscribe(data => {
        setTimeout(()=> {this.loading = false; this.heroes = data}, 1000);
    })

   }

  ngOnInit() {
  }

  deleteHeroe(key$ :string) {

    this.heroesService.deleteHeroe(key$)
      .subscribe( data => {
        
        if( data ) {
          console.error( data );
        } else {
            delete this.heroes[key$];
        }
    })
  }

  saveHeroe(heroe:Heroe) {
    this.heroeSelected = heroe;
  }

}
