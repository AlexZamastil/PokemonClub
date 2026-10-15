import { useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, ExternalLink, MapPin, Search, Shield, Sparkles, Swords, Trophy, UserRound, Users } from 'lucide-react';
import { PokemonArt } from '../components/PokemonArt.jsx';
import { tournamentPhotos } from '../data/tournamentPhotos.js';

export function localized(item, field, language) {
  return language === 'cs' && item?.[`${field}Cs`] ? item[`${field}Cs`] : item?.[field];
}

function formatDate(date, language, options = { weekday: 'short', day: 'numeric', month: 'short' }) {
  return new Intl.DateTimeFormat(language === 'cs' ? 'cs-CZ' : 'en-US', options).format(new Date(`${date}T12:00:00`));
}

function PageTitle({ eyebrow, title, accent, description }) {
  return <div className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title} <span>{accent}</span></h1>{description && <p className="page-intro">{description}</p>}</div>;
}

function LoadingState({ t }) {
  return <p className="page-status"><span className="signal-dot" />{t.loading}</p>;
}

function PhotoCredit({ photo, t }) {
  return <span className="photo-credit">{t.photoBy} <a href={photo.source} target="_blank" rel="noreferrer">{photo.photographer}</a> · <a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a></span>;
}

function TournamentPhotoGallery({ t }) {
  return <section className="tournament-photo-gallery section-wrap">
    <div className="section-title-row"><div><p className="eyebrow">AK / WORLDS ARCHIVE</p><h2>{t.tournamentPhotosTitle}</h2></div><p className="photo-gallery-intro">{t.tournamentPhotosIntro}</p></div>
    <div className="tournament-photo-grid">{tournamentPhotos.map((photo, index) => <figure className={`tournament-photo tournament-photo-${index + 1}`} key={photo.id}>
      <a href={photo.source} target="_blank" rel="noreferrer"><img src={photo.src} alt={photo.alt} loading="lazy" /></a>
      <figcaption><strong>{photo.title}</strong><PhotoCredit photo={photo} t={t} /></figcaption>
    </figure>)}</div>
  </section>;
}

function NotFound({ t, back }) {
  return <section className="page-section section-wrap"><PageTitle eyebrow="404 // LOST SIGNAL" title={t.notFound} accent="" /><a className="zine-link" href={back}>{t.backToBoard} <ArrowRight size={15} /></a></section>;
}

function TournamentCard({ tournament, language, t, index }) {
  return <article className="tournament-card"><div className="tournament-card-top"><span className="serial">{t.number} {String(index + 1).padStart(2, '0')} / {tournament.format}</span><span className="availability"><span />{localized(tournament, 'status', language)}</span></div><a href={`#/tournaments/${tournament.id}`} className="tournament-card-title"><h2>{localized(tournament, 'name', language)}</h2><ArrowRight size={20} /></a><div className="tournament-card-bottom"><span><CalendarDays size={14} />{formatDate(tournament.date, language)}</span><span><MapPin size={14} />{tournament.venueName}</span></div></article>;
}

