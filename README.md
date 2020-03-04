# sturdy-photo-archive
Kuvaserveri valokuvien organisointiin. Serverin lopputarkoituksena on luoda ympäristö jossa ryhmät voivat jakaa keskenään kuvia, ja samalla aggregoida kuviin liittyvää "suullista historiaa" ja muuta metainformaatiota.

Interaktio muiden käyttäjien kanssa tapahtuu kuvia jakamalla (käyttäjien välille lasketaan etäisyys yhteyksien perusteella ja yksittäisille kuville voi määrittää syvyyden kuinka kauas käyttäjästä kuva jaetaan), kuvia kommentoimalla sekä sijainteja, ottoaikoja ja tunnisteita kuviin tarkentamalla.

Käyttöliittymä on toteutettu react-reduxilla, backend Nodella ja expressillä, tietokanta PostgreSQL:llä