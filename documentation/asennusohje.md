# Asennus
## Vaatimukset
Sovellus vaatii toimiakseen nodejs:n, npm:n, psql:n

### Asennus

Kloonaa repo

    git clone https://github.com/sainigma/sturdy-photo-archive.git

Asenna riippuvuudet npm install -komennolla sekä frontend että backend kansioissa.

Luo kumpaankin endiin .env tiedostot:
Frontendissä

    URI=<Hostin osoite ilman hakasulkeita ja päättävää kenoviivaa tähän>

Backendissä

    PORT=<Servattava portti ilman hakasulkeita tähän>
    SECRET="<Salaisuus tähän>"
    PGUSER="<Tietokannan käyttäjä tähän>"
    PGHOST="<Tietokannan osoite tähän>"
    PGDATABASE="<Tietokannan nimi tähän>"
    PGPASSWORD="<Tietokannan salasana tähän>"
    PGPORT=<Tietokannan portti tähän ilman hakasulkeita>
  
Buildaa frontend ja siirrä sen sisältö backendin public -kansioon, luo photos -kansio.

### Tietokannan konfigurointi

Luo käyttöjärjestelmään käyttäjä tietokannalle, kirjaudu psql:ään ja luo käyttäjä samalla nimellä. Tallenna tiedot backendin dotenviin. Luo tyhjä tietokanta ja anna em. käyttäjälle siihen oikeudet. Palaa shelliin.

Kirjaudu käyttäjään, siirry dokumentaation kansioon psql ja aja

    psql -d "<tietokannan nimi>" -f luonti.sql

Kirjaudu superuserina (tai anna käyttäjälle väliaikaisesti superoikeudet) tietokantaan ja asenna uuid-ossp

    create extension if not exists "uuid-ossp";

Tarkista että lisäosa löytyy komennolla \dx

Ongelmatilanteissa tarkista että psql:n asetukset on kunnossa, löytyy polusta

    /etc/postgresql/9.6/main/postgresql.conf

### Käyttö

Siirry backendin juureen ja aja

    npm run start