import React, { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Booking, BookingStatus } from '../lib/supabase';
import {
  LogOut, RefreshCw, Eye, X, Mail, Phone, Tag, Wallet,
  MessageSquare, Calendar, ChevronDown, Users, Clock, CheckCircle2, XCircle
} from 'lucide-react';

const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string; bg: string }> = {
  new:       { label: 'New',       color: 'text-blue-400',   bg: 'bg-blue-400/10 border-blue-400/30' },
  contacted: { label: 'Contacted', color: 'text-amber-400',  bg: 'bg-amber-400/10 border-amber-400/30' },
  completed: { label: 'Completed', color: 'text-emerald-400',bg: 'bg-emerald-400/10 border-emerald-400/30' },
  cancelled: { label: 'Cancelled', color: 'text-red-400',    bg: 'bg-red-400/10 border-red-400/30' },
};

const BUDGET_LABELS: Record<string, string> = {
  tier1: '₹5L – ₹25L',
  tier2: '₹25L – ₹1Cr',
  tier3: '₹1Cr+',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

/* ─── Login Screen ────────────────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else onLogin();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-serif text-3xl tracking-widest text-white uppercase mb-1">Lumina</p>
          <p className="text-xs tracking-[0.3em] uppercase text-white/30">Admin Panel</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Email</label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="admin@luminainteriors.com"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Password</label>
            <input
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit" disabled={loading}
            className="w-full bg-amber-500 text-black py-3 text-xs uppercase tracking-widest font-medium hover:bg-amber-400 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ─── Booking Detail Modal ────────────────────────────────────────────── */
function BookingModal({ booking, onClose, onStatusChange }: {
  booking: Booking;
  onClose: () => void;
  onStatusChange: (id: string, status: BookingStatus) => void;
}) {
  const s = STATUS_CONFIG[booking.status];
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#1A1A1A] border border-white/10 w-full max-w-lg rounded-sm shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="font-serif text-lg text-white">Booking Details</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X size={18} /></button>
        </div>
        <div className="px-6 py-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-serif text-xl text-white">{booking.name}</p>
            <span className={`text-xs px-3 py-1 border rounded-full ${s.bg} ${s.color}`}>{s.label}</span>
          </div>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <Row icon={<Mail size={13} />} label="Email"   value={booking.email} />
            <Row icon={<Phone size={13} />} label="Phone"  value={booking.phone ?? '—'} />
            <Row icon={<Tag size={13} />}   label="Project" value={booking.project_type ?? '—'} />
            <Row icon={<Wallet size={13} />} label="Budget" value={booking.budget ? (BUDGET_LABELS[booking.budget] ?? booking.budget) : '—'} />
            <Row icon={<Calendar size={13} />} label="Received" value={formatDate(booking.created_at)} />
            {booking.message && (
              <div className="pt-2 border-t border-white/10">
                <div className="flex items-center gap-2 text-white/40 mb-2">
                  <MessageSquare size={13} /><span className="text-xs uppercase tracking-widest">Message</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{booking.message}</p>
              </div>
            )}
          </div>
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs uppercase tracking-widest text-white/40 mb-3">Update Status</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(STATUS_CONFIG) as BookingStatus[]).map(st => (
                <button
                  key={st}
                  onClick={() => onStatusChange(booking.id, st)}
                  className={`text-xs px-4 py-2 border transition-colors ${
                    booking.status === st
                      ? `${STATUS_CONFIG[st].bg} ${STATUS_CONFIG[st].color} border-current`
                      : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white/80'
                  }`}
                >
                  {STATUS_CONFIG[st].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-white/30 mt-0.5">{icon}</span>
      <span className="text-white/40 w-20 shrink-0 text-xs uppercase tracking-wider">{label}</span>
      <span className="text-white/80">{value}</span>
    </div>
  );
}

/* ─── Main Dashboard ──────────────────────────────────────────────────── */
export function Admin() {
  const [session, setSession] = useState<boolean>(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session);
      setChecking(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(!!s));
    return () => subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <p className="font-serif text-3xl tracking-widest text-white uppercase mb-2">Lumina</p>
          <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-10">Admin Panel</p>
          <div className="border border-amber-500/30 bg-amber-500/10 px-6 py-6 text-left space-y-4">
            <p className="text-amber-400 text-sm font-medium">⚠ Supabase not configured</p>
            <p className="text-white/60 text-sm leading-relaxed">Create a <code className="bg-white/10 px-1.5 py-0.5 rounded text-amber-300">.env</code> file in the project root with:</p>
            <pre className="bg-black/40 px-4 py-3 text-xs text-emerald-400 overflow-x-auto rounded">{`VITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_ANON_KEY=your-anon-key`}</pre>
            <p className="text-white/40 text-xs">Find these in your Supabase project → <strong className="text-white/60">Settings → API</strong></p>
          </div>
          <a href="/" className="inline-block mt-8 text-xs uppercase tracking-widest text-white/30 hover:text-white transition-colors">← Back to site</a>
        </div>
      </div>
    );
  }

  if (checking) {
    return <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
      <RefreshCw size={20} className="text-amber-500 animate-spin" />
    </div>;
  }

  if (!session) return <LoginScreen onLogin={() => setSession(true)} />;
  return <Dashboard />;
}

