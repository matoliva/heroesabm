import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe.interface';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroesUrl :string = "https://heroesapp-51c2c.firebaseio.com/heroes.json";
  heroeUrl :string = "https://heroesapp-51c2c.firebaseio.com/heroes/";


  constructor(private httpService: HttpClient) { }

  newHeroe(heroe :Heroe) {
    let body = JSON.stringify( heroe );
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    return this.httpService.post( this.heroesUrl, body, { headers } )/*.pipe(map( res => {
        console.log(res);
        return res;
      }))*/
  }

  updateHeroe(heroe :Heroe, key$ :string) {
    let body = JSON.stringify( heroe );
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    let url = `${ this.heroeUrl }${ key$ }.json`;

    return this.httpService.put( url, body, { headers } )/*.pipe(map( res => {
        console.log(res);
        return res;
      }))*/
  }

  getHeroe( key$ :string ) {
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    let url :string = `${this.heroeUrl}${key$}.json`;
    return this.httpService.get(url, { headers });
  }

  getHeroes() {
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    return this.httpService.get(this.heroesUrl, {headers});
  }

  deleteHeroe(key$ :string) {

    let url = `${ this.heroeUrl }${ key$ }.json`;

    return this.httpService.delete( url );

  }
}
