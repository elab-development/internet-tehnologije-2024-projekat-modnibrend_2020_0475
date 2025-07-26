# Modni Brend

Ova aplikacija je razvijena kao deo seminarskog rada na Fakultetu organizacionih nauka, u okviru predmeta Internet tehnologije (ITEH). Cilj projekta bio je da se napravi moderna, funkcionalna i responzivna veb platforma za modni brend koristeći savremene tehnologije.

## Tehnologije

**Frontend:**
- React
- JavaScript
- CSS

**Backend:**
- PHP
- Laravel

**Baza podataka:**
- MySQL

## Funkcionalnosti

- Prikaz kolekcija i proizvoda
- Prijava, registracija i autentifikacija korisnika
- Dodavanje proizvoda u korpu i završetak kupovine
- Administratorski panel za upravljanje korisnicima i kolekcijama
- REST API komunikacija između frontenda i backenda

## Opis aplikacije

Aplikacija omogućava korisnicima da pregledaju modne kolekcije i proizvode, kao i da se registruju, prijave i obave kupovinu putem korpe. Administratori imaju mogućnost da dodaju nove kolekcije, menjaju privilegije korisnicima i analiziraju korišćenje sistema.

## Pokretanje aplikacije

1. Klonirajte repozitorijum:
   ```
   git clone <repo-url>
   ```

2. Pokrenite backend (Laravel):
   ```
   composer install
   php artisan migrate
   php artisan serve
   ```

3. Pokrenite frontend (React):
   ```
   npm install
   npm start


