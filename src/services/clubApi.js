import { tournamentPhotos } from '../data/tournamentPhotos.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || '';

const sampleTournaments = [
  { id: 'dvorisko-open', demo: true, name: 'Dvořisko Open', nameCs: 'Dvořisko Open', format: 'Pokémon TCG', date: '2026-10-18', startTime: '10:30', checkIn: '10:00', venueId: 'dvorisko', seatsLeft: 12, capacity: 32, status: 'Registration open', statusCs: 'Registrace otevřena', description: 'A friendly local TCG tournament near Vysoké Mýto. Swiss rounds, open tables, and loaner decks for first-timers.', descriptionCs: 'Přátelský turnaj Pokémon TCG u Vysokého Mýta. Švýcarský systém, otevřené stoly a balíčky k zapůjčení pro nováčky.', rounds: 4, entry: 'Free', entryCs: 'Zdarma' },
  { id: 'sedlistka-masters', demo: true, name: 'Sedlíšťka Masters', nameCs: 'Sedlíšťka Masters', format: 'Pokémon VGC', date: '2026-10-25', startTime: '09:00', checkIn: '08:30', venueId: 'sedlistka', seatsLeft: 8, capacity: 48, status: 'Registration open', statusCs: 'Registrace otevřena', description: 'A one-day VGC bracket for local trainers. Bring your team sheet, your best reads, and something for the snack table.', descriptionCs: 'Jednodenní VGC pavouk pro místní trenéry. Vezmi soupisku, dobré odhady a něco na společný stůl s občerstvením.', rounds: 6, entry: 'Free', entryCs: 'Zdarma' },
  { id: 'myto-league-night', demo: true, name: 'Mýto League Night', nameCs: 'Mýtský ligový večer', format: 'Pokémon TCG', date: '2026-11-08', startTime: '16:00', checkIn: '15:30', venueId: 'vysoke-myto', seatsLeft: 20, capacity: 36, status: 'Registration open', statusCs: 'Registrace otevřena', description: 'A relaxed evening league in Vysoké Mýto. New deck, old deck, no deck yet: there is a seat for you.', descriptionCs: 'Pohodový ligový večer ve Vysokém Mýtě. Nový balíček, starý balíček nebo zatím žádný: místo u stolu se najde.', rounds: 3, entry: 'Free', entryCs: 'Zdarma' },
];

const samplePlayers = [
  { id: 'andy', handle: 'andy', name: 'Andy', nameCs: 'Andy', format: 'TCG', city: 'Vysoké Mýto', joined: '2024', wins: 24, losses: 9, bio: 'Club host, deck tinkerer, and keeper of the spare sleeves.', bioCs: 'Hostitel klubu, stavitel balíčků a správce náhradních obalů.', favorite: 'Gengar', color: 'red' },
  { id: 'dvorakdeck', handle: 'dvorakdeck', name: 'Marek Dvorak', nameCs: 'Marek Dvořák', format: 'VGC', city: 'Dvořisko', joined: '2023', wins: 31, losses: 12, bio: 'VGC regular from Dvorisko. Always ready to help someone test a team.', bioCs: 'Pravidelný hráč VGC z Dvořiska. Rád pomůže otestovat tým.', favorite: 'Rotom', color: 'blue' },
  { id: 'sedlistka', handle: 'sedlistka', name: 'Tereza Novotna', nameCs: 'Tereza Novotná', format: 'TCG', city: 'Sedlíšťka', joined: '2025', wins: 11, losses: 8, bio: 'Here for the people, the trades, and one more round after the event.', bioCs: 'Kvůli lidem, výměnám a ještě jednomu kolu po turnaji.', favorite: 'Oddish', color: 'yellow' },
];

