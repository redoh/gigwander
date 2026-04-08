import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { artists, venues, concerts } from "./schema";

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://gigwander:gigwander@localhost:5432/gigwander";
const client = postgres(DATABASE_URL);
const db = drizzle(client);

const ARTISTS = [
  { name: "Saint Stacy", slug: "saint-stacy", genres: ["indie rock", "alternative"], bio: "London-based indie rock band known for ethereal melodies and electrifying live performances. Currently on their Neon Cathedral world tour.", popularity: 78, spotifyUrl: "https://open.spotify.com/artist/saintstacy", instagramUrl: "https://instagram.com/saintstacy", websiteUrl: "https://saintstacy.com", imageUrl: null },
  { name: "Luna Veil", slug: "luna-veil", genres: ["electronic", "synth-pop"], bio: "Berlin-based electronic artist blending dreamy synths with pulsating beats. A must-see on the European festival circuit.", popularity: 85, spotifyUrl: "https://open.spotify.com/artist/lunaveil", instagramUrl: "https://instagram.com/lunaveil", websiteUrl: null, imageUrl: null },
  { name: "The Midnight Suns", slug: "the-midnight-suns", genres: ["rock", "psychedelic"], bio: "American psychedelic rock group. Their Solar Flare album topped charts worldwide.", popularity: 92, spotifyUrl: "https://open.spotify.com/artist/midnightsuns", instagramUrl: "https://instagram.com/midnightsuns", websiteUrl: "https://themidnightsuns.com", imageUrl: null },
  { name: "Dua Kova", slug: "dua-kova", genres: ["pop", "dance"], bio: "Istanbul-born, globally acclaimed pop sensation blending Turkish influences with modern pop.", popularity: 88, spotifyUrl: "https://open.spotify.com/artist/duakova", instagramUrl: "https://instagram.com/duakova", websiteUrl: null, imageUrl: null },
  { name: "Arctic Nomads", slug: "arctic-nomads", genres: ["post-rock", "ambient"], bio: "Icelandic post-rock collective creating sprawling sonic landscapes with stunning visuals.", popularity: 72, spotifyUrl: "https://open.spotify.com/artist/arcticnomads", instagramUrl: null, websiteUrl: "https://arcticnomads.is", imageUrl: null },
  { name: "Neon Bazaar", slug: "neon-bazaar", genres: ["world music", "electronic", "fusion"], bio: "Collective blending traditional Middle Eastern instruments with electronic production.", popularity: 65, spotifyUrl: "https://open.spotify.com/artist/neonbazaar", instagramUrl: "https://instagram.com/neonbazaar", websiteUrl: null, imageUrl: null },
  { name: "Velvet Riot", slug: "velvet-riot", genres: ["punk", "post-punk", "new wave"], bio: "Manchester post-punk revival. Raw energy, political lyrics, fiercely loyal following.", popularity: 70, spotifyUrl: "https://open.spotify.com/artist/velvetriot", instagramUrl: "https://instagram.com/velvetriot", websiteUrl: null, imageUrl: null },
  { name: "Samba Noir", slug: "samba-noir", genres: ["jazz", "bossa nova", "neo-soul"], bio: "Brazilian-French jazz fusion. Smoky bossa nova meets Parisian late-night jazz.", popularity: 60, spotifyUrl: "https://open.spotify.com/artist/sambanoir", instagramUrl: null, websiteUrl: "https://sambanoir.com", imageUrl: null },
];

