import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  Download, 
  ChevronRight, 
  Building2, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  ExternalLink,
  PlusCircle,
  FolderLock
} from 'lucide-react';
import { apiService } from '../services/apiService';
import jsPDF from 'jspdf';

export default function MyReports() {
  const location = useLocation();
  const [reports, setReports] = useState([]);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    setReports(apiService.getReports());
  }, [location.state]);

  const handleDownloadPDF = (report) => {
    setDownloadingId(report.id);
    try {
      const doc = new jsPDF({ unit: 'mm', format: 'a4' });

      // Header Banner
      doc.setFillColor(15, 57, 43); // Forest Deep
      doc.rect(0, 0, 210, 26, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.text('FOODVIGIL INDIA — CONSUMER GRIEVANCE DOSSIER', 14, 11);

      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.text('Formatted for FSSAI Food Safety Connect & National Consumer Helpline (NCH 1915)', 14, 17);
      doc.text(`Tracking ID: ${report.trackingNumber} | Date: ${report.dateSubmitted}`, 14, 22);

      let y = 36;
      const addSection = (title, lines) => {
        doc.setFillColor(241, 245, 249);
        doc.rect(14, y - 4, 182, 7, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(15, 57, 43);
        doc.text(title, 16, y + 1);
        y += 7;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(30, 41, 59);

        lines.forEach(line => {
          doc.text(line, 16, y);
          y += 4.5;
        });
        y += 3;
      };

      addSection('1. PRODUCT IDENTIFICATION', [
        `Product Name: ${report.productName}`,
        `Brand / Manufacturer: ${report.brand} | Batch No: ${report.batchNumber}`,
        `FSSAI License: ${report.fssaiLicense || 'Not Disclosed on Pack'}`
      ]);

      addSection('2. MERCHANT & JURISDICTION', [
        `Vendor / Store Name: ${report.storeName}`,
        `Location / City: ${report.city}, India | Date of Incident: ${report.dateSubmitted}`
      ]);

      addSection('3. CLASSIFICATION OF SAFETY ISSUE', [
        `Category: ${report.category}`,
        `Current Status: ${report.status}`
      ]);

      const splitDesc = doc.splitTextToSize(report.description, 178);
      addSection('4. COMPLAINANT STATEMENT & OBSERVATION', [
        ...splitDesc,
        `Enclosed Evidentiary Items: ${report.evidenceCount || 2} documents attached in Evidence Vault.`
      ]);

      addSection('5. STATUTORY REMEDY REQUESTED (FSS ACT 2006)', [
        '1. Immediate surveillance and testing of reported batch under Section 47 of the Food Safety & Standards Act.',
        '2. Verification of operator license status on FOSCOS regulatory portal.',
        '3. Remediation notice to vendor and consumer redressal.'
      ]);

      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text('Electronically generated via FoodVigil Consumer Safety Platform.', 14, 285);

      doc.save(`FoodSafety-Report-${report.trackingNumber}.pdf`);
    } catch (e) {
      console.error(e);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>My Submitted Reports ({reports.length})</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900">
            Track Food Safety Reports
          </h1>
          <p className="text-xs text-slate-600">
            View active statuses, progress milestones, and download legal-grade complaint dossiers.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Link to="/evidence" className="btn-secondary text-xs py-2 px-3.5">
            <FolderLock className="w-4 h-4 text-slate-600" />
            <span>Evidence Vault</span>
          </Link>
          <Link to="/report" className="btn-forest text-xs py-2 px-3.5">
            <PlusCircle className="w-4 h-4" />
            <span>New Report</span>
          </Link>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.length === 0 ? (
          <div className="card-surface p-12 text-center space-y-3">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="font-bold text-sm text-slate-800">No Reports Filed Yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              If you have noticed suspicious food products, adulteration, or packaging tampering, use our guided reporter to log an incident.
            </p>
            <Link to="/report" className="btn-forest text-xs py-2 px-4 inline-flex">
              File First Report
            </Link>
          </div>
        ) : (
          reports.map((report) => (
            <div key={report.id} className="card-surface p-6 space-y-5">
              
              {/* Header: Tracking & Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-xs text-forest-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {report.trackingNumber}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{report.dateSubmitted}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mt-1">{report.productName}</h3>
                  <p className="text-xs text-slate-500">Brand: {report.brand} • Vendor: {report.storeName}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    report.status === 'Resolved' ? 'badge-good' : report.status === 'Assigned to DO' ? 'badge-attention' : 'badge-neutral'
                  }`}>
                    Status: {report.status}
                  </span>
                  
                  <button
                    onClick={() => handleDownloadPDF(report)}
                    disabled={downloadingId === report.id}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                    title="Download Official PDF Dossier"
                  >
                    <Download className="w-4 h-4 text-forest-900" />
                  </button>
                </div>
              </div>

              {/* Progress Milestones Bar */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Resolution Progress Timeline:
                </span>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                  {[
                    { step: 1, label: 'Submitted' },
                    { step: 2, label: 'Under Review' },
                    { step: 3, label: 'Assigned to DO' },
                    { step: 4, label: 'Resolved' }
                  ].map((s) => {
                    const isPassed = (report.statusStep || 2) >= s.step;
                    return (
                      <div key={s.step} className="space-y-1">
                        <div className={`h-1.5 rounded-full ${isPassed ? 'bg-emerald-600' : 'bg-slate-200'}`} />
                        <span className={`font-semibold ${isPassed ? 'text-forest-900' : 'text-slate-400'}`}>
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Description Preview */}
              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 leading-relaxed font-mono text-[11px] border border-slate-100">
                {report.description}
              </div>

              {/* Footer actions */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500">
                  📁 {report.evidenceCount || 2} evidence documents linked in Vault
                </span>
                <button
                  onClick={() => handleDownloadPDF(report)}
                  className="text-emerald-800 font-bold hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Legal PDF Summary</span>
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