function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all');
  const [sortAsc, setSortAsc] = useState(false);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: sortAsc });
    setBookings((data as Booking[]) ?? []);
    setLoading(false);
  }, [sortAsc]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const updateStatus = async (id: string, status: BookingStatus) => {
    await supabase.from('bookings').update({ status }).eq('id', id);
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  };

  const handleLogout = async () => { await supabase.auth.signOut(); };

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  const counts = {
    all:       bookings.length,
    new:       bookings.filter(b => b.status === 'new').length,
    contacted: bookings.filter(b => b.status === 'contacted').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  const statCards = [
    { label: 'Total',     value: counts.all,       icon: <Users size={18} />,        color: 'text-white' },
    { label: 'New',       value: counts.new,        icon: <Clock size={18} />,        color: 'text-blue-400' },
    { label: 'Contacted', value: counts.contacted,  icon: <Mail size={18} />,         color: 'text-amber-400' },
    { label: 'Completed', value: counts.completed,  icon: <CheckCircle2 size={18} />, color: 'text-emerald-400' },
    { label: 'Cancelled', value: counts.cancelled,  icon: <XCircle size={18} />,      color: 'text-red-400' },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 md:px-10 py-4 flex items-center justify-between sticky top-0 bg-[#0F0F0F]/95 backdrop-blur z-30">
        <div>
          <p className="font-serif text-xl tracking-widest uppercase">Lumina</p>
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 -mt-0.5">Admin Dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchBookings} className="p-2 text-white/40 hover:text-white transition-colors" aria-label="Refresh">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-4 py-2">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <main className="px-6 md:px-10 py-8 max-w-7xl mx-auto">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map(c => (
            <div key={c.label} className="bg-white/5 border border-white/10 px-5 py-4">
              <div className={`${c.color} mb-2`}>{c.icon}</div>
              <p className="text-2xl font-serif">{c.value}</p>
              <p className="text-xs uppercase tracking-widest text-white/40 mt-0.5">{c.label}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {(['all', 'new', 'contacted', 'completed', 'cancelled'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs uppercase tracking-widest px-4 py-2 border transition-colors ${
                filter === f
                  ? 'border-amber-500 text-amber-500 bg-amber-500/10'
                  : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
              }`}
            >
              {f === 'all' ? `All (${counts.all})` : `${STATUS_CONFIG[f].label} (${counts[f]})`}
            </button>
          ))}
          <button
            onClick={() => setSortAsc(p => !p)}
            className="ml-auto flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-4 py-2"
          >
            <ChevronDown size={13} className={`transition-transform ${sortAsc ? 'rotate-180' : ''}`} />
            {sortAsc ? 'Oldest first' : 'Newest first'}
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-24"><RefreshCw size={20} className="text-amber-500 animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-white/30">
            <Users size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-sm uppercase tracking-widest">No bookings found</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block border border-white/10 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-white/40 font-normal">Name</th>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-white/40 font-normal">Email</th>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-white/40 font-normal">Project</th>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-white/40 font-normal">Budget</th>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-white/40 font-normal">Date</th>
                    <th className="text-left px-5 py-3 text-xs uppercase tracking-widest text-white/40 font-normal">Status</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b, i) => {
                    const s = STATUS_CONFIG[b.status];
                    return (
                      <tr key={b.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                        <td className="px-5 py-4 font-serif text-white">{b.name}</td>
                        <td className="px-5 py-4 text-white/60">{b.email}</td>
                        <td className="px-5 py-4 text-white/60 capitalize">{b.project_type ?? '—'}</td>
                        <td className="px-5 py-4 text-white/60">{b.budget ? (BUDGET_LABELS[b.budget] ?? b.budget) : '—'}</td>
                        <td className="px-5 py-4 text-white/40 text-xs">{formatDate(b.created_at)}</td>
                        <td className="px-5 py-4">
                          <span className={`text-xs px-2.5 py-1 border rounded-full ${s.bg} ${s.color}`}>{s.label}</span>
                        </td>
                        <td className="px-5 py-4">
                          <button onClick={() => setSelected(b)} className="text-white/30 hover:text-amber-500 transition-colors" aria-label="View">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filtered.map(b => {
                const s = STATUS_CONFIG[b.status];
                return (
                  <button key={b.id} onClick={() => setSelected(b)} className="w-full text-left bg-white/5 border border-white/10 px-5 py-4 hover:border-amber-500/40 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-serif text-white">{b.name}</p>
                      <span className={`text-xs px-2 py-0.5 border rounded-full ${s.bg} ${s.color}`}>{s.label}</span>
                    </div>
                    <p className="text-xs text-white/40">{b.email}</p>
                    <p className="text-xs text-white/30 mt-1">{formatDate(b.created_at)}</p>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </main>

      {selected && (
        <BookingModal booking={selected} onClose={() => setSelected(null)} onStatusChange={updateStatus} />
      )}
    </div>
  );
}
