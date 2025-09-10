# World Clock App

## Beskrivning
Detta är en React + TypeScript-applikation som visar aktuell tid i olika städer runt om i världen. Användaren kan:
- Se sin aktuella plats med lokal tid.
- Söka efter städer och lägga till dem i sin lista.
- Se tiden både digitalt och analogt.
- Lägga till egna städer med namn, land och tidszon.
- Inställningar sparas i `localStorage` för nästa besök.

Applikationen är byggd med responsiv design och fungerar bra på mobil, surfplatta och desktop.

## UI-skisser
När jag skissade gränssnittet tänkte jag på enkelhet och tydlighet. Fokus låg på:
- Hög läsbarhet
- Enkel navigering mellan hem- och detaljsida
- Knappar för att växla mellan digital och analog klocka

[Se Figma-skisser här](https://www.figma.com/) *(lägg in riktig länk)*

## Struktur och komponenter

### Komponenter
- **HomePage** – Huvudsida som visar sökfält, nuvarande plats och valda städer.
- **CityDetailPage** – Detaljsida för en stad med bakgrundsbild och klocka.
- **CurrentLocation** – Visar användarens aktuella tidzon och tid.
- **TimeBadge** – Visar en stad och dess tid i kortformat.
- **SearchBar** – Sökfält för att filtrera städer.
- **AddCityForm** – Formulär för att lägga till egna städer.
- **List** – Generisk komponent för att rendera listor av objekt.

### Funktioner/logik utanför komponenter
- **Utils**
  - `time.ts` – Funktioner för att formatera tid (`formatLocalTime`) och hämta browser timezone.
  - `localStorage.ts` – Hjälpfunktioner för att spara och hämta städer från `localStorage`.
- **Type guards**
  - `isCity` i `models.ts` för att säkerställa att objekt verkligen är av typen `City`.
  
**Motivering:** Logik som inte är direkt kopplad till rendering ligger utanför komponenter för återanvändbarhet och ren separation av concerns.

### Typer och interfaces
- `City`, `CityDraft`, `ClockSettings` i `models.ts`.
- `TimeBadgeProps`, `AddCityFormProps`, `ListProps<T>` definierade för tydlig typning och återanvändning.

**Motivering:** Alla typer som används i flera komponenter ligger i `models.ts` för central hantering och typkontroll.

## State och props
- State hanteras med `useState` och `useEffect` där det behövs.
- `props` används för att skicka data mellan komponenter (t.ex. `onAdd`, `renderItem` i List).
- Generics används i `List` för att återanvända komponenten med olika datatyper.

## Git-användning
- Varje större funktion/ändring har committats med tydligt meddelande, t.ex.:
  - `feat: add analog clock toggle`
  - `fix: handle city detail localStorage bug`
- Branching användes för större features.
- Testade applikationen lokalt innan merge till main för att säkerställa att alla funktioner fungerade.

## Testning
- Testade att:
  - Sökfältet filtrerar korrekt.
  - Egen stad kan läggas till och visas i listan.
  - Digital/analog växling fungerar 
  - TypeScript type guards fungerar genom att filtrera ogiltiga objekt.
  - Generiska `List` renderar korrekt för både `City[]` och `string[]`.

## Responsiv design
- CSS med flexbox och media queries för mobilvänligt gränssnitt.
- Analog klocka och digital tid centreras och skalas efter skärmstorlek.

