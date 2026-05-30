"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ParticleBackground } from "@/components/particle-background"
import { MusicNavigation } from "@/components/music-navigation"
import { Footer } from "@/components/footer"
import { X, ChevronDown, ChevronLeft } from "lucide-react"

interface CreditPerson {
  name: string
  role: string
  link?: string
}

interface SubTrack {
  id: number
  title: string
  artist: string
  credits: {
    artists: CreditPerson[]
    compositionLyrics: CreditPerson[]
    productionEngineering: CreditPerson[]
    graphicDesigner: CreditPerson[]
    geniusLyrics: CreditPerson[]
  }
}

interface TrackCredits {
  id: number
  title: string
  artist: string
  credit: "Singl" | "Album" | string
  coverArt: string
  year: string
  songLink?: string
  /* Glavni credits (koristi se za Singl, ili kao opći credit za Album) */
  credits?: {
    artists: CreditPerson[]
    compositionLyrics: CreditPerson[]
    productionEngineering: CreditPerson[]
    graphicDesigner: CreditPerson[]
    geniusLyrics: CreditPerson[]
  }
  /* Ako je projekt Album, ovdje prosljeđuješ listu pjesama */
  tracks?: SubTrack[]
}

const musicCredits: TrackCredits[] = [
  {
    id: 1,
    title: "ako padnem sutra",
    artist: "fejza",
    credit: "Singl",
    coverArt: "/covers/cover-1.jpg",
    year: "2026",
    songLink: "https://fejza.lnk.to/aps/",
    credits: {
      artists: [
        { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
      ],
      compositionLyrics: [
        { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
      ],
      productionEngineering: [
        { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
        { name: "L21", role: "Pomoćni Inžinjer", link: "https://spotify.com" },
        { name: "has", role: "Producent", link: "https://spotify.com" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-ako-padnem-sutra-lyrics/" },
      ],
    },
  },
  {
    id: 2,
    title: "Merak",
    artist: "Coby, fejza",
    credit: "Singl • Remix",
    coverArt: "/covers/cover-2.jpg",
    year: "2026",
    songLink: "https://www.youtube.com/watch?v=8sXqzJGByzc&list=RD8sXqzJGByzc&start_radio=1",
    credits: {
      artists: [
        { name: "Coby", role: "Izvođač", link: "https://spotify.com" },
      ],
      compositionLyrics: [
        { name: "Coby", role: "Aranžer • Tekstopisac", link: "https://spotify.com" },
        { name: "fejza", role: "Aranžer", link: "https://instagram.com/1fejza" },
        { name: "MBM", role: "Aranžer", link: "https://spotify.com" },
        { name: "Šomi", role: "Aranžer", link: "https://spotify.com" },
        { name: "Benzika", role: "Aranžer", link: "https://spotify.com" },
        { name: "Godday", role: "Aranžer", link: "https://spotify.com" },
      ],
      productionEngineering: [
        { name: "Jan Magdevski", role: "Mixing Inžinjer • Mastering Inžinjer", link: "" },
        { name: "fejza", role: "Producent • Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
        { name: "Aleksandar Sablić", role: "Sintisajzer", link: "" },
      ],
      graphicDesigner: [
        { name: "", role: "", link: "" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Coby-Merak-lyrics/" },
      ],
    },
  },
  {
    id: 3,
    title: "ne plači zbog nas",
    artist: "fejza",
    credit: "Singl",
    coverArt: "/covers/cover-3.jpg",
    year: "2026",
    songLink: "https://fejza.lnk.to/npzn/",
    credits: {
      artists: [
        { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
      ],
      compositionLyrics: [
        { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
      ],
      productionEngineering: [
        { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
    },
  },
  {
    id: 4,
    title: "bulldog",
    artist: "fejza",
    credit: "Singl",
    coverArt: "/covers/cover-4.jpg",
    year: "2026",
    songLink: "https://fejza.lnk.to/bulldog",
    credits: {
      artists: [
        { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
      ],
      compositionLyrics: [
        { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
      ],
      productionEngineering: [
        { name: "Ryno", role: "Producent", link: "https://instagram.com/prodryno" },
        { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-bulldog-lyrics/" },
      ],
    },
  },
  {
    id: 5,
    title: "Rollie",
    artist: "fejza",
    credit: "Singl",
    coverArt: "/covers/cover-5.jpg",
    year: "2025",
    songLink: "https://fejza.lnk.to/rollie/",
    credits: {
      artists: [
        { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
      ],
      compositionLyrics: [
        { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
      ],
      productionEngineering: [
        { name: "ayesean", role: "Producent", link: "" },
        { name: "joshhh", role: "Producent", link: "" },
        { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-Rollie-lyrics/" },
      ],
    },
  },// <--- OVO JE KLJUČNI ZAREZ IZMEĐU SINGLA I ALBUMA
  {
    id: 6,
    title: "Narcissist",
    artist: "fejza",
    credit: "Album • 9 pjesama",
    coverArt: "/covers/cover-6.jpg",
    year: "2025",
    songLink: "https://fejza.lnk.to/narcissist/",
    tracks: [
      {
        id: 101,
        title: "Traphouse",
        artist: "fejza",
        credits: {
          artists: [
            { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
          ],
          compositionLyrics: [
            { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
          ],
          productionEngineering: [
            { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
          ],
          graphicDesigner: [
            { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" }],
          geniusLyrics: [
            { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-Traphouse-lyrics/" },
          ],
        },
      }, // <--- OVO JE ZAREZ IZMEĐU PJESAMA UNUTAR ALBUMA
      {
        id: 102,
        title: "Na nuli",
        artist: "fejza",
        credits: {
          artists: [
            { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
          ],
          compositionLyrics: [
            { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
          ],
          productionEngineering: [
            { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
          ],
          graphicDesigner: [
            { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" }],
          geniusLyrics: [
            { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-Na-nuli-lyrics/" },
          ],
        },
      }, // <--- OVO JE ZAREZ IZMEĐU PJESAMA UNUTAR ALBUMA
      {
        id: 103,
        title: "Narcissist - Interlude",
        artist: "fejza",
        credits: {
          artists: [
            { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
            { name: "Iggy Azalea", role: "Vokali", link: "https://instagram.com/thenewclassic" }
          ],
          compositionLyrics: [
            { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
          ],
          productionEngineering: [
            { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
          ],
          graphicDesigner: [
            { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" }],
          geniusLyrics: [
            { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-Narcissist-lyrics/" },
          ],
        },
      }, // <--- OVO JE ZAREZ IZMEĐU PJESAMA UNUTAR ALBUMA
      {
        id: 104,
        title: "Dirty Sprite",
        artist: "fejza",
        credits: {
          artists: [
            { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
          ],
          compositionLyrics: [
            { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
          ],
          productionEngineering: [
            { name: "Ryno", role: "Producent ", link: "https://instagram.com/prod.ryno" },
            { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
          ],
          graphicDesigner: [
            { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" }],
          geniusLyrics: [
            { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-Dirty-Sprite-lyrics/" },
          ],
        },
      }, // <--- OVO JE ZAREZ IZMEĐU PJESAMA UNUTAR ALBUMA
      {
        id: 105,
        title: "J. Lo",
        artist: "fejza feat. Pedja",
        credits: {
          artists: [
            { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
          ],
          compositionLyrics: [
            { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
          ],
          productionEngineering: [
            { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
          ],
          graphicDesigner: [
            { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" }],
          geniusLyrics: [
            { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-J-Lo-lyrics/" },
          ],
        },
      }, // <--- OVO JE ZAREZ IZMEĐU PJESAMA UNUTAR ALBUMA
      {
        id: 106,
        title: "Nije me briga",
        artist: "fejza feat. Smele",
        credits: {
          artists: [
            { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
            { name: "Smele", role: "Gost", link: "https://instagram.com/bigsmele" },
          ],
          compositionLyrics: [
            { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
            { name: "Smele", role: "Tekstopisac", link: "https://instagram.com/bigsmele" },
          ],
          productionEngineering: [
            { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
          ],
          graphicDesigner: [
            { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" }],
          geniusLyrics: [
            { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-Nije-me-briga-lyrics/" },
          ],
        },
      }, // <--- OVO JE ZAREZ IZMEĐU PJESAMA UNUTAR ALBUMA
      {
        id: 107,
        title: "Na meni",
        artist: "fejza feat. Difit",
        credits: {
          artists: [
            { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
            { name: "Difit", role: "Gost", link: "https://instagram.com/difitje" },
          ],
          compositionLyrics: [
            { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
            { name: "Difit", role: "Tekstopisac", link: "https://instagram.com/difitje" },
          ],
          productionEngineering: [
            { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
          ],
          graphicDesigner: [
            { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" }],
          geniusLyrics: [
            { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-Na-meni-lyrics/" },
          ],
        },
      }, // <--- OVO JE ZAREZ IZMEĐU PJESAMA UNUTAR ALBUMA
      {
        id: 108,
        title: "Boeing",
        artist: "fejza",
        credits: {
          artists: [
            { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
          ],
          compositionLyrics: [
            { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
          ],
          productionEngineering: [
            { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
          ],
          graphicDesigner: [
            { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" }],
          geniusLyrics: [
            { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-Boeing-lyrics/" },
          ],
        },
      }, // <--- OVO JE ZAREZ IZMEĐU PJESAMA UNUTAR ALBUMA
      {
        id: 109,
        title: "Antivirus",
        artist: "fejza",
        credits: {
          artists: [
            { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
          ],
          compositionLyrics: [
            { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
          ],
          productionEngineering: [
            { name: "fejza", role: "Producent • Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
          ],
          graphicDesigner: [
            { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" }],
          geniusLyrics: [
            { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-Antivirus-lyrics/" },
          ],
        },
      } // <--- Na zadnjoj pjesmi u nizu zarez nije obavezan, ali je dobra praksa staviti ga
    ],
  }, // <--- DODAJ OVAJ ZAREZ OVDJE!
  {
    id: 7,
    title: "Katran",
    artist: "Levi",
    credit: "Singl",
    coverArt: "/covers/cover-7.jpg",
    year: "2025",
    songLink: "https://lnk.site/4/levi-katran",
    credits: {
      artists: [
        { name: "Levi", role: "Izvođač", link: "https://instagram.com/madboilevi" },
      ],
      compositionLyrics: [
        { name: "Levi", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/madboilevi" },
      ],
      productionEngineering: [
        { name: "Sura", role: "Melodija", link: "" },
        { name: "fejza", role: "Producent • Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Levi-Katran-lyrics/" },
      ],
    },
  },
  {
    id: 8,
    title: "Magican Kraj (Outro)",
    artist: "Smele feat. fejza",
    credit: "S Albuma 'Musica Pa Carratera'",
    coverArt: "/covers/cover-8.jpg",
    year: "2025",
    songLink: "https://lnk.site/4/musica-pa-carratera/",
    credits: {
      artists: [
        { name: "Smele", role: "Izvođač", link: "https://instagram.com/bigsmele" },
        { name: "fejza", role: "Gost", link: "https://instagram.com/1fejza" },
      ],
      compositionLyrics: [
        { name: "fejza", role: "Aranžer ", link: "https://instagram.com/1fejza" },
      ],
      productionEngineering: [
        { name: "fejza", role: "Producent • Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "Smele", role: "Grafički Dizajner", link: "https://instagram.com/bigsmele" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Smele-magican-kraj-lyrics/" },
      ],
    },
  },
  {
    id: 9,
    title: "Euforija",
    artist: "Smele feat. Difit",
    credit: "S Albuma 'Musica Pa Carratera'",
    coverArt: "/covers/cover-8.jpg",
    year: "2025",
    songLink: "https://lnk.site/4/musica-pa-carratera/",
    credits: {
      artists: [
        { name: "Smele", role: "Izvođač", link: "https://instagram.com/bigsmele" },
        { name: "Difit", role: "Gost", link: "https://instagram.com/difitje" },
      ],
      compositionLyrics: [
        { name: "Smele", role: "Aranžer • Tekstopisac", link: "https://instagram.com/bigsmele" },
        { name: "Difit", role: "Tekstopisac", link: "https://instagram.com/bigsmele" },
      ],
      productionEngineering: [
        { name: "fejza", role: "Producent • Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "Smele", role: "Grafički Dizajner", link: "https://instagram.com/bigsmele" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Smele-euforija-lyrics/" },
      ],
    },
  },
  {
    id: 10,
    title: "Bentley",
    artist: "fejza",
    credit: "Singl",
    coverArt: "/covers/cover-10.jpg",
    year: "2025",
    songLink: "https://fejza.lnk.to/bentley",
    credits: {
      artists: [
        { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
      ],
      compositionLyrics: [
        { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
      ],
      productionEngineering: [
        { name: "fejza", role: "Producent • Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-bentley-lyrics/" },
      ],
    },
  },
  {
    id: 11,
    title: "high",
    artist: "fejza",
    credit: "Singl",
    coverArt: "/covers/cover-11.jpg",
    year: "2025",
    songLink: "https://fejza.lnk.to/high",
    credits: {
      artists: [
        { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
      ],
      compositionLyrics: [
        { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
      ],
      productionEngineering: [
        { name: "fejza", role: "Producent • Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-high-lyrics/" },
      ],
    },
  },
  {
    id: 12,
    title: "Lomi",
    artist: "Mata",
    credit: "Singl",
    coverArt: "/covers/cover-12.jpg",
    year: "2025",
    songLink: "",
    credits: {
      artists: [
        { name: "Mata", role: "Izvođač", link: "https://instagram.com/matostatije" },
      ],
      compositionLyrics: [
        { name: "", role: "", link: "" },
      ],
      productionEngineering: [
        { name: "", role: "", link: "" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Mata-lomi-lyrics/" },
      ],
    },
  },
  {
    id: 13,
    title: "teret",
    artist: "fejza & Levi",
    credit: "Singl",
    coverArt: "/covers/cover-13.jpg",
    year: "2025",
    songLink: "https://fejza.lnk.to/teret",
    credits: {
      artists: [
        { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
        { name: "Levi", role: "Izvođač", link: "https://instagram.com/madboilevi" },
      ],
      compositionLyrics: [
        { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
        { name: "Levi", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/madboilevi" },
      ],
      productionEngineering: [
        { name: "fejza", role: "Producent • Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-and-levi-sr-teret-lyrics/" },
      ],
    },
  },
  {
    id: 14,
    title: "trud",
    artist: "Smele & fejza",
    credit: "Singl",
    coverArt: "/covers/cover-14.jpg",
    year: "2025",
    songLink: "https://fejza.lnk.to/trud",
    credits: {
      artists: [
        { name: "Smele", role: "Izvođač", link: "https://instagram.com/bigsmele" },
        { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
      ],
      compositionLyrics: [
        { name: "Smele", role: "Aranžer • Tekstopisac", link: "https://instagram.com/bigsmele" },
        { name: "fejza", role: "Aranžer • Tekstopisac", link: "https://instagram.com/1fejza" },
      ],
      productionEngineering: [
        { name: "fejza", role: "Producent • Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "Smele", role: "Grafički Dizajner", link: "https://instagram.com/bigsmele" },
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Smele-trud-lyrics/" },
      ],
    },
  },
  {
    id: 15,
    title: "Premija",
    artist: "Difit",
    credit: "Singl",
    coverArt: "/covers/cover-15.jpg",
    year: "2025",
    songLink: "https://fejza.lnk.to/premija",
    credits: {
      artists: [
        { name: "Difit", role: "Izvođač", link: "https://instagram.com/difitje" },
      ],
      compositionLyrics: [
        { name: "Difit", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/difitje" },
      ],
      productionEngineering: [
        { name: "Dvajedantri.flp", role: "Producent", link: "" },
        { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Difit-premija-lyrics/" },
      ],
    },
  },
  {
    id: 16,
    title: "9milli",
    artist: "fejza",
    credit: "Singl",
    coverArt: "/covers/cover-16.jpg",
    year: "2025",
    songLink: "https://fejza.lnk.to/9milli",
    credits: {
      artists: [
        { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
      ],
      compositionLyrics: [
        { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
      ],
      productionEngineering: [
        { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-9milli-lyrics/" },
      ],
    },
  },
  {
    id: 17,
    title: "Tuspas",
    artist: "Rajker",
    credit: "Singl • Remix",
    coverArt: "/covers/cover-17.jpg",
    year: "2025",
    songLink: "",
    credits: {
      artists: [
        { name: "Rajker", role: "Izvođač", link: "https://instagram.com/rajker.official" },
        { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
      ],
      compositionLyrics: [
        { name: "Rajker", role: "Aranžer • Tekstopisac", link: "https://instagram.com/rajker.official" },
      ],
      productionEngineering: [
        { name: "fejza", role: "Producent • Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
    },
  },
  {
    id: 18,
    title: "nikad nisam bio tvoj",
    artist: "fejza",
    credit: "Singl",
    coverArt: "/covers/cover-18.jpg",
    year: "2024",
    songLink: "https://fejza.lnk.to/nnbt",
    credits: {
      artists: [
        { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
      ],
      compositionLyrics: [
        { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
      ],
      productionEngineering: [
        { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-nikad-nisam-bio-tvoj-lyrics/" },
      ],
    },
  },
  {
    id: 19,
    title: "Ne spavam",
    artist: "Smele",
    credit: "Singl",
    coverArt: "/covers/cover-19.jpg",
    year: "2024",
    songLink: "https://lnk.site/4/ne-spavam",
    credits: {
      artists: [
        { name: "Smele", role: "Izvođač", link: "https://instagram.com/bigsmele" },
      ],
      compositionLyrics: [
        { name: "Smele", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/bigsmele" },
      ],
      productionEngineering: [
        { name: "fejza", role: "Producent • Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Smele-ne-spavam-lyrics/" },
      ],
    },
  },
  {
    id: 20,
    title: "Jäger",
    artist: "Smele, Difit, Hrki",
    credit: "Singl",
    coverArt: "/covers/cover-20.jpg",
    year: "2024",
    songLink: "https://lnk.site/4/jager",
    credits: {
      artists: [
        { name: "Smele", role: "Izvođač", link: "https://instagram.com/bigsmele" },
        { name: "Difit", role: "Izvođač", link: "https://instagram.com/difitje" },
        { name: "Hrki", role: "Izvođač", link: "https://instagram.com/" },
      ],
      compositionLyrics: [
        { name: "Smele", role: "Aranžer • Tekstopisac", link: "https://instagram.com/bigsmele" },
        { name: "Difit", role: "Aranžer • Tekstopisac", link: "https://instagram.com/difitje" },
        { name: "Hrki", role: "Aranžer • Tekstopisac", link: "https://instagram.com/" },
      ],
      productionEngineering: [
        { name: "fejza", role: "Producent • Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
        { name: "Hrki", role: "Mixing Inžinjer", link: "https://instagram.com/" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Smele-difit-and-hrki-jager-lyrics/" },
      ],
    },
  },
  {
    id: 21,
    title: "gucci, cartier",
    artist: "fejza",
    credit: "Singl",
    coverArt: "/covers/cover-21.jpg",
    year: "2024",
    songLink: "https://fejza.lnk.to/g-c",
    credits: {
      artists: [
        { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
      ],
      compositionLyrics: [
        { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
      ],
      productionEngineering: [
        { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-gucci-cartier-lyrics/" },
      ],
    },
  },
  {
    id: 22,
    title: "Vlone",
    artist: "fejza",
    credit: "Singl",
    coverArt: "/covers/cover-22.jpg",
    year: "2024",
    songLink: "https://fejza.lnk.to/vlone",
    credits: {
      artists: [
        { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
      ],
      compositionLyrics: [
        { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
      ],
      productionEngineering: [
        { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-vlone-lyrics/" },
      ],
    },
  },
  {
    id: 23,
    title: "Opa Opa",
    artist: "fejza",
    credit: "Singl • Remix",
    coverArt: "/covers/cover-23.jpg",
    year: "2024",
    songLink: "https://fejza.lnk.to/opa-opa-rmx",
    credits: {
      artists: [
        { name: "Pljugica", role: "Izvođač", link: "https://instagram.com/lulepljugica" },
        { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
      ],
      compositionLyrics: [
        { name: "Pljugica", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/lulepljugica" },
      ],
      productionEngineering: [
        { name: "fejza", role: "Producent • Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner • Video Montažer", link: "https://instagram.com/1fejza" },
        { name: "nnnikolv", role: "Video Montažer", link: "" },
        { name: "Ibor Vantić", role: "Kamerman", link: "" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Pljugica-and-fejza-opa-opa-remix-lyrics/" },
      ],
    },
  },
  {
    id: 24,
    title: "Lagerfield",
    artist: "fejza",
    credit: "Singl",
    coverArt: "/covers/cover-24.jpg",
    year: "2024",
    songLink: "https://fejza.lnk.to/lagerfield",
    credits: {
      artists: [
        { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
      ],
      compositionLyrics: [
        { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
      ],
      productionEngineering: [
        { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-Lagerfield-lyrics/" },
      ],
    },
  },
  {
    id: 25,
    title: "Gorila",
    artist: "fejza",
    credit: "Singl",
    coverArt: "/covers/cover-25.jpg",
    year: "2023",
    songLink: "https://fejza.lnk.to/gorila",
    credits: {
      artists: [
        { name: "fejza", role: "Izvođač", link: "https://instagram.com/1fejza" },
      ],
      compositionLyrics: [
        { name: "fejza", role: "Aranžer • Tekstopisac ", link: "https://instagram.com/1fejza" },
      ],
      productionEngineering: [
        { name: "fejza", role: "Mixing Inžinjer • Mastering Inžinjer", link: "https://instagram.com/1fejza" },
      ],
      graphicDesigner: [
        { name: "fejza", role: "Grafički Dizajner", link: "https://instagram.com/1fejza" },
      ],
      geniusLyrics: [
        { name: "Klikni za tekst", role: "", link: "https://genius.com/Fejza-Gorila-lyrics/" },
      ],
    },
  },
]

type SortOption = "newest" | "oldest" | "name" | "artist"

const sortOptions = [
  { value: "newest" as SortOption, label: "Najnovije" },
  { value: "oldest" as SortOption, label: "Najstarije" },
  { value: "name" as SortOption, label: "Naziv" },
  { value: "artist" as SortOption, label: "Izvođač" },
]

function AnimatedNumber({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(startValue + (value - startValue) * easeOutQuart)

      // @ts-ignore
      setDisplayValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  )
}

function CreditsModal({ track, onClose }: { track: TrackCredits; onClose: () => void }) {
  // Prati koja je pjesma sa albuma selektirana unutar modala
  const [activeSubTrack, setActiveSubTrack] = useState<SubTrack | null>(null)

  // Određujemo koje creditse prikazujemo (glavne od singla ili odabrane pjesme s albuma)
  const currentCredits = activeSubTrack ? activeSubTrack.credits : track.credits
  const isAlbum = track.credit.toLowerCase() === "album" || !!track.tracks

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-lg glass rounded-2xl p-6 md:p-8 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Back Button ako gledamo specifičnu pjesmu na albumu */}
        {activeSubTrack && (
          <button
            onClick={() => setActiveSubTrack(null)}
            className="flex items-center gap-1 text-xs uppercase tracking-wider text-muted-foreground hover:text-primary mb-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Nazad na Tracklist
          </button>
        )}

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm tracking-[0.2em] uppercase text-primary mb-2">
            {activeSubTrack ? "Credits za pjesmu" : "Credits"}
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            {activeSubTrack ? activeSubTrack.title : track.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {activeSubTrack ? activeSubTrack.artist : track.artist}
          </p>
        </div>

        {/* Prikaz Trackliste ako je album i nijedna pjesma još nije kliknuta */}
        {isAlbum && !activeSubTrack ? (
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 border-b border-border pb-2">
              Popis Pjesama / Tracklist
            </h3>
            <div className="space-y-2">
              {track.tracks?.map((subTrack, index) => (
                <button
                  key={subTrack.id}
                  onClick={() => setActiveSubTrack(subTrack)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-left border border-transparent hover:border-white/10 group/item"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground w-4">{index + 1}.</span>
                    <div>
                      <p className="font-medium text-foreground group-hover/item:text-primary transition-colors">
                        {subTrack.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{subTrack.artist}</p>
                    </div>
                  </div>
                  <span className="text-xs tracking-wider uppercase text-muted-foreground group-hover/item:text-foreground transition-colors">
                    Pogledaj Credits
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Prikaz samih Creditsa (za Singl ili selektiranu pjesmu s Albuma) */
          currentCredits && (
            <div className="space-y-6">
              {/* Artist Section */}
              {currentCredits.artists && currentCredits.artists.length > 0 && (
                <div>
                  <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 border-b border-border pb-2">
                    Artist
                  </h3>
                  <div className="space-y-2">
                    {currentCredits.artists.map((person, index) => (
                      <div key={index} className="flex items-center justify-between">
                        {person.link ? (
                          <a
                            href={person.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {person.name}
                          </a>
                        ) : (
                          <span className="text-lg font-semibold text-foreground">{person.name}</span>
                        )}
                        <span className="text-sm text-muted-foreground">{person.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Composition & Lyrics Section */}
              {currentCredits.compositionLyrics && currentCredits.compositionLyrics.length > 0 && (
                <div>
                  <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 border-b border-border pb-2">
                    Composition & Lyrics
                  </h3>
                  <div className="space-y-2">
                    {currentCredits.compositionLyrics.map((person, index) => (
                      <div key={index} className="flex items-center justify-between">
                        {person.link ? (
                          <a
                            href={person.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {person.name}
                          </a>
                        ) : (
                          <span className="text-lg font-semibold text-foreground">{person.name}</span>
                        )}
                        <span className="text-sm text-muted-foreground">{person.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Production & Engineering Section */}
              {currentCredits.productionEngineering && currentCredits.productionEngineering.length > 0 && (
                <div>
                  <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 border-b border-border pb-2">
                    Production & Engineering
                  </h3>
                  <div className="space-y-2">
                    {currentCredits.productionEngineering.map((person, index) => (
                      <div key={index} className="flex items-center justify-between">
                        {person.link ? (
                          <a
                            href={person.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {person.name}
                          </a>
                        ) : (
                          <span className="text-lg font-semibold text-foreground">{person.name}</span>
                        )}
                        <span className="text-sm text-muted-foreground">{person.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Graphic Designer Section */}
              {currentCredits.graphicDesigner && currentCredits.graphicDesigner.length > 0 && (
                <div>
                  <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 border-b border-border pb-2">
                    Graphic Design
                  </h3>
                  <div className="space-y-2">
                    {currentCredits.graphicDesigner.map((person, index) => (
                      <div key={index} className="flex items-center justify-between">
                        {person.link ? (
                          <a
                            href={person.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {person.name}
                          </a>
                        ) : (
                          <span className="text-lg font-semibold text-foreground">{person.name}</span>
                        )}
                        <span className="text-sm text-muted-foreground">{person.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Genius Lyrics Section */}
              {currentCredits.geniusLyrics && currentCredits.geniusLyrics.length > 0 && (
                <div>
                  <h3 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3 border-b border-border pb-2">
                    Lyrics
                  </h3>
                  <div className="space-y-2">
                    {currentCredits.geniusLyrics.map((person, index) => (
                      <div key={index} className="flex items-center justify-between">
                        {person.link ? (
                          <a
                            href={person.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                          >
                            {person.name}
                          </a>
                        ) : (
                          <span className="text-lg font-semibold text-foreground">{person.name}</span>
                        )}
                        <span className="text-sm text-muted-foreground">{person.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </motion.div>
    </motion.div>
  )
}

export default function MusicPage() {
  const [selectedTrack, setSelectedTrack] = useState<TrackCredits | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" })

  const sortedTracks = useMemo(() => {
    const tracks = [...musicCredits]
    switch (sortBy) {
      case "newest":
        return tracks.sort((a, b) => parseInt(b.year) - parseInt(a.year))
      case "oldest":
        return tracks.sort((a, b) => parseInt(a.year) - parseInt(b.year))
      case "name":
        return tracks.sort((a, b) => a.title.localeCompare(b.title))
      case "artist":
        return tracks.sort((a, b) => a.artist.localeCompare(b.artist))
      default:
        return tracks
    }
  }, [sortBy])

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <ParticleBackground />
      <MusicNavigation />

      {/* Credits Modal */}
      <AnimatePresence>
        {selectedTrack && (
          <CreditsModal track={selectedTrack} onClose={() => setSelectedTrack(null)} />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-base tracking-[0.3em] uppercase text-primary mb-4"
            >
              kompletna
            </motion.p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-foreground text-glow">
              Diskografija
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Klikom na cover art otvarate credits za odabranu pjesmu.
            </p>
          </motion.div>
        </div>

        {/* Ambient glow behind title */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/20 rounded-full blur-[150px] pointer-events-none" />
      </section>

      {/* Music Grid */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          {/* Sort Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-end mb-8"
          >
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Razvrstaj po: {sortOptions.find(o => o.value === sortBy)?.label}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-40 glass rounded-xl overflow-hidden z-20"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value)
                          setIsDropdownOpen(false)
                        }}
                        className={`w-full px-4 py-3 text-left text-sm tracking-wider uppercase transition-colors ${sortBy === option.value
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                          }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {sortedTracks.map((track, index) => (
              <motion.article
                key={track.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="glass rounded-2xl p-4 transition-all duration-500 hover:bg-card hover:shadow-[0_0_60px_oklch(0.5_0.2_280_/_0.2)]">
                  {/* Cover Art Container - Square 1:1 aspect ratio */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary flex items-center justify-center">
                      <span className="text-6xl font-display text-foreground/20">
                        {track.title.charAt(0)}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                      <button
                        onClick={() => setSelectedTrack(track)}
                        className="px-6 py-2 glass rounded-full text-sm tracking-wider uppercase text-foreground hover:bg-white/20 transition-colors cursor-pointer"
                      >
                        Credits
                      </button>
                    </div>
                  </div>

                  {/* Track Info */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
                        {track.title}
                      </h3>
                      <span className="text-xs text-muted-foreground shrink-0">
                        {track.year}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {track.artist}
                    </p>

                    {/* Credit Badge */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="inline-block px-3 py-1.5 text-xs tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 rounded-full">
                        {track.credit}
                      </span>

                      {/* Song Link */}
                      {track.songLink && (
                        <a
                          href={track.songLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors"
                        >
                          Listen
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 md:py-24 border-t border-border">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: 50, suffix: "+", label: "Produciranih pjesama" },
              { value: 30, suffix: "+", label: "Saradnji" },
              { value: 120, suffix: "K+", label: "Ukupnih Slušanja" },
              { value: 200, suffix: "+", label: "Ukupnih Projekata" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="space-y-2"
              >
                <p className="text-3xl md:text-4xl font-display font-bold text-foreground text-glow">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} isInView={statsInView} />
                </p>
                <p className="text-sm text-muted-foreground tracking-wider uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
