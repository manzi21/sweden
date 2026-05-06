"use client";

// components/client/CountriesSection.tsx
// Country-specific channel packages with modal — strategic for ExYu/Arabic/Turkish niches

import React, { useEffect, useState } from "react";
import { COUNTRIES } from "../shared/countries";
import { generateWhatsAppLink } from "../shared/utils";
import type { Country } from "../shared/types";

export function CountriesSection({ ua }: { ua: string }) {
  const [selected, setSelected] = useState<Country | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const closeModal = () => setSelected(null);

  return (
    <>
      <section id="countries" className="section">
        <div className="sectionHead">
          <h2>TV på ditt språk i Sverige</h2>
          <p>
            ExYu, arabiska, turkiska, persiska, kurdiska, somaliska och 12+ andra språk —
            klicka på ditt land för att se kanalerna och beställa direkt via WhatsApp
          </p>
          <p style={{ fontSize: 13, color: "var(--gold)", fontWeight: 600, marginTop: 6 }}>
            👆 Tryck på ett land för att se kanalerna
          </p>
        </div>
        <div className="countriesGrid">
          {COUNTRIES.map((c) => (
            <button
              key={c.slug}
              className="countryCard"
              onClick={() => setSelected(c)}
              type="button"
              aria-label={`Se ${c.name} kanaler`}
            >
              <span className="ctryFlag" aria-hidden="true">{c.flag}</span>
              <div className="ctryInfo">
                <div className="ctryName">{c.name}</div>
                <div className="ctrySub">{c.sub}</div>
              </div>
              <span className="ctryArrow" aria-hidden="true">›</span>
            </button>
          ))}
        </div>
        <div className="stepsCtaWrap" style={{ marginTop: 28 }}>
          <a
            className="btnSecondary"
            href={generateWhatsAppLink(
              "Hej! Jag söker kanaler på mitt språk i Sverige.",
              ua,
              "Countries-NotFound"
            )}
            target="_blank"
            rel="noreferrer"
          >
            💬 Mitt språk ingår inte — fråga oss
          </a>
        </div>
      </section>

      {selected && (
        <div
          className="countryModalOverlay"
          onClick={(e) => {
            if ((e.target as HTMLElement).classList.contains("countryModalOverlay")) closeModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={selected.name}
        >
          <div className="countryModalBox">
            <div className="countryModalHd">
              <span className="countryModalFlag" aria-hidden="true">{selected.flag}</span>
              <div className="countryModalTb">
                <h2>{selected.name}</h2>
                <p>{selected.desc}</p>
              </div>
              <button className="countryModalClose" onClick={closeModal} aria-label="Stäng">✕</button>
            </div>

            <div className="countryModalBd">
              <div className="countryModalSec">
                <div className="countryModalSecTitle">
                  📺 Kanaler som ingår ({selected.channels.length}+)
                </div>
                <div className="countryChGrid">
                  {selected.channels.map((ch) => (
                    <div key={ch.n} className="countryChChip">
                      <div className="countryChName">{ch.n}</div>
                      <div className="countryChIcon">{ch.c}</div>
                    </div>
                  ))}
                  <div className="countryChChip countryChChipGold">
                    <div className="countryChName" style={{ color: "#C9A84C" }}>+ 100s fler</div>
                    <div className="countryChIcon">💬</div>
                  </div>
                </div>
              </div>

              <div className="countryModalSec">
                <div className="countryModalSecTitle">🔍 Vad folk söker på Google</div>
                <div className="countryKwWrap">
                  {selected.keywords.map(([kw, vol]) => (
                    <div key={kw} className="countryKwPill">
                      <span className="countryKwText">{kw}</span>
                      <span className="countryKwVol">{vol}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 10 }}>
                  Volym = månatliga sökningar i Sverige
                </p>
              </div>

              <div className="countryPriceBox">
                <span style={{ fontSize: 26, flexShrink: 0 }}>💰</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 3 }}>
                    Pris: från 50 kr/mån
                  </div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>
                    Alla kanaler ingår • Gratis test 24h • Ingen bindningstid
                  </div>
                </div>
              </div>
            </div>

            <div className="countryModalFt">
              <a
                className="trialCta"
                style={{ flex: 1, minWidth: 140, textAlign: "center", fontSize: 14, padding: "13px 18px" }}
                href={generateWhatsAppLink(selected.wa, ua, `Country-${selected.slug}`)}
                target="_blank"
                rel="noreferrer"
              >
                💬 Beställ {selected.name} — WhatsApp
              </a>
              <a
                className="btnSecondary"
                style={{ flex: 1, minWidth: 130, textAlign: "center", fontSize: 13, padding: "13px 14px" }}
                href={generateWhatsAppLink(
                  `Hej! Jag vill testa ${selected.name} kanaler gratis 24h.`,
                  ua,
                  `Trial-${selected.slug}`
                )}
                target="_blank"
                rel="noreferrer"
              >
                🧪 Testa 24h gratis
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
