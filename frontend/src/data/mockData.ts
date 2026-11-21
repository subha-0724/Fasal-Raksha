// ============================================================
// Fasal Raksha — Mock Data
// Domain: Crop damage from Flood / Rain / Animal / Pest / Other
// Roles: Farmer, Agriculture Officer, Forest Officer
// ============================================================

export type IncidentType = "flood" | "rain" | "animal" | "pest" | "other";

export type IncidentStatus =
  | "pending"
  | "acknowledged"
  | "verified"
  | "approved"
  | "rejected"
  | "paid";

export type Severity = "low" | "medium" | "high" | "critical";

export type UserRole = "farmer" | "agri_officer" | "forest_officer" | "admin";

// ---------------- Users ----------------
export interface User {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  village?: string;
  district?: string;
}

export const mockFarmer: User = {
  id: "u1",
  name: "Ramesh Kumar",
  role: "farmer",
  phone: "+91 98765 43210",
  village: "Bandipur",
  district: "Chamarajanagar",
};

export const mockAgriOfficer: User = {
  id: "u2",
  name: "Anita Sharma",
  role: "agri_officer",
  phone: "+91 98765 11111",
  district: "Chamarajanagar",
};

export const mockForestOfficer: User = {
  id: "u3",
  name: "Vikram Rao",
  role: "forest_officer",
  phone: "+91 98765 22222",
  district: "Chamarajanagar",
};

export const mockOfficer = mockAgriOfficer;

// ---------------- Incidents ----------------
export interface Incident {
  id: string;
  type: IncidentType;
  title: string;
  description: string;
  status: IncidentStatus;
  severity: Severity;
  animalSpecies?: string;
  reporterName: string;
  reporterPhone: string;
  location: {
    lat: number;
    lng: number;
    village: string;
    district: string;
  };
  createdAt: string;
  updatedAt: string;
  slaDeadline: string;
  images: number;
  cropType: string;
  areaAffected: string;
  assignedAgriOfficer?: string;
  notifiedForestOfficer: boolean;
}

export const mockIncidents: Incident[] = [
  {
    id: "INC-2026-001",
    type: "animal",
    title: "Elephant herd damaged sugarcane field",
    description:
      "Herd of 4 elephants entered the field at 2 AM. Approximately 2 acres damaged. Forest team informed.",
    status: "pending",
    severity: "high",
    animalSpecies: "Asian Elephant",
    reporterName: "Ramesh Kumar",
    reporterPhone: "+91 98765 43210",
    location: { lat: 11.6655, lng: 76.6345, village: "Bandipur", district: "Chamarajanagar" },
    createdAt: "2026-10-03T02:15:00Z",
    updatedAt: "2026-10-03T02:15:00Z",
    slaDeadline: "2026-10-04T02:15:00Z",
    images: 3,
    cropType: "Sugarcane",
    areaAffected: "2 acres",
    notifiedForestOfficer: true,
  },
  {
    id: "INC-2026-002",
    type: "flood",
    title: "Flash flood destroyed paddy saplings",
    description: "Sudden flash flood damaged newly planted paddy across 3 acres.",
    status: "verified",
    severity: "critical",
    reporterName: "Lakshmi Devi",
    reporterPhone: "+91 98765 44444",
    location: { lat: 11.6721, lng: 76.641, village: "Gundlupet", district: "Chamarajanagar" },
    createdAt: "2026-10-02T18:30:00Z",
    updatedAt: "2026-10-03T09:45:00Z",
    slaDeadline: "2026-10-03T18:30:00Z",
    images: 4,
    cropType: "Paddy",
    areaAffected: "3 acres",
    assignedAgriOfficer: "Anita Sharma",
    notifiedForestOfficer: false,
  },
  {
    id: "INC-2026-003",
    type: "pest",
    title: "Fall armyworm infestation in maize",
    description: "Severe fall armyworm attack on 1.5 acres. Leaves heavily damaged.",
    status: "acknowledged",
    severity: "medium",
    reporterName: "Suresh Gowda",
    reporterPhone: "+91 98765 55555",
    location: { lat: 11.6602, lng: 76.628, village: "Mudumalai", district: "Chamarajanagar" },
    createdAt: "2026-10-01T06:00:00Z",
    updatedAt: "2026-10-01T09:30:00Z",
    slaDeadline: "2026-10-04T06:00:00Z",
    images: 2,
    cropType: "Maize",
    areaAffected: "1.5 acres",
    assignedAgriOfficer: "Anita Sharma",
    notifiedForestOfficer: false,
  },
  {
    id: "INC-2026-004",
    type: "rain",
    title: "Unseasonal heavy rain flattened banana crop",
    description: "Continuous 6-hour downpour flattened 40 banana plants. Fruit loss.",
    status: "approved",
    severity: "medium",
    reporterName: "Ramesh Kumar",
    reporterPhone: "+91 98765 43210",
    location: { lat: 11.669, lng: 76.6305, village: "Bandipur", district: "Chamarajanagar" },
    createdAt: "2026-09-28T10:00:00Z",
    updatedAt: "2026-09-30T14:00:00Z",
    slaDeadline: "2026-09-29T10:00:00Z",
    images: 2,
    cropType: "Banana",
    areaAffected: "0.5 acres",
    assignedAgriOfficer: "Anita Sharma",
    notifiedForestOfficer: false,
  },
  {
    id: "INC-2026-005",
    type: "animal",
    title: "Wild boar damaged vegetable plot",
    description: "Wild boar entered the plot at night, uprooted 200+ vegetable plants.",
    status: "acknowledged",
    severity: "medium",
    animalSpecies: "Wild Boar",
    reporterName: "Suresh Gowda",
    reporterPhone: "+91 98765 55555",
    location: { lat: 11.6615, lng: 76.632, village: "Mudumalai", district: "Chamarajanagar" },
    createdAt: "2026-10-02T22:00:00Z",
    updatedAt: "2026-10-03T07:00:00Z",
    slaDeadline: "2026-10-03T22:00:00Z",
    images: 3,
    cropType: "Vegetables",
    areaAffected: "0.3 acres",
    assignedAgriOfficer: "Anita Sharma",
    notifiedForestOfficer: true,
  },
];

