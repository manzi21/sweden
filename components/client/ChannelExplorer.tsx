"use client";

// components/client/ChannelExplorer.tsx
// Tabbed channel preview with state management

import React, { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { dict } from "../shared/dict";
import { channelPreview } from "../shared/plans";

export function ChannelExplorer() {
  const { lang } = useLanguage();
  const t = dict[lang];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="channels" className="section">
      <div className="sectionHead">
        <h2>{t.channels.title}</h2>
        <p>{t.channels.sub}</p>
      </div>
      <div className="explorerBox">
        <div className="tabs" role="tablist">
          {channelPreview.map((item, i) => (
            <button
              key={i}
              className={`tabBtn ${activeTab === i ? "active" : ""}`}
              onClick={() => setActiveTab(i)}
              role="tab"
              aria-selected={activeTab === i}
              type="button"
            >
              {item.country}
            </button>
          ))}
        </div>
        <div className="channelList" role="tabpanel">
          {channelPreview[activeTab].channels.map((ch) => (
            <div key={ch} className="channelItem">
              ▶ {ch}
            </div>
          ))}
          <div className="channelItem more">{t.channels.more}</div>
        </div>
      </div>
    </section>
  );
}
