"use client";

import { useState } from "react";
import { Check, ChevronDown, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { uid } from "@/lib/utils";

export interface Field {
  key: string;
  label: string;
  textarea?: boolean;
  array?: boolean;
  boolean?: boolean;
  number?: boolean;
}

type Item = Record<string, unknown>;

function initItem(fields: Field[]): Item {
  const o: Item = { id: uid("itm") };
  for (const f of fields) {
    if (f.boolean) o[f.key] = false;
    else if (f.number) o[f.key] = 0;
    else if (f.array) o[f.key] = [];
    else o[f.key] = "";
  }
  return o;
}

export default function ListEditor({
  title,
  items,
  endpoint,
  keyName,
  save,
  fields,
}: {
  title: string;
  items: unknown[];
  endpoint: string;
  keyName: string;
  save: (endpoint: string, payload: unknown, message: string) => Promise<void>;
  fields: Field[];
}) {
  const [drafts, setDrafts] = useState<Item[]>(() =>
    (items as Item[]).map((i) => ({ ...i })),
  );
  const [openId, setOpenId] = useState<string | null>(null);

  function update(id: string, key: string, value: unknown) {
    setDrafts((d) => d.map((it) => (it.id === id ? { ...it, [key]: value } : it)));
  }

  function add() {
    const item = initItem(fields);
    setDrafts((d) => [item, ...d]);
    setOpenId(item.id as string);
  }

  function remove(id: string) {
    setDrafts((d) => d.filter((it) => it.id !== id));
  }

  async function commit() {
    const payload: Item[] = drafts.map((it) => {
      const out: Item = { ...it };
      for (const f of fields) {
        if (f.array && typeof out[f.key] === "string") {
          const sep = f.textarea ? "\n" : ",";
          out[f.key] = (out[f.key] as string)
            .split(sep)
            .map((s: string) => s.trim())
            .filter(Boolean);
        }
        if (f.number) out[f.key] = Number(out[f.key]) || 0;
      }
      return out;
    });
    await save(endpoint, { [keyName]: payload }, `${title} saved`);
  }

  function fromArray(v: unknown): string {
    if (Array.isArray(v)) return v.join(", ");
    return String(v ?? "");
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">{title}</h1>
          <p className="mt-1 text-sm text-[#9a9aa3]">
            {drafts.length} item{drafts.length === 1 ? "" : "s"} · edits are local until you save
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={add}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm text-[#c7c7cd] transition hover:border-white/40 hover:text-white"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
          <button
            onClick={commit}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#d6d6dc]"
          >
            <Save className="h-4 w-4" /> Save changes
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {drafts.map((item) => {
          const open = openId === item.id;
          const titleText = String(item.title || item.role || item.degree || item.name || item.topic || "Untitled");
          return (
            <div key={item.id as string} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between gap-3 px-5 py-3.5">
                <button
                  onClick={() => setOpenId(open ? null : (item.id as string))}
                  className="flex flex-1 items-center gap-3 text-left"
                >
                  <ChevronDown className={`h-4 w-4 text-[#6b6b74] transition ${open ? "rotate-180" : ""}`} />
                  <span className="truncate text-sm font-medium">{titleText}</span>
                </button>
                <button
                  onClick={() => setOpenId(open ? null : (item.id as string))}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-white/12 text-[#9a9aa3] transition hover:text-white"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => remove(item.id as string)}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-red-500/20 text-red-400 transition hover:bg-red-500/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {open && (
                <div className="grid gap-4 border-t border-white/10 p-5 sm:grid-cols-2">
                  {fields.map((f) => (
                    <label key={f.key} className={f.textarea || f.array ? "sm:col-span-2" : ""}>
                      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-[#6b6b74]">
                        {f.label}
                      </span>
                      {f.boolean ? (
                        <button
                          onClick={() => update(item.id as string, f.key, !item[f.key])}
                          className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${
                            item[f.key]
                              ? "border-white bg-white text-black"
                              : "border-white/12 text-transparent"
                          }`}
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      ) : f.textarea ? (
                        <textarea
                          rows={4}
                          value={String(item[f.key] ?? "")}
                          onChange={(e) => update(item.id as string, f.key, e.target.value)}
                          className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-white/40"
                        />
                      ) : f.array ? (
                        <textarea
                          rows={3}
                          value={fromArray(item[f.key])}
                          onChange={(e) => update(item.id as string, f.key, e.target.value)}
                          className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-white/40"
                        />
                      ) : (
                        <input
                          type={f.number ? "number" : "text"}
                          value={String(item[f.key] ?? "")}
                          onChange={(e) =>
                            update(item.id as string, f.key, f.number ? Number(e.target.value) : e.target.value)
                          }
                          className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-white/40"
                        />
                      )}
                    </label>
                  ))}
                  <div className="sm:col-span-2">
                    <button
                      onClick={() => setOpenId(null)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm text-[#c7c7cd] transition hover:text-white"
                    >
                      <X className="h-4 w-4" /> Close editor
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {drafts.length === 0 && (
          <p className="rounded-2xl border border-dashed border-white/15 px-6 py-10 text-center text-sm text-[#6b6b74]">
            No items yet — click “Add” to create one.
          </p>
        )}
      </div>
    </div>
  );
}