const VENUES = [
  { name: "Brixton Academy", address: "211 Stockwell Rd, Brixton", city: "London", country: "United Kingdom", countryCode: "GB", latitude: "51.4652000", longitude: "-0.1148000", capacity: 4921, type: "theater", imageUrl: null },
  { name: "O2 Arena", address: "Peninsula Square, Greenwich", city: "London", country: "United Kingdom", countryCode: "GB", latitude: "51.5033000", longitude: "0.0032000", capacity: 20000, type: "arena", imageUrl: null },
  { name: "Fabrique", address: "Via Gaudenzio Fantoli 9", city: "Milan", country: "Italy", countryCode: "IT", latitude: "45.4435000", longitude: "9.2384000", capacity: 3000, type: "club", imageUrl: null },
  { name: "Mediolanum Forum", address: "Via Giuseppe Di Vittorio 6, Assago", city: "Milan", country: "Italy", countryCode: "IT", latitude: "45.4297000", longitude: "9.1422000", capacity: 12700, type: "arena", imageUrl: null },
  { name: "Berghain", address: "Am Wriezener Bahnhof", city: "Berlin", country: "Germany", countryCode: "DE", latitude: "52.5112000", longitude: "13.4425000", capacity: 1500, type: "club", imageUrl: null },
  { name: "Mercedes-Benz Arena", address: "Mercedes-Platz 1", city: "Berlin", country: "Germany", countryCode: "DE", latitude: "52.5075000", longitude: "13.4432000", capacity: 17000, type: "arena", imageUrl: null },
  { name: "Zorlu PSM", address: "Zorlu Center, Besiktas", city: "Istanbul", country: "Turkey", countryCode: "TR", latitude: "41.0669000", longitude: "29.0169000", capacity: 2400, type: "theater", imageUrl: null },
  { name: "Razzmatazz", address: "Carrer dels Almogàvers 122", city: "Barcelona", country: "Spain", countryCode: "ES", latitude: "41.3978000", longitude: "2.1915000", capacity: 3000, type: "club", imageUrl: null },
  { name: "L'Olympia", address: "28 Boulevard des Capucines", city: "Paris", country: "France", countryCode: "FR", latitude: "48.8706000", longitude: "2.3290000", capacity: 2000, type: "theater", imageUrl: null },
  { name: "Paradiso", address: "Weteringschans 6-8", city: "Amsterdam", country: "Netherlands", countryCode: "NL", latitude: "52.3622000", longitude: "4.8839000", capacity: 1500, type: "club", imageUrl: null },
  { name: "Lucerna Music Bar", address: "Vodičkova 36", city: "Prague", country: "Czech Republic", countryCode: "CZ", latitude: "50.0810000", longitude: "14.4250000", capacity: 800, type: "club", imageUrl: null },
  { name: "Harpa Concert Hall", address: "Austurbakki 2", city: "Reykjavik", country: "Iceland", countryCode: "IS", latitude: "64.1505000", longitude: "-21.9326000", capacity: 1800, type: "theater", imageUrl: null },
  { name: "Coliseu dos Recreios", address: "Rua das Portas de Santo Antão 96", city: "Lisbon", country: "Portugal", countryCode: "PT", latitude: "38.7167000", longitude: "-9.1402000", capacity: 3500, type: "theater", imageUrl: null },
  { name: "Shibuya Club Quattro", address: "32-13 Udagawacho, Shibuya", city: "Tokyo", country: "Japan", countryCode: "JP", latitude: "35.6619000", longitude: "139.6977000", capacity: 750, type: "club", imageUrl: null },
];

