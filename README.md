# Andyho Klubík

A responsive, hash-routed React SPA for Andyho Klubík, a local Pokémon club on Vysokomýtsko. Czech is the default language; English is available from the top bar. Pokémon Solid/Hollow are reserved for the club wordmark, selected headings, and buttons. Space Grotesk is used for readable copy and IBM Plex Mono for technical labels.

## Pages

- `#/` — club dispatch and next tournaments
- `#/players` and `#/players/:id` — trainer directory and player profiles
- `#/history` and `#/history/:playerId` — club-wide or player match history
- `#/journal` and `#/journal/:postId` — club dispatches and full articles
- `#/album` — Andy's Pokémon card collection with his notes for each card
- `#/tournaments` and `#/tournaments/:id` — tournament board and individual dossiers
- `#/schedule` — chronological check-in and round schedule
- `#/map` and `#/map/:venueId` — venue descriptions and OpenStreetMap links
- `#/about` and `#/account` — club notes and player profile intake

## Run locally

Install a current Node.js LTS release, then run:

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Backend connection

Copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL` to the separate backend origin. Requests append `/api` and include `?locale=cs` or `?locale=en` on localized GETs. The frontend expects:

- `GET /api/tournaments?locale=cs` returning an array or `{ "tournaments": [...] }`. Rows use `id`, `name`, optional `nameCs`, `format`, ISO `date`, `startTime`, `checkIn`, `venueId`, `seatsLeft`, `capacity`, `status`, optional `statusCs`, `description`, optional `descriptionCs`, `rounds`, and `entry`.
- `GET /api/tournaments/:id?locale=cs` returning one tournament dossier.
- `GET /api/schedule?locale=cs` returning schedule rows using the tournament fields above.
- `GET /api/players?locale=cs` returning `{ "players": [...] }` or an array with `id`, `handle`, `name`, optional `nameCs`, `format`, `city`, `joined`, `wins`, `losses`, `bio`, optional `bioCs`, `favorite`, and `color`.
- `GET /api/players/:id?locale=cs` returning one player profile.
- `GET /api/players/:id/history?locale=cs` and `GET /api/history?locale=cs` returning `{ "results": [...] }` or an array with `date`, `event`, optional `eventCs`, `placement`, optional `placementCs`, `record`, `playerId`, and `handle` for club-wide results.
- `GET /api/venues?locale=cs` returning `{ "venues": [...] }` or an array with `id`, `name`, `address`, `description`, optional `descriptionCs`, `mapUrl`, `note`, and optional `noteCs`.
- `GET /api/posts?locale=cs` returning `{ "posts": [...] }` or an array with `id`, `date`, `category`, optional `categoryCs`, `title`, optional `titleCs`, `excerpt`, optional `excerptCs`, `body`, optional `bodyCs`, and `image`.
- `GET /api/posts/:id?locale=cs` returning one article.
- `GET /api/album?locale=cs` returning `{ "cards": [...] }` or an array with `id`, `imageUrl`, `name`, optional `nameCs`, `setName`, `collectorNumber`, `andyNote`, optional `andyNoteCs`, and optional `sourceUrl`.
- `POST /api/registrations` with `{ "eventId", "name", "email", "format" }`.
- `POST /api/users` with `{ "name", "email" }`.

Requests use JSON. In the absence of `VITE_API_BASE_URL`, sample tournaments, trainers, match records, and venues are shown; the album stays empty until actual card scans and Andy's notes are supplied. Form submissions stay in demo mode. For cross-origin requests, configure the backend's CORS policy for the frontend origin. Authentication, validation rules, and privacy/consent requirements should be defined with the backend before accepting real users.

## Before publishing

Tournament names such as Dvořisko Open and Sedlíšťka Masters, meetup points, trainer profiles, results, journal posts, and map queries are sample content. Replace precise dates, venue details, and club records with club-approved information. Map links use OpenStreetMap search results because exact meetup addresses have not been supplied. The tournament photos are Wikimedia Commons images: David from Washington, DC, “Pokémon World Championships 2014” (CC BY 2.0), and Captain Galaxy, “Entrance of the 2022 London Pokémon World Championships” (CC BY 4.0). Visible credits link to source pages and licenses. Transparent Pokémon PNG artwork in `src/assets/pokemon/` is bundled locally from the PokeAPI sprites repository. The Album demo intentionally contains no sample cards; add real card scans and Andy's notes through `GET /api/album`.