import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Camera, 
  FileWarning, 
  AlertOctagon, 
  Award, 
  TrendingUp, 
  ChevronRight, 
  CheckCircle2, 
  FolderLock, 
  SearchCheck,
  Sparkles,
  Info,
  Clock
} from 'lucide-react';
import { apiService } from '../services/apiService';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(apiService.getUserDashboard());
  }, []);

  if (!stats) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 mb-2">
            <LayoutDashboard className="w-3.5 h-3.5 text-forest-800" />
            <span>Consumer Activity Overview</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900">
            My Food Safety Dashboard
          </h1>
          <p className="text-xs text-brand-muted">
            Track your verified product scans, grievance milestones, awareness score, and active statutory notices.
          </p>
        </div>

        <Link to="/scan" className="btn-forest text-xs py-2.5 px-5 self-start sm:self-center shadow-sm">
          <Camera className="w-4 h-4" />
          <span>Scan New Product</span>
        </Link>
      </div>

      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Products Scanned */}
        <div className="card-surface p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-brand-muted">Products Scanned</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-forest-800 flex items-center justify-center border border-emerald-200">
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-display text-forest-900">{stats.scansCount}</div>
          <span className="text-[11px] text-brand-muted">Decoded & verified</span>
        </div>

        {/* Reports Filed */}
        <div className="card-surface p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-brand-muted">Reports Filed</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-brand-orange flex items-center justify-center border border-amber-200">
              <FileWarning className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-display text-forest-900">{stats.reportsCount}</div>
          <span className="text-[11px] text-brand-muted">Active consumer dossiers</span>
        </div>

        {/* Evidence Items */}
        <div className="card-surface p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-brand-muted">Evidence Documents</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-forest-800 flex items-center justify-center border border-emerald-200">
              <FolderLock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black font-display text-forest-900">{stats.evidenceCount}</div>
          <span className="text-[11px] text-brand-muted">Invoices & batch photos</span>
        </div>

        {/* Food Safety Awareness Score */}
        <div className="card-surface p-5 space-y-2 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-900 text-white border border-forest-700">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-brand-orange">Awareness Score</span>
            <Award className="w-4 h-4 text-brand-orange" />
          </div>
          <div className="text-2xl font-black font-display text-white">{stats.awarenessScore} <span className="text-xs font-normal text-emerald-200">/ 100</span></div>
          <span className="text-[10px] text-emerald-200">Engagement & Learning Level</span>
        </div>

      </div>

      {/* Awareness Score Metric Disclaimer */}
      <div className="p-3.5 bg-brand-bg/60 border border-brand-border rounded-xl flex items-center gap-2 text-xs text-brand-muted">
        <Info className="w-4 h-4 text-brand-muted flex-shrink-0" />
        <span>
          <strong className="text-brand-text">Note:</strong> The Food Safety Awareness Score is an engagement metric reflecting your platform activity and learning milestones. It is not an official health or medical indicator.
        </span>
      </div>

      {/* RECENT SCANS & RECENT REPORTS SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Scans */}
        <div className="card-surface p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-brand-border">
            <h3 className="font-bold text-sm text-forest-900 flex items-center gap-2">
              <Camera className="w-4 h-4 text-forest-800" />
              <span>Recent Food Label Scans</span>
            </h3>
            <Link to="/scan" className="text-xs text-forest-800 font-bold hover:underline">
              Scan More
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentScans.map((p) => (
              <Link
                key={p.id}
                to={`/scan/result?preset=${p.id}`}
                className="p-3.5 bg-brand-bg/40 hover:bg-emerald-50/50 rounded-xl border border-brand-border flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl p-1.5 bg-white rounded-lg shadow-soft-sm border border-brand-border">{p.image}</span>
                  <div>
                    <h4 className="font-bold text-xs text-brand-text group-hover:text-forest-900">{p.productName}</h4>
                    <p className="text-[11px] text-brand-muted">{p.brand} • FSSAI: {p.licenseNumber}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    p.status === 'good' ? 'badge-good' : p.status === 'attention' ? 'badge-attention' : 'badge-urgent'
                  }`}>
                    {p.statusLabel?.split(' ')[0] || 'Checked'}
                  </span>
                  <ChevronRight className="w-4 h-4 text-brand-muted" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="card-surface p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-brand-border">
            <h3 className="font-bold text-sm text-forest-900 flex items-center gap-2">
              <FileWarning className="w-4 h-4 text-forest-800" />
              <span>Recent Grievance Reports</span>
            </h3>
            <Link to="/my-reports" className="text-xs text-forest-800 font-bold hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentReports.map((r) => (
              <div key={r.id} className="p-3.5 bg-brand-bg/40 rounded-xl border border-brand-border space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-brand-text">{r.trackingNumber}</span>
                  <span className="badge-attention text-[10px] px-2 py-0.5 rounded-full font-semibold">
                    {r.status}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-brand-text">{r.productName}</h4>
                <p className="text-[11px] text-brand-muted">{r.category} • {r.city}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