async function seed() {
  console.log("Seeding database...");

  // Insert artists
  const insertedArtists = await db.insert(artists).values(ARTISTS).returning();
  console.log(`Inserted ${insertedArtists.length} artists`);

  // Insert venues
  const insertedVenues = await db.insert(venues).values(VENUES).returning();
  console.log(`Inserted ${insertedVenues.length} venues`);

  // Build lookup maps
  const artistMap = new Map(insertedArtists.map((a) => [a.slug, a.id]));
  const venueMap = new Map(insertedVenues.map((v) => [v.name, v.id]));

  // Insert concerts
  const CONCERTS = [
    { artistSlug: "saint-stacy", venueName: "Brixton Academy", date: "2026-04-05", doorsOpen: "19:00", showStart: "20:30", ticketPriceMin: "35", ticketPriceMax: "65", ticketCurrency: "GBP", status: "sold_out", tourName: "Neon Cathedral Tour", supportingActs: ["Glass Paper", "Echo Dawn"] },
    { artistSlug: "saint-stacy", venueName: "Fabrique", date: "2026-04-12", doorsOpen: "19:30", showStart: "21:00", ticketPriceMin: "30", ticketPriceMax: "55", ticketCurrency: "EUR", status: "on_sale", tourName: "Neon Cathedral Tour", supportingActs: ["Glass Paper"] },
    { artistSlug: "saint-stacy", venueName: "Berghain", date: "2026-04-18", doorsOpen: "20:00", showStart: "21:30", ticketPriceMin: "35", ticketPriceMax: "60", ticketCurrency: "EUR", status: "on_sale", tourName: "Neon Cathedral Tour", supportingActs: ["Glass Paper", "Nachtluft"] },
    { artistSlug: "saint-stacy", venueName: "Razzmatazz", date: "2026-04-25", doorsOpen: "20:00", showStart: "21:30", ticketPriceMin: "28", ticketPriceMax: "50", ticketCurrency: "EUR", status: "on_sale", tourName: "Neon Cathedral Tour", supportingActs: ["Echo Dawn"] },
    { artistSlug: "saint-stacy", venueName: "L'Olympia", date: "2026-05-02", doorsOpen: "19:30", showStart: "21:00", ticketPriceMin: "38", ticketPriceMax: "65", ticketCurrency: "EUR", status: "on_sale", tourName: "Neon Cathedral Tour", supportingActs: ["Glass Paper", "Echo Dawn"] },
    { artistSlug: "luna-veil", venueName: "Berghain", date: "2026-04-10", doorsOpen: "22:00", showStart: "23:30", ticketPriceMin: "25", ticketPriceMax: "45", ticketCurrency: "EUR", status: "on_sale", tourName: "Dreamstate Tour", supportingActs: ["Pulse Theory"] },
    { artistSlug: "luna-veil", venueName: "Paradiso", date: "2026-04-15", doorsOpen: "21:00", showStart: "22:30", ticketPriceMin: "30", ticketPriceMax: "50", ticketCurrency: "EUR", status: "on_sale", tourName: "Dreamstate Tour", supportingActs: ["Pulse Theory", "Neon Wave"] },
    { artistSlug: "luna-veil", venueName: "O2 Arena", date: "2026-04-22", doorsOpen: "19:00", showStart: "20:30", ticketPriceMin: "40", ticketPriceMax: "85", ticketCurrency: "GBP", status: "on_sale", tourName: "Dreamstate Tour", supportingActs: ["Pulse Theory"] },
    { artistSlug: "the-midnight-suns", venueName: "Mediolanum Forum", date: "2026-05-10", doorsOpen: "18:30", showStart: "20:00", ticketPriceMin: "55", ticketPriceMax: "120", ticketCurrency: "EUR", status: "on_sale", tourName: "Solar Flare World Tour", supportingActs: ["Crimson Echo", "Stardust Revival"] },
    { artistSlug: "the-midnight-suns", venueName: "Mercedes-Benz Arena", date: "2026-05-15", doorsOpen: "18:00", showStart: "20:00", ticketPriceMin: "50", ticketPriceMax: "110", ticketCurrency: "EUR", status: "on_sale", tourName: "Solar Flare World Tour", supportingActs: ["Crimson Echo"] },
    { artistSlug: "the-midnight-suns", venueName: "Shibuya Club Quattro", date: "2026-06-05", doorsOpen: "18:00", showStart: "19:30", ticketPriceMin: "50", ticketPriceMax: "92", ticketCurrency: "EUR", status: "on_sale", tourName: "Solar Flare World Tour", supportingActs: ["Neon Tokyo"] },
    { artistSlug: "dua-kova", venueName: "Zorlu PSM", date: "2026-04-20", doorsOpen: "19:00", showStart: "20:30", ticketPriceMin: "22", ticketPriceMax: "65", ticketCurrency: "EUR", status: "sold_out", tourName: "Silk Road Tour", supportingActs: ["Anatolian Beats"] },
    { artistSlug: "dua-kova", venueName: "L'Olympia", date: "2026-05-08", doorsOpen: "19:30", showStart: "21:00", ticketPriceMin: "45", ticketPriceMax: "90", ticketCurrency: "EUR", status: "on_sale", tourName: "Silk Road Tour", supportingActs: [] },
    { artistSlug: "arctic-nomads", venueName: "Harpa Concert Hall", date: "2026-05-20", doorsOpen: "19:00", showStart: "20:30", ticketPriceMin: "37", ticketPriceMax: "60", ticketCurrency: "EUR", status: "on_sale", tourName: "Aurora Tour", supportingActs: [] },
    { artistSlug: "arctic-nomads", venueName: "Paradiso", date: "2026-05-28", doorsOpen: "20:00", showStart: "21:00", ticketPriceMin: "25", ticketPriceMax: "40", ticketCurrency: "EUR", status: "on_sale", tourName: "Aurora Tour", supportingActs: [] },
    { artistSlug: "neon-bazaar", venueName: "Zorlu PSM", date: "2026-06-01", doorsOpen: "20:00", showStart: "21:30", ticketPriceMin: "15", ticketPriceMax: "40", ticketCurrency: "EUR", status: "on_sale", tourName: "Electric Souk Tour", supportingActs: ["DJ Oasis"] },
    { artistSlug: "neon-bazaar", venueName: "Coliseu dos Recreios", date: "2026-06-10", doorsOpen: "20:00", showStart: "21:30", ticketPriceMin: "25", ticketPriceMax: "45", ticketCurrency: "EUR", status: "on_sale", tourName: "Electric Souk Tour", supportingActs: [] },
    { artistSlug: "velvet-riot", venueName: "Lucerna Music Bar", date: "2026-04-28", doorsOpen: "19:00", showStart: "20:30", ticketPriceMin: "24", ticketPriceMax: "48", ticketCurrency: "EUR", status: "on_sale", tourName: "Rage & Velvet Tour", supportingActs: ["Broken Circuits"] },
    { artistSlug: "samba-noir", venueName: "L'Olympia", date: "2026-05-15", doorsOpen: "20:00", showStart: "21:00", ticketPriceMin: "35", ticketPriceMax: "60", ticketCurrency: "EUR", status: "on_sale", tourName: "Midnight Bossa Tour", supportingActs: ["Café Jazz Collective"] },
    { artistSlug: "samba-noir", venueName: "Coliseu dos Recreios", date: "2026-05-22", doorsOpen: "20:00", showStart: "21:30", ticketPriceMin: "20", ticketPriceMax: "40", ticketCurrency: "EUR", status: "on_sale", tourName: "Midnight Bossa Tour", supportingActs: [] },
  ];

  const concertValues = CONCERTS.map((c) => ({
    artistId: artistMap.get(c.artistSlug)!,
    venueId: venueMap.get(c.venueName)!,
    date: c.date,
    doorsOpen: c.doorsOpen,
    showStart: c.showStart,
    ticketPriceMin: c.ticketPriceMin,
    ticketPriceMax: c.ticketPriceMax,
    ticketCurrency: c.ticketCurrency,
    ticketUrl: `https://tickets.example.com/${c.artistSlug}-${c.venueName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
    status: c.status,
    tourName: c.tourName,
    supportingActs: c.supportingActs,
  }));

  const insertedConcerts = await db.insert(concerts).values(concertValues).returning();
  console.log(`Inserted ${insertedConcerts.length} concerts`);

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
