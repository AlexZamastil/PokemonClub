import { useEffect, useState } from 'react';
import { ArrowRight, Check, ChevronDown, Menu, X } from 'lucide-react';
import { clubApi, isDemoMode } from './services/clubApi.js';
import { clubCopy } from './i18n/clubCopy.js';
import { AboutPage, AlbumPage, HistoryPage, HomePage, JournalPage, PlayerProfilePage, PlayersPage, PostPage, SchedulePage, TournamentPage, TournamentsPage, VenuesPage } from './pages/ClubPages.jsx';
import { PokemonArt } from './components/PokemonArt.jsx';

function parseRoute() {
  const segments = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  const [path, id] = segments;
  if (path === 'events') return { page: 'tournaments' };
  if (path === 'journal' && id) return { page: 'post', id };
  if (path === 'album') return { page: 'album' };
  if (path === 'players' && id) return { page: 'player', id };
  if (path === 'history' && id) return { page: 'history', id };
  if (path === 'tournaments' && id) return { page: 'tournament', id };
  if (path === 'map' && id) return { page: 'map', id };
  if (['tournaments', 'schedule', 'players', 'history', 'journal', 'map', 'about', 'account'].includes(path)) return { page: path };
  return { page: 'home' };
}

function routePokemon(route) {
  if (route.page === 'home' || route.page === 'account') return 'pikachu';
  if (route.page === 'players' || route.page === 'about') return 'eevee';
  if (route.page === 'player') return route.id === 'dvorakdeck' ? 'gengar' : route.id === 'sedlistka' ? 'mimikyu' : 'pikachu';
  if (route.page === 'history') return 'bulbasaur';
  if (route.page === 'tournaments') return 'gengar';
  if (route.page === 'tournament') return route.id === 'sedlistka-masters' ? 'gengar' : 'pikachu';
  if (route.page === 'schedule') return 'snorlax';
  if (route.page === 'journal') return 'mimikyu';
  if (route.page === 'post') return 'jigglypuff';
  if (route.page === 'album') return 'snorlax';
  return 'squirtle';
}

function RegistrationDialog({ tournament, language, t, onClose }) {
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  async function submit(event) {
    event.preventDefault();
    setPending(true);
    setError('');
    const data = new FormData(event.currentTarget);
    try {
      await clubApi.register({ eventId: tournament.id, name: data.get('name'), email: data.get('email'), format: tournament.format });
      setDone(true);
    } catch {
      setError(t.registrationError);
    } finally {
      setPending(false);
    }
  }
  const shownName = language === 'cs' ? tournament.nameCs || tournament.name : tournament.name;
  return <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="dialog night-dialog" role="dialog" aria-modal="true" aria-labelledby="signup-title"><button className="icon-button dialog-close" onClick={onClose} aria-label={t.close}><X size={20} /></button>{done ? <div className="success-state"><span className="success-icon"><Check size={25} /></span><p className="eyebrow">{t.registerSuccess}</p><h2 id="signup-title">{t.registerSuccess}</h2>{isDemoMode && <p className="demo-note">{t.registerDemo}</p>}<button className="button button-yellow" onClick={onClose}>{t.close} <ArrowRight size={15} /></button></div> : <><p className="eyebrow">{t.registrationEyebrow} / {t.event}</p><h2 id="signup-title">{t.registrationTitle}</h2><p className="dialog-copy">{shownName}</p><form className="register-form" onSubmit={submit}><label>{t.name}<input name="name" autoComplete="name" placeholder={t.namePlaceholder} required /></label><label>{t.email}<input name="email" type="email" autoComplete="email" placeholder={t.emailPlaceholder} required /></label><label>{t.format}<select name="format" defaultValue={tournament.format}><option>{tournament.format}</option></select><ChevronDown size={15} className="select-chevron" /></label><button className="button button-red form-submit" type="submit" disabled={pending}>{pending ? t.sending : t.register} <ArrowRight size={15} /></button>{error && <p className="form-error" role="alert">{error}</p>}</form></>}</section></div>;
}

