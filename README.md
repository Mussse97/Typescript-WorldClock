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

[Se Figma-skisser här](https://www.figma.com/design/mQb3fiNk9EhruZ7JnBEFIA/WorldClock?node-id=0-1&t=VlnekdZ6dKwnGgUZ-1) 

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
  - `Tillagt hemsida`
  - `Localstarage implementerad`
- Testade applikationen lokalt innan merge till main för att säkerställa att alla funktioner fungerade.

## Testning
- Testade att:
  - Sökfältet filtrerar korrekt.
  - Egen stad kan läggas till och visas i listan.
  - Digital/analog växling fungerar 
  - TypeScript type guards fungerar genom att filtrera ogiltiga objekt.
  - Generiska `List` renderar korrekt för både `City[]` och `string[]`.

## Fördelar med TypeScript i projektet

I det här projektet har TypeScript gett flera konkreta fördelar jämfört med att enbart använda JavaScript:

### 1. Utility types (`CityDraft`)
Vi skapade en `CityDraft`-typ med hjälp av `Pick` för att bara inkludera de fält som behövs när en användare lägger till en ny stad (`name`, `country`, `timezone`).  
➡️ Fördelen är att TypeScript tvingar oss att alltid använda rätt fält, och varnar oss direkt om något saknas eller skrivs fel. I JavaScript hade vi inte fått den kontrollen förrän i runtime.

### 2. Type Guards (`isCity`)
Vi implementerade en type guard-funktion `isCity(obj: unknown): obj is City`.  
➡️ Detta gör att TypeScript kan avgöra om ett objekt verkligen är en `City` innan vi använder det. På så sätt undviker vi att råka anropa egenskaper på felaktiga objekt. I JavaScript hade samma misstag orsakat krascher i webbläsaren.

### 3. Generics i listkomponenten
Vi byggde en återanvändbar komponent `List<T>` som kan rendera olika typer av data.  
➡️ Fördelen är att TypeScript säkerställer att vi bara skickar in korrekt typ av data. Om vi skickar felaktiga props får vi ett tydligt kompilatorfel. I JavaScript hade felet istället upptäckts först vid körning.

---

## Hur TypeScript transpileras till JavaScript
Projektet använder Vite som byggverktyg. När vi kör `npm run dev` eller `npm run build` transpileras all TypeScript-kod (`.ts` och `.tsx`) till vanlig JavaScript.  
- TypeScript-kompilatorn (`tsc`) analyserar koden statiskt, men själva typinformationen tas bort vid transpileringssteget.  
- Webbläsaren kör alltså enbart den färdiga JavaScript-koden, medan vi som utvecklare får hjälp av typerna under utveckling.


## Responsiv design
- CSS med flexbox och media queries för mobilvänligt gränssnitt.
- Analog klocka och digital tid centreras och skalas efter skärmstorlek.

