
# työaikakirjanpito

| päivä | aika | mitä tein  |
| :----:|:-----| :-----|
| 9.12 | 6| Projektin alustus ja suunnittelu, PostgreSQL:ään tutustumista |
| 11.12| 6 | psql conffaus, tietokantojen luonti ja niiden dokumentointi, kts. [schemaDocumentation](./psql/schemaDocumentation.md)|
| 12.12 | 7 | Backendiin routeja kirjautumiseen, näiden dokumentointia, kts. [userRoutes.md](./backend/userRoutes.md)
| 16.12 | 6 | Frontendin alustus, käyttäjän luonti ja verifiointi
| 11.2 | 8 | Reducerien luontia fronttiin, käyttöliittymä kuvien lisäämiseen ja kirjautumiseen, tyylien kehitystä
| 12.2 | 6 | Tyylejä ja refaktorointia. Kirjautuminen käsitellään frontissa nyt oikein. Sovelluksessa state machine kirjautumaton tila -> käyttöliittymä kirjautuneille
| 13.2 | 7 | Tiedostonlähetyksen ja -vastaanottamisen toteutus. Tietokantaoperaatiot tiedoston vastaanottamiselle lähes valmiit (vain oikeuksien asetus puuttuu)
| 14.2 | 7 | Jokaiselle tiedoston- ja sijainninluonnille luodaan nyt oikeudet. Olemassaolevat sijainnit haetaan nyt fronttiin, ja kuvia voi lisätä sekä uusiin että olemassaoleviin sijainteihin. Frontissa kuvanluontikäyttöliittymässä siirtymä moduuliputkesta menu -> alimenurakenteeseen, uusien moduulien ja form reducerin rakentamista
| 15.2 | 2 | Uusi reducer kuvien tallentamiseen valmis. Kuvanluonnin alimman tason asetukset valmiit toiminnallisesti, kts. [suunnitelma](./frontend/UI/DialogFlowForFileUpload.md) UI:lle
| 17.2 | 4 | Koko reducer nyt käytössä. Päivämäärän formatoija nätimpään päivämäärien syöttöön. Backend vastaanottaa ja syöttää tiedostot tietokantaan oikein.
| 18.2 | 8 | Frontissa upload-komponentti uudelleenkäytettävissä. Päivämäärien hakeminen uploadeihin toimii. Backend sallii vain uniikit lähetykset. Käyttöliittymää alustettu kuvien hakemiseen backendistä. SQL:llää palautettu mieleen ja hakuqueryjä mietitty.
| 19.2 | 9 | Olemassaolevat kuvat haetaan nyt käyttäjälle käyttöliittymässä. Myös julkisiksi merkityt kuvat haetaan käyttöliittymään ja näytetään jos käyttäjä ei ole kirjautunut. Kuvantunnistukseen ja Yolov3 Darknetiin tutustumista. Luotettava tunnisteiden generointi cpu:lla näyttäisi kestävän ~20s per kuva. Lisätyt kuvat lisätään käyttöliittymään kuvanlisäysresponsen perusteella. Lisätyistä kuvista tehdään thumbnailit ja response lähetetään thumbnailien tekemisen jälkeen.
| 20.2 | 3 | Parantelin tyylejä, nyt kuvauploadiin tulevat kuvat sovitetaan tietynkokoiseen konttiin. Ylijäävä osa täytetään saman kuvan blurratulla versiolla. Refaktorointia, Input-moduulia siistitty, reducereissa upload dispatch käsitellään muissakin reducereissa. Kuville voi määrittää näkyvyysasteen uploadin yhteydessä, ei käsitellä vielä backendissä. 
| 21.2 | 9 | Backend jakaa julkiset sijainnit julkisten kuvien yhteydessä. Upload käynnistää latausruudun, katoaa kun response ok. Näkyvyysaste käsitellään backendissä ja tallennetaan tietokantaan. Refaktorointia, epämääräiset pyynnöt puidaan backendissä, joten frontissa ei tarvetta pyyntöjen oikeellisuuden tarkistukselle dispatchin yhteydessä. Alustava toteutus notificationeille. Tyylien parissa työskentelyä, yleisilmeen pohdintaa ja responsiivisuuden kehitystä.
| 25.2 | 8 | Käyttöliittymän suunnittelua. Editointi- ja tarkastelunäkymä yksittäisille kuville. Responsiivisuuden hiomista. Custom ikoneita ja font-awesomesta pois siirtymisen alustamista. Reducer appstaten seurantaan.
| 26.2 | 9 | Ikonien autogenerointi blenderistä suoraan tiedostoihin. Editointiosion tyylejä hiottu, osion osia tehty modulaarisimmiksi. SQL:n kanssa taistelua, editoriin haetaan nyt tietoa esimerkiksi kommenttien muodossa. Kommentteja voi lisätä ja ne päivittyy näkymään automaattisesti.
| 27.2 | 7 | Loginin reduceria refaktoroitu, login onnistuu myös localstoragen kautta, vanhan tokenin oikeellisuuden testaamiseen tehty uusi route. Kuvien ja sijaintien alkuhaun dispatch siirretty kuva- ja sijaintireducereista loginista vastaavaan user reduceriin. Front lähettää labeleita ja backend osaa prosessoida ne. PSQL:ssä harjoiteltu funktioiden käyttöä, queryt on nyt tiiviimpiä ja enemmän abstrakteja.
| 28.2 | 2 | Lisää PSQL -funktioita, backendiä refaktoroitu vastaamaan tätä. Backendin moniosaisia queryjä supistettu yksiosaisiksi. Tunnisteiden hakeminen ja lisääminen toimii nyt frontpuolellakin.
| 3.3 | 8 | Tunnisteiden klikkaaminen kuvanäkymässä aukaisee hakunäkymän jossa kuvia voi avata samalla logiikalla kuin päänäkymässäkin. Sovelluksen tilasta pidetään kirjaa uusia näkymiä availlessa ja sulkunappi siirtää edelliseen näkymään kotinäkymään palauttamisen sijaan. Hakutuloksien hakeminen ja näyttäminen toteutettu, toimii myös useiden tunnisteiden ja sijaintien kanssa. Pienten bugien korjausta: Tunnisteiden lisääminen kuviin joista tunnisteet puuttuu toimii nyt oikein. FilmStrip -komponentti pysyy paremmin kärryillä appstatesta.
| 4.3 | 8 | Labeleiden poistaminen toimii. Appstatessa voi liikkua sekä historiassa taaksepäin, että palata suoraan alkuun. Kuvien sijaintiparametria pystyy nyt siirtämään kuvastrippien välillä draggaamalla. Tutustumista css-animaatioihin. FilmStrip -komponentissa nyt toimiva preview. Readme:n ja todo-listan kirjoitusta.
| 5.3 | 3 | Käyttöliittymän yhtenäistämistä ja tyylien hiomista, appin ja reducerien pientä refaktorointia.
| 9.3 | 7 | Rangesliderin tekoa. Näkyvät kuvat pystyy nyt filtteröimään logaritmisen aikarangen perusteella. Backendissä kuvien resizeemisen asyncbugi ehkä korjattu. ImgEditor -modulin viimeistely aloitettu.
| 10.3 | 2 | ImageEditorissa voi nyt määrittää sijainnin kuvalle. Reducerien refaktorointia.
| yht   | 143 | | 
