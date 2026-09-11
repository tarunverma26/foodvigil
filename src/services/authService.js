/**
 * FoodVigil Client Authentication & User Session Service
 */

const STORAGE_KEY = 'foodvigil_auth_user';

export const DEMO_PROFILES = [
  {
    id: 'demo-analyst',
    name: 'Dr. Tarun Verma',
    email: 'tarun.verma@foodvigil.in',
    role: 'Certified Food Toxicologist & Analyst',
    avatar: '👨‍🔬',
    scansCount: 48,
    reportsCount: 12,
    badge: 'Senior Safety Auditor'
  },
  {
    id: 'demo-consumer',
    name: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    role: 'Consumer Rights Advocate',
    avatar: '👩‍💼',
    scansCount: 23,
    reportsCount: 4,
    badge: 'Verified Consumer'
  },
  {
    id: 'demo-auditor',
    name: 'Rajesh Kumar',
    email: 'rajesh.fssai@standards.org.in',
    role: 'Statutory Standards Inspector',
    avatar: '📋',
    scansCount: 89,
    reportsCount: 31,
    badge: 'FSSAI Standards Liaison'
  }
];

class AuthService {
  constructor() {
    this.listeners = [];
  }

  getCurrentUser() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  loginWithEmail(email, password) {
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const name = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const user = {
      id: 'usr-' + Date.now(),
      name,
      email,
      role: 'Verified Consumer Advocate',
      avatar: '🛡️',
      scansCount: 1,
      reportsCount: 0,
      badge: 'Active Member',
      loggedInAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.notify(user);
    return user;
  }

  loginWithDemo(demoId) {
    const profile = DEMO_PROFILES.find(p => p.id === demoId) || DEMO_PROFILES[0];
    const user = {
      ...profile,
      loggedInAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.notify(user);
    return user;
  }

  signup(name, email, password, role = 'Consumer Advocate') {
    if (!name || !email || !password) {
      throw new Error('All fields are required.');
    }
    const user = {
      id: 'usr-' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
      avatar: '🛡️',
      scansCount: 0,
      reportsCount: 0,
      badge: 'New Member',
      loggedInAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    this.notify(user);
    return user;
  }

  logout() {
    localStorage.removeItem(STORAGE_KEY);
    this.notify(null);
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(user) {
    this.listeners.forEach(fn => fn(user));
  }
}

export const authService = new AuthService();