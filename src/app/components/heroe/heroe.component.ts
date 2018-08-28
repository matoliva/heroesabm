import { Heroe } from './../../interfaces/heroe.interface';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

    private heroe :Heroe = {
    bio: "",
    home: "",
    name: ""
  };

  new :boolean = false;
  id :string;

  constructor(private heroesService: HeroesService,
              private router :Router,
              private activatedRoute: ActivatedRoute) { 

    this.activatedRoute.params
      .subscribe( params => {
        console.log(params);
        this.id = params['id'];

        if( this.id !== "new" ) {
          this.heroesService.getHeroe( this.id )
            .subscribe( (data :Heroe) => {
              console.log(data);
              this.heroe = data;
            })
        }

      })
  }

  ngOnInit() {
  }

  save() {
    console.log(this.heroe);

    if(this.id == "new") {
      this.heroesService.newHeroe(this.heroe)
        .subscribe( (data :any)  => {
          //this.router.navigate(['/heroe', data.name]);
          this.router.navigate(['/home']);
        },
        error => console.error(error));
    }else {
      this.heroesService.updateHeroe(this.heroe, this.id)
      .subscribe( (data :any)  => {
        console.log(data);
        this.router.navigate(['/home']);
      },
      error => console.error(error));
    }
  }

}
