# sturdy-photo-archive
Kuvaserveri valokuvien organisointiin. Serverin lopputarkoituksena on luoda ympäristö jossa ryhmät voivat jakaa keskenään kuvia, ja samalla aggregoida kuviin liittyvää "suullista historiaa" ja muuta metainformaatiota.

Interaktio muiden käyttäjien kanssa tapahtuu kuvia jakamalla (käyttäjien välille lasketaan etäisyys yhteyksien perusteella ja yksittäisille kuville voi määrittää syvyyden kuinka kauas käyttäjästä kuva jaetaan), kuvia kommentoimalla sekä sijainteja, ottoaikoja ja tunnisteita kuviin tarkentamalla.

Tällä hetkellä projektissa on toiminnallisena käyttäjien luonti ja kirjautuminen, käyttäjän omistamien kuvien hakeminen, kuvien lisääminen, tunnisteiden lisääminen ja muokkaaminen, kommentointi, kuvien hakeminen tunnisteiden ja/tai sijainnin perusteella sekä käyttöliittymät edellämainituille. Visuaalisessa ilmeessä ei ole enää paljon työtä. Myös tietokannan rakenne on melko valmis.

Käyttäjien suhteista riippuvat toiminnallisuudet ovat suureksi osaksi vielä kesken. Tällä hetkellä kaksi käyttäjää pääsee käsiksi samaan kuvaan vain jos kumpikin on kuvan täys- tai osaomistajia. Käyttäjän asetuksia ei myöskään pysty vielä muokkaamaan.

Käyttöliittymä on toteutettu react-reduxilla, backend Nodella ja expressillä, tietokanta PostgreSQL:llä

## Tuntikirjanpito
[kts. linkki](./documentation/tuntikirjanpito.md)

## Käyttöohjeet
[Ohjeet käyttöön](./documentation/kayttoohje.md)

[Ohjeet asennukseen](./documentation/asennusohje.md)