// ---------------- Claims ----------------
export interface Claim {
  id: string;
  incidentId: string;
  farmerName: string;
  cropType: string;
  areaAffected: string;
  claimAmount: number;
  approvedAmount?: number;
  status: "submitted" | "under_review" | "approved" | "rejected" | "paid";
  submittedAt: string;
  verifiedBy?: string;
}

export const mockClaims: Claim[] = [
  {
    id: "CLM-001",
    incidentId: "INC-2026-001",
    farmerName: "Ramesh Kumar",
    cropType: "Sugarcane",
    areaAffected: "2 acres",
    claimAmount: 45000,
    status: "submitted",
    submittedAt: "2026-10-03T06:00:00Z",
  },
  {
    id: "CLM-002",
    incidentId: "INC-2026-004",
    farmerName: "Ramesh Kumar",
    cropType: "Banana",
    areaAffected: "0.5 acres",
    claimAmount: 12000,
    approvedAmount: 10000,
    status: "approved",
    submittedAt: "2026-09-28T12:00:00Z",
    verifiedBy: "Anita Sharma",
  },
  {
    id: "CLM-003",
    incidentId: "INC-2026-002",
    farmerName: "Lakshmi Devi",
    cropType: "Paddy",
    areaAffected: "3 acres",
    claimAmount: 55000,
    status: "under_review",
    submittedAt: "2026-10-02T20:00:00Z",
  },
];

// ---------------- Deterrents ----------------
export interface Deterrent {
  id: string;
  species: string;
  method: string;
  description: string;
  effectiveness: "low" | "medium" | "high";
  isApproved: boolean;
}

export const mockDeterrents: Deterrent[] = [
  {
    id: "d1",
    species: "Asian Elephant",
    method: "Chili-tobacco rope fence",
    description: "Rope soaked in chili and tobacco paste. Elephants avoid the smell.",
    effectiveness: "high",
    isApproved: true,
  },
  {
    id: "d2",
    species: "Asian Elephant",
    method: "Beehive fencing",
    description: "Live bee colonies at field edges. Elephants fear bee stings.",
    effectiveness: "high",
    isApproved: true,
  },
  {
    id: "d3",
    species: "Wild Boar",
    method: "Solar-powered electric fence",
    description: "Low-voltage pulses. Humane and effective.",
    effectiveness: "high",
    isApproved: true,
  },
  {
    id: "d4",
    species: "Wild Boar",
    method: "Rock salt barrier",
    description: "Salt-treated boundary discourages boars from entering.",
    effectiveness: "medium",
    isApproved: true,
  },
  {
    id: "d5",
    species: "Monkey / Macaque",
    method: "Reflective tape + noise",
    description: "Shiny tape strips and periodic loud sounds.",
    effectiveness: "low",
    isApproved: true,
  },
];

// ---------------- Notifications ----------------
export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  link?: string;
}

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "Officer acknowledged your report",
    message: "INC-2026-001 has been acknowledged by Anita Sharma.",
    createdAt: "2026-10-03T03:00:00Z",
    isRead: false,
    link: "/farmer/incidents/INC-2026-001",
  },
  {
    id: "n2",
    title: "Field verification complete",
    message: "INC-2026-002 has been verified by the field officer.",
    createdAt: "2026-10-03T09:45:00Z",
    isRead: false,
    link: "/farmer/incidents/INC-2026-002",
  },
  {
    id: "n3",
    title: "Claim approved",
    message: "Your claim CLM-002 has been approved for ₹10,000.",
    createdAt: "2026-09-30T10:00:00Z",
    isRead: true,
    link: "/farmer/claims",
  },
];

// ---------------- Helpers ----------------
export const getIncidentById = (id: string) =>
  mockIncidents.find((i) => i.id === id);

export const getClaimById = (id: string) =>
  mockClaims.find((c) => c.id === id);

export const getClaimsForFarmer = (farmerName: string) =>
  mockClaims.filter((c) => c.farmerName === farmerName);

// ---------------- Compensation rates (per acre, ₹) ----------------
export const cropRates: Record<string, number> = {
  Paddy: 25000,
  Sugarcane: 40000,
  Maize: 20000,
  Banana: 45000,
  Vegetables: 35000,
  Ragi: 18000,
  Cotton: 30000,
  Groundnut: 28000,
};

// ---------------- Icons and labels for damage types ----------------
export const damageTypeMeta: Record<
  IncidentType,
  { emoji: string; label: string; color: string }
> = {
  flood: { emoji: "🌊", label: "Flood", color: "text-blue-600" },
  rain: { emoji: "🌧️", label: "Heavy Rain", color: "text-cyan-600" },
  animal: { emoji: "🐘", label: "Animal Damage", color: "text-amber-600" },
  pest: { emoji: "🐛", label: "Pest Damage", color: "text-green-600" },
  other: { emoji: "❓", label: "Other", color: "text-gray-600" },
};