const sampleHistory = {
  andy: [
    { date: '2026-10-04', event: 'Vysoke Myto League Night', eventCs: 'Ligový večer ve Vysokém Mýtě', placement: '3rd', placementCs: '3. místo', record: '3–1' },
    { date: '2026-09-20', event: 'Dvorisko Open', eventCs: 'Dvořisko Open', placement: '5th', placementCs: '5. místo', record: '2–2' },
    { date: '2026-09-06', event: 'Myto League Night', eventCs: 'Mýtský ligový večer', placement: '1st', placementCs: '1. místo', record: '4–0' },
  ],
  dvorakdeck: [
    { date: '2026-10-04', event: 'Sedlistka Masters', eventCs: 'Sedlíšťka Masters', placement: '1st', placementCs: '1. místo', record: '5–1' },
    { date: '2026-09-14', event: 'Dvorisko Open', eventCs: 'Dvořisko Open', placement: '4th', placementCs: '4. místo', record: '4–2' },
  ],
  sedlistka: [
    { date: '2026-10-04', event: 'Dvorisko Open', eventCs: 'Dvořisko Open', placement: '7th', placementCs: '7. místo', record: '1–3' },
    { date: '2026-09-20', event: 'Sedlistka Masters', eventCs: 'Sedlíšťka Masters', placement: '2nd', placementCs: '2. místo', record: '3–1' },
  ],
};

const sampleVenues = [
  { id: 'dvorisko', name: 'Dvořisko', address: 'Dvořisko, Vysoké Mýto, Czechia', description: 'A local meetup point for the Dvořisko Open. The precise venue is sample content; confirm the club post before travelling.', descriptionCs: 'Místo setkání pro Dvořisko Open. Přesné místo je ukázkové; před cestou ověř klubový příspěvek.', mapUrl: 'https://www.openstreetmap.org/search?query=Dvo%C5%99isko%2C%20Vysok%C3%A9%20M%C3%BDto', note: 'Meetup point to be confirmed', noteCs: 'Místo srazu bude upřesněno' },
  { id: 'sedlistka', name: 'Sedlíšťka', address: 'Sedlíšťka, Vysoké Mýto, Czechia', description: 'A countryside tournament meetup for Sedlíšťka Masters. Exact access details will be shared with registered trainers.', descriptionCs: 'Venkovské místo setkání pro Sedlíšťka Masters. Přesné pokyny dostanou přihlášení trenéři.', mapUrl: 'https://www.openstreetmap.org/search?query=Sedl%C3%AD%C5%A1%C5%A5ka%2C%20Vysok%C3%A9%20M%C3%BDto', note: 'Check event details for arrival info', noteCs: 'Podrobnosti příjezdu budou v akci' },
  { id: 'vysoke-myto', name: 'Vysoké Mýto', address: 'Vysoké Mýto, Pardubický kraj, Czechia', description: 'Our home base in the Vysoké Mýto area. The exact room or shop changes with the event.', descriptionCs: 'Naše základna na Vysokomýtsku. Konkrétní herna nebo sál se může podle akce měnit.', mapUrl: 'https://www.openstreetmap.org/search?query=Vysok%C3%A9%20M%C3%BDto%2C%20Czechia', note: 'Check the event listing for the exact spot', noteCs: 'Přesné místo najdeš v detailu akce' },
];

const samplePosts = [
  { id: 'bring-a-friend', demo: true, date: '2026-10-08', category: 'FIELD NOTES', categoryCs: 'ZPRÁVY Z TERÉNU', title: 'A little local league goes a long way', titleCs: 'I malá místní liga dokáže změnit hodně', excerpt: 'You do not need a perfect list or a testing crew. You just need a seat and one more round.', excerptCs: 'Nepotřebuješ dokonalý decklist ani testovací tým. Stačí místo u stolu a ještě jedno kolo.', body: ['The first time you walk into a new shop, every table can look like a final. Ours is not. The league is a place to learn matchups, ask rules questions, and meet the people you will see next week.', 'Bring a deck if you have one. If you do not, message the club and we will sort out a loaner before the doors open.'], bodyCs: ['Když poprvé vejdeš do nové herny, každý stůl může vypadat jako finále. U nás to tak není. Liga je místo, kde poznáš matchupy, zeptáš se na pravidla a potkáš lidi, které uvidíš i příští týden.', 'Vezmi si balíček, pokud ho máš. Pokud ne, napiš klubu a před začátkem ti nějaký půjčíme.'], ...tournamentPhotos[0] },
  { id: 'make-room', demo: true, date: '2026-09-29', category: 'PLAYER STORIES', categoryCs: 'PŘÍBĚHY HRÁČŮ', title: 'Make room at the table', titleCs: 'Udělej místo u stolu', excerpt: 'A few regulars share the small rituals that make a club feel like yours.', excerptCs: 'Pár stálic prozradí drobné rituály, díky kterým se klub stane i tvým místem.', body: ['We keep a spare chair open, trade binders out of the main aisle, and explain the same ruling without making anyone feel small. None of that is complicated. It is the culture we choose to keep.', 'Our best tournament memories are rarely about the final standing. They are the people who stayed to help pack up.'], bodyCs: ['Necháváme volnou židli, alba vyměňujeme mimo hlavní uličku a stejné pravidlo vysvětlíme znovu, aniž bychom někoho shazovali. Není na tom nic složitého. Jen si takovou kulturu chceme držet.', 'Na turnaje nejraději vzpomínáme ne kvůli umístění. Ale kvůli lidem, kteří po konci zůstali pomoct uklidit.'], ...tournamentPhotos[1] },
];

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}/api${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  if (!response.ok) throw new Error(`Club API request failed (${response.status})`);
  if (response.status === 204) return null;
  return response.json();
}

