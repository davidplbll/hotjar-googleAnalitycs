import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PokemonListService {
  constructor(private http: HttpClient) {}
  getPokemonList() {
    return this.http
      .get('https://pokeapi.co/api/v2/pokemon/?limit=151')
      .pipe(tap(console.log));
  }
}
