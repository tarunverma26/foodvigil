import { setCorsHeaders } from './_lib/cors.js';
import { query, run, store, isPostgres } from './_lib/db.js';

export default async function handler(req, res) {
  if (setCorsHeaders(req, res)) return;

  if (req.method === 'POST') {
    try {
      const { reportId, fileName, fileType, fileSize } = req.body || {};
      const id = `EVD-${Date.now()}`;
      const item = {
        id,
        reportId: reportId || null,
        fileName: fileName || 'Evidence_File.jpg',
        fileType: fileType || 'Tax Invoice',
        fileSize: fileSize || '1.5 MB',
        storage_path: `/uploads/${fileName || 'file.jpg'}`,
        created_at: new Date().toISOString()
      };

      if (isPostgres) {
        try {
          await run(
            `INSERT INTO evidence (id, report_id, file_name, file_type, file_size, storage_path)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [id, reportId || null, item.fileName, item.fileType, item.fileSize, item.storage_path]
          );
        } catch (e) {
          console.warn('DB evidence insert notice:', e.message);
        }
      }

      store.evidence.unshift(item);

      return res.status(201).json({
        success: true,
        data: item
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  if (req.method === 'GET') {
    try {
      if (isPostgres) {
        try {
          const rows = await query(`
            SELECT e.*, r.tracking_number, r.product_name 
            FROM evidence e 
            LEFT JOIN reports r ON e.report_id = r.id 
            ORDER BY e.created_at DESC
          `);
          if (rows && rows.length > 0) {
            const items = rows.map(r => ({
              id: r.id,
              fileName: r.file_name,
              type: r.file_type,
              relatedReport: r.tracking_number ? `${r.tracking_number} (${r.product_name})` : 'General Evidence',
              uploadDate: new Date(r.created_at).toLocaleDateString('en-IN'),
              fileSize: r.file_size,
              fileType: r.file_name.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
              status: 'Attached to Active Dossier'
            }));
            return res.status(200).json({ success: true, count: items.length, data: items });
          }
        } catch (e) {
          console.warn('DB evidence get notice:', e.message);
        }
      }

      return res.status(200).json({
        success: true,
        count: store.evidence.length,
        data: store.evidence.map(r => ({
          id: r.id,
          fileName: r.file_name || r.fileName,
          type: r.file_type || r.fileType,
          relatedReport: 'Attached Dossier Evidence',
          uploadDate: r.created_at ? new Date(r.created_at).toLocaleDateString('en-IN') : 'Today',
          fileSize: r.file_size || r.fileSize || '1.2 MB',
          fileType: (r.file_name || r.fileName || '').endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
          status: 'Attached to Active Dossier'
        }))
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