export function HomePage({ t, tournaments, loading, language }) {
  const next = tournaments[0];
  return <>
    <section className="after-hours-hero section-wrap"><div className="hero-copy"><p className="eyebrow"><span className="signal-dot" />{t.heroTag}</p><h1 className="pixel-title">{t.heroTitle.split('\n').map((line) => <span key={line}>{line}</span>)}</h1><p className="hero-description">{t.heroCopy}</p><div className="hero-actions"><a className="button button-red" href="#/tournaments">{t.heroAction} <ArrowRight size={16} /></a><a className="zine-link" href="#/players">{t.profileAction} <ArrowRight size={15} /></a></div><div className="hero-stats"><span><Users size={15} />{t.playerRun}</span><span><Swords size={15} />{t.allLevels}</span><span><Shield size={15} />{t.noGatekeeping}</span></div></div><div className="hero-poster"><img src={tournamentPhotos[0].src} alt={tournamentPhotos[0].alt} /><span className="poster-stamp">{t.heroStamp.split('\n').map((line) => <b key={line}>{line}</b>)}</span><div className="poster-footer"><span>AK / 26</span><span>{t.posterFoot}</span><PhotoCredit photo={tournamentPhotos[0]} t={t} /></div></div><aside className="next-signal"><div className="signal-head"><span className="signal-dot" />{t.statusLabel}</div>{loading ? <p>{t.loading}</p> : next ? <><p className="signal-name">{localized(next, 'name', language)}</p><p className="signal-date">{formatDate(next.date, language)} / {next.startTime}</p><p className="signal-place">{next.venueName}</p><a href={`#/tournaments/${next.id}`}>{t.details} <ArrowRight size={14} /></a></> : <p>{t.noSchedule}</p>}</aside><div className="hero-tape">{t.tape}</div></section>
    <section className="home-board section-wrap"><div className="section-title-row"><div><p className="eyebrow">01 / {t.tournamentBoard}</p><h2>{t.upcoming}</h2></div><a className="zine-link" href="#/tournaments">{t.allTournaments} <ArrowRight size={15} /></a></div>{loading ? <LoadingState t={t} /> : <div className="tournament-list">{tournaments.slice(0, 3).map((item, index) => <TournamentCard key={item.id} tournament={item} language={language} t={t} index={index} />)}</div>}<a className="album-home-link" href="#/album">{t.album} <ArrowRight size={16} /></a></section>
    <section className="dispatch-strip"><div className="section-wrap dispatch-inner"><span className="dispatch-mark">✳</span><p>{t.foot}</p><a href="#/schedule">{t.schedule} <ArrowRight size={15} /></a></div></section>
  </>;
}

export function PlayersPage({ t, players, loading, language }) {
  const [search, setSearch] = useState('');
  const [format, setFormat] = useState('all');
  const visiblePlayers = players.filter((player) => `${player.handle} ${player.name} ${player.city} ${player.format}`.toLowerCase().includes(search.toLowerCase()) && (format === 'all' || player.format.toLowerCase() === format));
  return <section className="page-section section-wrap"><PageTitle eyebrow={`02 / ${t.trainerDirectory}`} title={t.trainerTitle} accent={t.trainerAccent} description={t.trainerIntro} /><p className="demo-note">{t.demoContent}</p><div className="directory-controls"><label className="search-control"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t.searchPlaceholder} aria-label={t.searchPlayers} /></label><div className="filter-tabs" role="group" aria-label={t.format}><button className={format === 'all' ? 'selected' : ''} onClick={() => setFormat('all')}>{t.allFormats}</button><button className={format === 'tcg' ? 'selected' : ''} onClick={() => setFormat('tcg')}>TCG</button><button className={format === 'vgc' ? 'selected' : ''} onClick={() => setFormat('vgc')}>VGC</button></div><a className="button button-yellow" href="#/account">{t.join} <ArrowRight size={15} /></a></div>{loading ? <LoadingState t={t} /> : visiblePlayers.length ? <div className="player-grid">{visiblePlayers.map((player, index) => <a href={`#/players/${player.id}`} className={`player-file player-${player.color}`} key={player.id}><div className="file-index">{t.filePrefix} / {String(index + 1).padStart(2, '0')}</div><div className="player-avatar"><UserRound size={30} /></div><p className="player-handle">@{player.handle}</p><h2>{localized(player, 'name', language)}</h2><p className="player-meta">{player.city} <span>·</span> {player.format}</p><div className="player-record"><span>{t.record}</span><strong>{player.wins}–{player.losses}</strong></div><span className="file-open">{t.viewProfile} <ArrowRight size={14} /></span></a>)}</div> : <p className="page-status">{t.noPlayers}</p>}</section>;
}

