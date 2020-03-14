## Todo:
    Isot
    - Käyttäjäasetukset jossa voi määrittää suhteita muihin käyttäjiin
    - Sijaintinäkymä
    - Tietokantaan mekanismi käyttäjien välisen etäisyyden laskemiseen
    - Tietokantaan mekanismi joka hakee käyttäjän kanssa jaetut kuvat. Kuvien määrän kasvaessa kuvan omistajan ja käyttäjän välisen etäisyyden laskeminen jokaista kuvahakua kohti voi muuttua raskaaksi, joten tähän pitäisi keksiä joku fiksu metodi. Hae kaikki kuvat käyttäjän suhteista syvyydeltä n, sitten tarkasta etäisyys? Kuvanluontihetkellä ja oikeuksia säätäessä luo kuvalle whitelist käyttäjistä joilla on kuvaan oikeus?

    Pienet
    - Piilota sijaintistrip näkyvistä kun siltä lähtee viimeinen jäsen ( näin käy jos sijainti poistetaan editorista, dragatessa ei )
## Bugit:
- Labelin poistaminen ei toimi jos labeleita on vain yksi
- Menuikonit klikattavissa vaikka ne olisi elementtien alla
- Jimp kuluttaa hulluna muistia, siirry johonkin toiseen kirjastoon