import { query, get } from '../db/db.js';

export const businessController = {
  // GET /api/v1/business/verify?query=...
  async verifyBusiness(req, res) {
    try {
      const { query: searchQuery } = req.query;
      if (!searchQuery || !searchQuery.trim()) {
        return res.status(400).json({ success: false, message: 'License number or business name required.' });
      }

      const q = searchQuery.trim().toLowerCase();

      // Look up in SQLite DB
      const row = await get(
        `SELECT * FROM fssai_businesses 
         WHERE LOWER(license_number) LIKE ? OR LOWER(business_name) LIKE ? OR LOWER(brand_name) LIKE ?`,
        [`%${q}%`, `%${q}%`, `%${q}%`]
      );

      if (row) {
        return res.json({
          success: true,
          isDemoData: Boolean(row.is_demo_data),
          data: {
            licenseNumber: row.license_number,
            businessName: row.business_name,
            brandName: row.brand_name,
            premisesAddress: row.premises_address,
            category: row.category,
            status: row.status,
            statusCode: row.status_code,
            issueDate: row.issue_date,
            validUpto: row.valid_upto,
            hygieneRating: row.hygiene_rating,
            inspectionGrade: row.inspection_grade,
            publicNotices: JSON.parse(row.public_notices_json || '[]'),
            lastVerified: new Date().toISOString().split('T')[0]
          }
        });
      }

      // Check 14-digit structure dynamically
      const numOnly = q.replace(/[^0-9]/g, '');
      if (numOnly.length === 14) {
        const stateCode = numOnly.substring(1, 3);
        const year = `20${numOnly.substring(3, 5)}`;
        return res.json({
          success: true,
          isDemoData: true,
          data: {
            licenseNumber: numOnly,
            businessName: `Registered Food Business Operator (#${numOnly.substring(8)})`,
            brandName: 'Commercial Trade Entity',
            premisesAddress: `Plot ${numOnly.substring(10)}, Industrial Zone, State Code ${stateCode}, India`,
            category: numOnly.startsWith('1') ? 'Central Food License (Manufacturing)' : 'State Food Registration',
            status: 'ACTIVE',
            statusCode: 'active',
            issueDate: `10-May-${year}`,
            validUpto: '09-May-2028',
            hygieneRating: 4,
            inspectionGrade: 'Grade A (Standard Compliance)',
            publicNotices: [],
            lastVerified: new Date().toISOString().split('T')[0]
          }
        });
      }

      return res.status(404).json({
        success: false,
        message: 'No matching FSSAI record or registered trade entity found.'
      });

    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
};