export function PlayerProfilePage({ t, player, history, loading, language }) {
  if (loading) return <section className="page-section section-wrap"><LoadingState t={t} /></section>;
  if (!player) return <NotFound t={t} back="#/players" />;
  return <section className="page-section section-wrap"><a className="back-link" href="#/players"><ArrowLeft size={15} />{t.backToPlayers}</a><div className={`player-profile-head player-${player.color}`}><div className="player-avatar player-avatar-large"><UserRound size={48} /></div><div><p className="eyebrow">{t.profileKicker} // @{player.handle}</p><h1>{localized(player, 'name', language)}</h1><p className="profile-location"><MapPin size={15} />{player.city} <span>·</span> {player.format}</p></div></div><div className="profile-layout"><div className="profile-bio"><p className="eyebrow">{t.aboutTrainer}</p><p>{localized(player, 'bio', language)}</p><div className="profile-facts"><div><span>{t.joined}</span><strong>{player.joined}</strong></div><div><span>{t.favorite}</span><strong>{player.favorite}</strong></div></div></div><div className="profile-record"><p className="eyebrow">{t.tournamentRecord}</p><div className="record-numbers"><strong>{player.wins}</strong><span>W</span><i>/</i><strong>{player.losses}</strong><span>L</span></div><p>{player.format} · {player.city}</p></div></div><div className="section-title-row compact-title"><div><p className="eyebrow">03 / {t.historyKicker}</p><h2>{t.pastRuns}</h2></div><a className="zine-link" href={`#/history/${player.id}`}>{t.fullHistory} <ArrowRight size={15} /></a></div><HistoryTable rows={history} t={t} language={language} /></section>;
}

function HistoryTable({ rows, t, language, showPlayer = false }) {
  if (!rows.length) return <p className="page-status">{t.noHistory}</p>;
  return <div className="result-list">{rows.map((row, index) => <article className="result-row" key={`${row.date}-${row.playerId || ''}-${row.event}`}><span className="result-number">{String(index + 1).padStart(2, '0')}</span><div className="result-main"><strong>{localized(row, 'event', language)}</strong>{showPlayer && <a href={`#/players/${row.playerId}`}>@{row.handle}</a>}</div><span className="result-date">{formatDate(row.date, language, { day: '2-digit', month: 'short', year: 'numeric' })}</span><span className="result-placement">{localized(row, 'placement', language)}</span><span className="result-record">{row.record}</span></article>)}</div>;
}

export function HistoryPage({ t, rows, loading, language, player }) {
  if (loading) return <section className="page-section section-wrap"><LoadingState t={t} /></section>;
  return <section className="page-section section-wrap"><PageTitle eyebrow={`03 / ${t.historyKicker}`} title={player ? `@${player.handle}` : t.historyTitle} accent={player ? t.history : t.historyAccent} description={t.historyIntro} /><HistoryTable rows={rows} t={t} language={language} showPlayer={!player} />{player && <a className="back-link history-back" href={`#/players/${player.id}`}><ArrowLeft size={15} />{t.backToPlayers}</a>}</section>;
}

export function TournamentsPage({ t, tournaments, loading, language }) {
  const [format, setFormat] = useState('all');
  const shown = tournaments.filter((item) => format === 'all' || item.format.toLowerCase().includes(format));
  return <><section className="page-section section-wrap"><PageTitle eyebrow={`04 / ${t.tournamentBoard}`} title={t.tournamentTitle} accent={t.tournamentAccent} description={t.tournamentIntro} /><p className="demo-note">{t.demoContent}</p><div className="directory-controls"><div className="filter-tabs" role="group" aria-label={t.format}><button className={format === 'all' ? 'selected' : ''} onClick={() => setFormat('all')}>{t.allFormats}</button><button className={format === 'tcg' ? 'selected' : ''} onClick={() => setFormat('tcg')}>TCG</button><button className={format === 'vgc' ? 'selected' : ''} onClick={() => setFormat('vgc')}>VGC</button></div><a className="zine-link" href="#/schedule">{t.schedule} <ArrowRight size={15} /></a></div>{loading ? <LoadingState t={t} /> : <div className="tournament-list">{shown.map((item, index) => <TournamentCard key={item.id} tournament={item} language={language} t={t} index={index} />)}</div>}</section><TournamentPhotoGallery t={t} /></>;
}

