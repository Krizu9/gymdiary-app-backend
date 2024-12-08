# gymdiary-app-backend

# app.js

![app.js](images_for_readme/image.png)

Pakettien käyttöönotto, middlewaret, routet osoitetaan vastaavaan routetiedostoon, error handling ja serverin käynnistys.

# Routet

## Route tiedostot
![Routes tiedosto](images_for_readme/image-1.png)

Routes tiedosto

## Käyttäjä routet
![Käyttäjä routes](images_for_readme/image-2.png)

Käyttäjä routet

## Harjoite routet
![Harjoite routet](images_for_readme/image-3.png)

Harjoite routet

## Harjoitepohjien routet
![Harjoitepohjien routet](images_for_readme/image-4.png)

Harjoitepohjien routet

# Mallit

## Käyttäjä malli

![Käyttäjä malli](images_for_readme/image-5.png)

Käyttäjä malli

## Harjoite malli

![Harjoite malli](images_for_readme/image-6.png)

Harjoite malli

## Harjoitepohja malli

![Harjoitepohja malli](images_for_readme/image-7.png)

Harjoitepohja malli

# Middlewaret

## Autentikaatio

![Autentikaatio](images_for_readme/image-8.png)

Autentikaatio toteutettiin jsonwebtokenilla

## Logger

![Logger](images_for_readme/image-9.png)

Itsetehty logger, joka tallentaa tekstitiedostoon tapahtumia

# Controllerit

## checkToken controller

![checkToken controller](images_for_readme/image-10.png)

Controlleri tarkistaa että lähetetty tokeni on validi

## login controller

![login controller](images_for_readme/image-11.png)

Controlleri toimii vaiheittain:
1. Tarkistaa saapuiko nimi ja salasana
2. Etsii onko käyttäjänimellä käyttäjää tietokannassa
3. Tarkistaa vastaako salasana
4. Luo ja allekirjoittaa tokenin käyttäjälle
5. Vastaa pyyntöön

Missä tahansa virhetilanteessa controlleri vastaa etupuolelle halutulla tavalla

## register controller

![register controller](images_for_readme/image-12.png)

Controlleri toimii vaiheittain:
1. Tarkistaa saapuiko tarvittavat tiedot
2. Tarkistaa ettei käyttäjää ole samalla sähköpostilla jo
3. Tarkistaa että salasana ja salasanan vahvistus ovat samat
4. Hajauttaa salasanan
5. Luo käyttäjän
5. Tallentaa käyttäjän

Missä tahansa virhetilanteessa controlleri vastaa etupuolelle halutulla tavalla

## harjoite controller 

![harjoite controller1](images_for_readme/image-13.png)

getLatestWorkoutTemplateId-funktiota käytetään edellisen harjoitekerran tulosten hakemista varten.

getWorkoutsByTemplateId-funktiota käytetään kaikkien harjoitteiden hakuun tietyn harjoitepohjan mukaan

![harjoite controller2](images_for_readme/image-14.png)

createWorkout-funktio luo uuden tehdyn harjoitteen saatujen tietojen perusteella

![harjoite controller3](images_for_readme/image-15.png)

deleteWorkout-funktio poistaa tehdyn harjoitteen

![harjoite controller4](images_for_readme/image-16.png)

updateWorkout-funktio päivittää tehdyn saaduilla tiedoilla

## harjoitepohja controller

![harjoitepohja controller1](images_for_readme/image-17.png)

getWorkoutsByUserId-funktio hakee kaikki tehdyt harjoitteet käyttäjäIdn perusteella

createWorkoutTemplate-funktio luo uuden harjoitepohjan saatujen tietojen perusteella

![harjoitepohja controller2](images_for_readme/image-18.png)

deleteWorkoutTemplate-funktio poistaa harjoitepohjan saadun idn perusteella

![harjoitepohja controller3](images_for_readme/image-19.png)

updateWorkoutTemplate-funktio päivittää harjoitepohjan saaduilla tiedoilla