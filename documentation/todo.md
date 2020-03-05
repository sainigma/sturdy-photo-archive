## Todo:
    Isot
    - readme
    - Asetukset -menu josta voi valita ruudulla näkyvät sijainnit, järjestelyperusteen ja aikarangen josta kuvia näytetään
    - Käyttäjäasetukset jossa voi määrittää suhteita muihin käyttäjiin
    - Sijaintinäkymä
    - Tietokantaan mekanismi käyttäjien välisen etäisyyden laskemiseen
    - Tietokantaan mekanismi joka hakee käyttäjän kanssa jaetut kuvat. Kuvien määrän kasvaessa kuvan omistajan ja käyttäjän välisen etäisyyden laskeminen jokaista kuvahakua kohti voi muuttua raskaaksi, joten tähän pitäisi keksiä joku fiksu metodi. Hae kaikki kuvat käyttäjän suhteista syvyydeltä n, sitten tarkasta etäisyys? Kuvanluontihetkellä ja oikeuksia säätäessä luo kuvalle whitelist käyttäjistä joilla on kuvaan oikeus?
    - Tuki panoramoille ja 3d-malleille

    Pienet
    - Inforuudun sijaintiin samanlainen UI kuin labeleihin. Jos sijainti löytyy -> napit: sijainti + muokkaa, jos ei löydy -> nappi: luo uusi
## Bugit:
- Labelin poistaminen ei toimi jos labeleita on vain yksi
- Thumbnailin luonti kuvalle epäonnistuu joskus