const localeQuery = (language) => `?locale=${encodeURIComponent(language)}`;

export const isDemoMode = !API_BASE_URL;

export const clubApi = {
  async getTournaments(language = 'cs') {
    if (isDemoMode) return sampleTournaments;
    const response = await request(`/tournaments${localeQuery(language)}`);
    return response.tournaments ?? response;
  },
  async getTournament(id, language = 'cs') {
    if (isDemoMode) return sampleTournaments.find((item) => item.id === id) ?? null;
    return request(`/tournaments/${encodeURIComponent(id)}${localeQuery(language)}`);
  },
  async getSchedule(language = 'cs') {
    if (isDemoMode) return sampleTournaments;
    const response = await request(`/schedule${localeQuery(language)}`);
    return response.events ?? response;
  },
  async getPlayers(language = 'cs') {
    if (isDemoMode) return samplePlayers;
    const response = await request(`/players${localeQuery(language)}`);
    return response.players ?? response;
  },
  async getPlayer(id, language = 'cs') {
    if (isDemoMode) return samplePlayers.find((item) => item.id === id) ?? null;
    return request(`/players/${encodeURIComponent(id)}${localeQuery(language)}`);
  },
  async getPlayerHistory(id, language = 'cs') {
    if (isDemoMode) return sampleHistory[id] ?? [];
    const response = await request(`/players/${encodeURIComponent(id)}/history${localeQuery(language)}`);
    return response.results ?? response;
  },
  async getHistory(language = 'cs') {
    if (isDemoMode) {
      const playersById = Object.fromEntries(samplePlayers.map((player) => [player.id, player]));
      return Object.entries(sampleHistory).flatMap(([playerId, rows]) => rows.map((row) => ({ ...row, playerId, handle: playersById[playerId].handle }))).sort((a, b) => b.date.localeCompare(a.date));
    }
    const response = await request(`/history${localeQuery(language)}`);
    return response.results ?? response;
  },
  async getVenues(language = 'cs') {
    if (isDemoMode) return sampleVenues;
    const response = await request(`/venues${localeQuery(language)}`);
    return response.venues ?? response;
  },
  async getPosts(language = 'cs') {
    if (isDemoMode) return samplePosts;
    const response = await request(`/posts${localeQuery(language)}`);
    return response.posts ?? response;
  },
  async getPost(id, language = 'cs') {
    if (isDemoMode) return samplePosts.find((post) => post.id === id) ?? null;
    return request(`/posts/${encodeURIComponent(id)}${localeQuery(language)}`);
  },
  async getAlbum(language = 'cs') {
    if (isDemoMode) return [];
    const response = await request(`/album${localeQuery(language)}`);
    return response.cards ?? response;
  },
  async getAlbumCard(id, language = 'cs') {
    if (isDemoMode) return null;
    return request(`/album/${encodeURIComponent(id)}${localeQuery(language)}`);
  },
  async register(registration) {
    if (isDemoMode) return { ...registration, status: 'demo' };
    return request('/registrations', { method: 'POST', body: JSON.stringify(registration) });
  },
  async createUser(user) {
    if (isDemoMode) return { ...user, status: 'demo' };
    return request('/users', { method: 'POST', body: JSON.stringify(user) });
  },
};