export function TournamentPage({ t, tournament, venue, loading, language, onRegister }) {
  if (loading) return <section className="page-section section-wrap"><LoadingState t={t} /></section>;
  if (!tournament) return <NotFound t={t} back="#/tournaments" />;
  return <section className="page-section section-wrap"><a className="back-link" href="#/tournaments"><ArrowLeft size={15} />{t.backToBoard}</a><div className="tournament-detail-head"><p className="eyebrow">04 / {t.tournamentDossier} · {tournament.format}</p><h1>{localized(tournament, 'name', language)}</h1><p>{localized(tournament, 'description', language)}</p></div><div className="tournament-facts"><div><span><CalendarDays size={15} />{t.date}</span><strong>{formatDate(tournament.date, language, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong></div><div><span><Clock3 size={15} />{t.checkIn}</span><strong>{tournament.checkIn}</strong></div><div><span><Swords size={15} />{t.starts}</span><strong>{tournament.startTime}</strong></div><div><span><Users size={15} />{t.capacity}</span><strong>{tournament.seatsLeft} {t.seatsLeft}</strong></div></div><div className="tournament-body-grid"><div><p className="eyebrow">{t.overview}</p><ul className="bring-list">{t.bringList.map((item) => <li key={item}><span className="signal-dot" />{item}</li>)}</ul><div className="entry-note"><span>{t.entry}</span><strong>{localized(tournament, 'entry', language)}</strong><span>{t.rounds}</span><strong>{tournament.rounds}</strong></div></div><aside className="venue-ticket"><span className="eyebrow">{t.venue}</span><MapPin size={22} /><h2>{venue?.name || tournament.venueName}</h2><p>{venue?.address || tournament.venueName}</p><p>{localized(venue, 'description', language)}</p><a className="zine-link" href={`#/map/${venue?.id || tournament.venueId}`}>{t.mapVenue} <ArrowRight size={15} /></a><button className="button button-red" onClick={() => onRegister(tournament)}>{t.register} <ArrowRight size={15} /></button></aside></div></section>;
}

export function SchedulePage({ t, tournaments, loading, language }) {
  const sorted = [...tournaments].sort((a, b) => a.date.localeCompare(b.date));
  return <section className="page-section section-wrap"><PageTitle eyebrow={`05 / ${t.scheduleKicker}`} title={t.scheduleTitle} accent={t.scheduleAccent} description={t.scheduleIntro} />{loading ? <LoadingState t={t} /> : sorted.length ? <div className="schedule-list">{sorted.map((item, index) => <a className="schedule-row" href={`#/tournaments/${item.id}`} key={item.id}><span className="schedule-index">{String(index + 1).padStart(2, '0')}</span><span className="schedule-date">{formatDate(item.date, language, { weekday: 'short', day: '2-digit', month: 'short' })}</span><span className="schedule-title"><strong>{localized(item, 'name', language)}</strong><small>{item.format} · {item.venueName}</small></span><span className="schedule-time"><Clock3 size={14} />{item.checkIn} / {item.startTime}</span><ArrowRight size={17} /></a>)}</div> : <p className="page-status">{t.noSchedule}</p>}</section>;
}

export function VenuesPage({ t, venues, loading, language, selectedId }) {
  if (loading) return <section className="page-section section-wrap"><LoadingState t={t} /></section>;
  const selected = venues.find((item) => item.id === selectedId) || venues[0];
  return <section className="page-section section-wrap"><PageTitle eyebrow={`06 / ${t.mapKicker}`} title={t.mapTitle} accent={t.mapAccent} description={t.mapIntro} /><div className="map-layout"><div className="venue-list"><p className="eyebrow">{t.regulars}</p>{venues.map((venue, index) => <a className={`venue-row ${venue.id === selected?.id ? 'active' : ''}`} href={`#/map/${venue.id}`} key={venue.id}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{venue.name}</strong><small>{venue.address}</small></div><ArrowRight size={15} /></a>)}</div><article className="venue-sheet"><span className="venue-coordinate">{t.venueFile} // {selected?.id?.toUpperCase()}</span><MapPin className="venue-pin" size={34} /><h2>{selected?.name || t.regulars}</h2><p className="venue-address">{selected?.address || t.mapIntro}</p><p className="venue-description">{localized(selected, 'description', language) || t.mapIntro}</p>{selected?.note && <p className="access-note"><Sparkles size={15} />{localized(selected, 'note', language)}</p>}{selected?.mapUrl && <a className="button button-yellow map-out-link" href={selected.mapUrl} target="_blank" rel="noreferrer">{t.mapLink} <ExternalLink size={15} /></a>}<p className="map-provider">OPENSTREETMAP / {t.mapPlaceholder}</p></article></div></section>;
}

export function AboutPage({ t }) {
  return <section className="page-section section-wrap about-zine"><p className="eyebrow">{t.aboutKicker}</p><h1>{t.aboutTitle}<br /><span>{t.aboutAccent}</span></h1><p>{t.aboutText}</p><div className="about-zine-stamp"><Trophy size={28} /><span>{t.aboutStamp.split('\n').map((line) => <b key={line}>{line}<br /></b>)}</span></div><a className="button button-red" href="#/players">{t.profileAction} <ArrowRight size={15} /></a></section>;
}

export function JournalPage({ t, posts, loading, language }) {
  return <section className="page-section section-wrap"><PageTitle eyebrow="07 / CLUB DISPATCHES" title={t.journalTitle} accent={t.journalAccent} description={t.journalIntro} />{loading ? <LoadingState t={t} /> : <div className="dispatch-grid">{posts.map((post, index) => <a className="dispatch-file" href={`#/journal/${post.id}`} key={post.id}><div className="dispatch-image"><img src={post.image} alt={localized(post, 'title', language)} /><span>{String(index + 1).padStart(2, '0')} / FIELD COPY</span></div><div className="dispatch-copy"><p className="eyebrow">{localized(post, 'category', language)} · {formatDate(post.date, language, { day: 'numeric', month: 'short', year: 'numeric' })}</p><h2>{localized(post, 'title', language)}</h2><p>{localized(post, 'excerpt', language)}</p><span className="zine-link">{t.readPost} <ArrowRight size={15} /></span><PhotoCredit photo={post} t={t} /></div></a>)}</div>}</section>;
}

export function PostPage({ t, post, loading, language }) {
  if (loading) return <section className="page-section section-wrap"><LoadingState t={t} /></section>;
  if (!post) return <NotFound t={t} back="#/journal" />;
  const body = language === 'cs' ? post.bodyCs || post.body : post.body;
  return <article className="page-section section-wrap post-page"><a className="back-link" href="#/journal"><ArrowLeft size={15} />{t.backToJournal}</a><p className="eyebrow">{localized(post, 'category', language)} · {formatDate(post.date, language, { day: 'numeric', month: 'long', year: 'numeric' })}</p><h1>{localized(post, 'title', language)}</h1><p className="post-deck">{localized(post, 'excerpt', language)}</p><figure className="credited-post-image"><img className="post-image" src={post.image} alt={localized(post, 'title', language)} /><figcaption><PhotoCredit photo={post} t={t} /></figcaption></figure><div className="post-body">{body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><a className="zine-link" href="#/schedule">{t.schedule} <ArrowRight size={15} /></a></article>;
}

export function AlbumPage({ t, cards, loading, language }) {
  return <section className="page-section section-wrap album-page"><PageTitle eyebrow="08 / ANDY'S BINDER" title={t.albumTitle} accent="" description={t.albumIntro} />{loading ? <LoadingState t={t} /> : cards.length ? <div className="album-grid">{cards.map((card) => <article className="album-card" key={card.id}><a className="album-card-image" href={card.sourceUrl || '#/album'} target={card.sourceUrl ? '_blank' : undefined} rel={card.sourceUrl ? 'noreferrer' : undefined}><img src={card.imageUrl} alt={`${card.name} Pokémon card`} /></a><div className="album-card-copy"><p className="eyebrow">{card.setName} · #{card.collectorNumber}</p><h2>{localized(card, 'name', language)}</h2><p className="album-note-label">{t.albumBy}</p><p>{localized(card, 'andyNote', language)}</p>{card.sourceUrl && <a className="zine-link" href={card.sourceUrl} target="_blank" rel="noreferrer">{t.albumSource} <ExternalLink size={14} /></a>}</div></article>)}</div> : <div className="album-empty"><div className="album-empty-art"><PokemonArt pokemon="eevee" alt={t.pokemonAlt} /></div><p className="eyebrow">AK / CARD ARCHIVE</p><h2>{t.albumEmptyTitle}</h2><p>{t.albumEmptyText}</p></div>}</section>;
}