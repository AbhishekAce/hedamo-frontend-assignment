"use client";
import React, { useState } from 'react';

// Enhanced Data with History
const products = [
  { 
    id: "hdm-001", 
    name: "Eco-Polymer Grade A", 
    producer: "Global Synthetics Ltd.", 
    category: "Raw Materials",
    status: "Published", 
    updated: "2025-12-15",
    declaredBy: "Sarah Jenkins",
    description: "High-density polymer derived from 30% recycled ocean plastics.",
    history: [
      { version: "v2.0", date: "2025-12-15", event: "Disclosure Published" },
      { version: "v1.1", date: "2025-12-01", event: "Evidence Attached" },
      { version: "v1.0", date: "2025-11-20", event: "Initial Draft" }
    ]
  },
  { 
    id: "hdm-002", 
    name: "Organic Cotton Textile", 
    producer: "GreenWeave Co.", 
    category: "Fabrics",
    status: "Submitted", 
    updated: "2026-01-04",
    declaredBy: "Marcus Thorne",
    description: "Long-staple cotton grown without synthetic pesticides.",
    history: [
      { version: "v1.0", date: "2026-01-04", event: "Information Submitted" }
    ]
  }
];

export default function HedamoApp() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const selectedProduct = products.find(p => p.id === selectedId);
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 p-8 hidden lg:block">
        <div className="text-white font-bold text-2xl tracking-tighter mb-12">HEDAMO</div>
        <nav className="space-y-6 text-sm">
          <div className="text-white border-l-2 border-indigo-500 pl-4 font-medium">Product Registry</div>
          <div className="text-slate-500 pl-4 hover:text-slate-300 cursor-not-allowed">Producer Profiles</div>
        </nav>
      </aside>

      <main className="flex-1 p-12">
        {!selectedProduct ? (
          // LIST VIEW
          <div className="animate-in fade-in duration-500">
            <header className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Product Disclosures</h1>
                <p className="text-slate-500 mt-1">Registry of producer-declared product attributes.</p>
              </div>
            </header>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <input 
                  type="text" 
                  placeholder="Search by product name..." 
                  className="w-full max-w-xs px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-widest font-bold text-slate-400 border-b border-slate-200">
                  <tr>
                    <th className="px-8 py-4">Product / Producer</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="font-semibold text-slate-900">{p.name}</div>
                        <div className="text-sm text-slate-500">{p.producer}</div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                          p.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => setSelectedId(p.id)}
                          className="text-indigo-600 font-bold text-xs hover:text-indigo-800"
                        >
                          VIEW DETAIL →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // DETAIL VIEW
          <div className="animate-in slide-in-from-right duration-500 max-w-4xl">
            <button 
              onClick={() => setSelectedId(null)}
              className="text-slate-400 text-sm mb-8 hover:text-slate-900 flex items-center gap-2 transition-colors"
            >
              ← Back to Registry
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">{selectedProduct.name}</h2>
                <p className="text-slate-600 leading-relaxed mb-8">{selectedProduct.description}</p>
                
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-8">
                  <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-widest mb-3">Institutional Disclaimer</h4>
                  <p className="text-sm text-indigo-800 leading-relaxed">
                    This page presents <strong>producer-declared information</strong>; it is not certification or verification. 
                    Hedamo serves as a disclosure system and does not validate the accuracy of claims.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Version History</h4>
                  <div className="relative border-l-2 border-slate-200 ml-2 pl-6 space-y-8">
                    {selectedProduct.history.map((h, i) => (
                      <div key={i} className="relative">
                        <div className={`absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white ${i === 0 ? 'bg-indigo-600' : 'bg-slate-300'}`}></div>
                        <p className="text-xs font-bold text-slate-900">{h.version} — {h.event}</p>
                        <p className="text-[10px] text-slate-400">{h.date}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-white border border-slate-200 rounded-xl p-5">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Metadata</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase">Declared By</p>
                      <p className="text-sm font-medium">{selectedProduct.declaredBy}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase">Category</p>
                      <p className="text-sm font-medium">{selectedProduct.category}</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}