function AccountPage({ t }) {
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState('');
  async function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await clubApi.createUser({ name: data.get('name'), email: data.get('email') });
      setComplete(true);
    } catch {
      setError(t.loadError);
    }
  }
  return <section className="account-section section-wrap"><div className="account-copy"><p className="eyebrow">{t.accountLabel}</p><h1>{t.accountTitle}</h1><p>{t.aboutText}</p></div><div className="account-panel">{complete ? <div className="success-state"><span className="success-icon"><Check size={25} /></span><h2>{t.profileSent}</h2>{isDemoMode && <p className="demo-note">{t.registerDemo}</p>}</div> : <form className="register-form" onSubmit={submit}><label>{t.name}<input name="name" autoComplete="name" placeholder={t.namePlaceholder} required /></label><label>{t.email}<input name="email" type="email" autoComplete="email" placeholder={t.emailPlaceholder} required /></label><button className="button button-red form-submit" type="submit">{t.createProfile} <ArrowRight size={15} /></button>{error && <p className="form-error" role="alert">{error}</p>}</form>}</div></section>;
}

function ClubApp() {
  const [language, setLanguage] = useState(() => localStorage.getItem('club-language') || 'cs');
  const [route, setRoute] = useState(parseRoute);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resource, setResource] = useState({ loading: false, error: false, data: null });
  const [signup, setSignup] = useState(null);
  const t = clubCopy[language];

  useEffect(() => {
    const syncRoute = () => { setRoute(parseRoute()); setMenuOpen(false); setSignup(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('club-language', language);
  }, [language]);

  useEffect(() => {
    let active = true;
    async function loadPageData() {
      setResource({ loading: true, error: false, data: null });
      try {
        let data = null;
        if (['home', 'tournaments', 'schedule'].includes(route.page)) {
          const [tournaments, venues] = await Promise.all([clubApi.getTournaments(language), clubApi.getVenues(language)]);
          data = { tournaments: tournaments.map((item) => ({ ...item, venueName: item.venueName || venues.find((venue) => venue.id === item.venueId)?.name })), venues };
        } else if (route.page === 'players') {
          data = { players: await clubApi.getPlayers(language) };
        } else if (route.page === 'player') {
          const [player, history] = await Promise.all([clubApi.getPlayer(route.id, language), clubApi.getPlayerHistory(route.id, language)]);
          data = { player, history };
        } else if (route.page === 'history') {
          const [rows, player] = await Promise.all([route.id ? clubApi.getPlayerHistory(route.id, language) : clubApi.getHistory(language), route.id ? clubApi.getPlayer(route.id, language) : null]);
          data = { rows, player };
        } else if (route.page === 'tournament') {
          const [tournament, venues] = await Promise.all([clubApi.getTournament(route.id, language), clubApi.getVenues(language)]);
          data = { tournament, venues, venue: venues.find((venue) => venue.id === tournament?.venueId) };
        } else if (route.page === 'map') {
          data = { venues: await clubApi.getVenues(language) };
        } else if (route.page === 'journal') {
          data = { posts: await clubApi.getPosts(language) };
        } else if (route.page === 'post') {
          data = { post: await clubApi.getPost(route.id, language) };
        } else if (route.page === 'album') {
          data = { album: await clubApi.getAlbum(language) };
        }
        if (active) setResource({ loading: false, error: false, data });
      } catch {
        if (active) setResource({ loading: false, error: true, data: null });
      }
    }
    loadPageData();
    return () => { active = false; };
  }, [route.page, route.id, language]);

  const pageData = resource.data || {};
  const navItems = [
    ['tournaments', t.tournaments, '#/tournaments'], ['schedule', t.schedule, '#/schedule'], ['players', t.players, '#/players'], ['journal', t.journal, '#/journal'], ['album', t.album, '#/album'], ['history', t.history, '#/history'], ['map', t.venues, '#/map'],
  ];
  let page;
  if (resource.error) page = <section className="page-section section-wrap"><p className="eyebrow">{t.loadError}</p></section>;
  else if (route.page === 'home') page = <HomePage t={t} tournaments={pageData.tournaments || []} loading={resource.loading} language={language} />;
  else if (route.page === 'players') page = <PlayersPage t={t} players={pageData.players || []} loading={resource.loading} language={language} />;
  else if (route.page === 'player') page = <PlayerProfilePage t={t} player={pageData.player} history={pageData.history || []} loading={resource.loading} language={language} />;
  else if (route.page === 'history') page = <HistoryPage t={t} rows={pageData.rows || []} player={pageData.player} loading={resource.loading} language={language} />;
  else if (route.page === 'tournaments') page = <TournamentsPage t={t} tournaments={pageData.tournaments || []} loading={resource.loading} language={language} />;
  else if (route.page === 'tournament') page = <TournamentPage t={t} tournament={pageData.tournament} venue={pageData.venue} loading={resource.loading} language={language} onRegister={setSignup} />;
  else if (route.page === 'schedule') page = <SchedulePage t={t} tournaments={pageData.tournaments || []} loading={resource.loading} language={language} />;
  else if (route.page === 'map') page = <VenuesPage t={t} venues={pageData.venues || []} loading={resource.loading} language={language} selectedId={route.id} />;
  else if (route.page === 'journal') page = <JournalPage t={t} posts={pageData.posts || []} loading={resource.loading} language={language} />;
  else if (route.page === 'post') page = <PostPage t={t} post={pageData.post} loading={resource.loading} language={language} />;
  else if (route.page === 'album') page = <AlbumPage t={t} cards={pageData.album || []} loading={resource.loading} language={language} />;
  else if (route.page === 'about') page = <AboutPage t={t} />;
  else page = <AccountPage t={t} />;

  return <div className="night-club-app"><div className="club-topline"><span className="topline-signal" />{t.topLine}<div className="language-switch" role="group" aria-label={t.language}><button className={language === 'cs' ? 'selected' : ''} onClick={() => setLanguage('cs')} aria-pressed={language === 'cs'}>CS</button><button className={language === 'en' ? 'selected' : ''} onClick={() => setLanguage('en')} aria-pressed={language === 'en'}>EN</button></div></div><header className="club-header"><a className="club-logo" href="#/" aria-label={t.brand}><span className="club-logo-ball"><i /></span><span>{t.brand}<small>{t.brandSub}</small></span></a><button className="icon-button mobile-menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button><nav className={menuOpen ? 'club-nav nav-open' : 'club-nav'} aria-label="Main navigation">{navItems.map(([id, label, href]) => <a className={route.page === id || (id === 'journal' && route.page === 'post') || (id === 'players' && route.page === 'player') || (id === 'history' && route.page === 'history') || (id === 'tournaments' && route.page === 'tournament') || (id === 'map' && route.page === 'map') ? 'active' : ''} href={href} key={id}>{label}</a>)}</nav><a className="button button-yellow header-join" href="#/account">{t.join} <ArrowRight size={15} /></a></header><main key={`${route.page}-${route.id || ''}`} className={`route-main route-${route.page} mascot-${routePokemon(route)}`}><PokemonArt className="route-mascot" pokemon={routePokemon(route)} alt={t.pokemonAlt} />{page}</main><footer className="club-footer"><a className="footer-glyph" href="#/">AK</a><p>{t.footer}<span>{t.foot}</span></p><a href="#/about">{t.about} <ArrowRight size={14} /></a></footer>{signup && <RegistrationDialog tournament={signup} language={language} t={t} onClose={() => setSignup(null)} />}</div>;
}

export default ClubApp;