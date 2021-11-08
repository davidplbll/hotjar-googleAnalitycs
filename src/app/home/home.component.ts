import { Component, OnInit } from '@angular/core';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { PokemonListService } from './services/pokemon-list.service';
import { GoogleAnalyticsService } from '@shared';
import { Subject, throwError, timer, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private pokemonListService: PokemonListService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {}
  unsubscribeAll$ = new Subject<boolean>();
  pokemons$ = this.pokemonListService
    .getPokemonList()
    .pipe(map((respose: any) => respose?.results));

  ngOnInit(): void {
    const numbers = timer(3000, 10000);
    numbers
      .pipe(
        takeUntil(this.unsubscribeAll$),
        switchMap(() =>
          this.cutomError().pipe(
            catchError((err: any) => {
              this.googleAnalyticsService.generateEventError(err);
              return of(err);
            })
          )
        )
      )
      .subscribe();
  }

  clickPokemon(pokemon: any) {
    this.googleAnalyticsService.generateEvent('select_pokemon', {
      pokemon: pokemon.name,
      label: 'home',
    });
  }

  cutomError() {
    console.log('error');
    return throwError({
      message: 'not found',
      status: 404,
      path: 'home',
      data: {
        custom: 2,
      },
    });
  }
}
