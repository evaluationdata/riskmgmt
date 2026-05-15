/**
 * Application Constants
 * Extracted data structures and enumerations
 */

// Department/Reparto options
export const DEPARTMENTS = {
  BASE: [
    'Pronto Soccorso (DEA)',
    'Medicina interna',
    'Cardiologia con UTIC',
    'Neurologia',
    'Oncologia',
    'Psichiatria',
    'Ortopedia e traumatologia',
    'Urologia',
    'Ostetricia e ginecologia',
    'Pediatria',
    'Oculistica',
    'Otorinolaringoiatria',
    'Anestesia e rianimazione',
    'Radiologia con TAC ed ecografia',
    'Laboratorio analisi',
    'Servizio immunotrasfusionale',
    'Osservazione breve intensiva (OBI)',
    'Terapia sub-intensiva multidisciplinare',
  ],
  CARDIOLOGY: [
    'Cardiochirurgia',
    'Emodinamica (cardiologia interventistica h24)',
    'Unità coronarica (UTIC)',
  ],
  NEUROLOGY: [
    'Neurochirurgia',
    'Stroke unit di II livello',
  ],
  SURGERY: [
    'Chirurgia vascolare',
    'Chirurgia toracica',
    'Chirurgia plastica e ricostruttiva',
  ],
  TRAUMA: [
    'Centro trauma di alta specializzazione (trauma center)',
    'Trauma team multidisciplinare',
    'Terapia intensiva',
    'Terapie sub-intensive',
    'Terapia intensiva neonatale (TIN)',
  ],
  IMAGING: [
    'Radiologia interventistica',
    'TAC multistrato',
    'Risonanza magnetica',
    'Medicina nucleare',
  ],
  ENDOSCOPY: [
    'Endoscopia interventistica avanzata',
    'Laboratorio analisi avanzato',
    'Servizio trasfusionale completo',
  ],
};

// Flatten departments for easy access
export function getAllDepartments() {
  return Object.values(DEPARTMENTS).flat();
}

// Claim Types
export const CLAIM_TYPES = {
  DAMAGE: 'danno',
  RISK: 'rischio',
  COMPLAINT: 'reclamo',
};

export const CLAIM_TYPE_LABELS = {
  [CLAIM_TYPES.DAMAGE]: 'Danno (Damage)',
  [CLAIM_TYPES.RISK]: 'Rischio (Risk)',
  [CLAIM_TYPES.COMPLAINT]: 'Reclamo (Complaint)',
};

// Claim Status
export const CLAIM_STATUS = {
  OPEN: 'in_corso',
  CLOSED: 'chiuso',
};

export const CLAIM_STATUS_LABELS = {
  [CLAIM_STATUS.OPEN]: 'Aperto (Open)',
  [CLAIM_STATUS.CLOSED]: 'Chiuso (Closed)',
};

// Severity Levels
export const SEVERITY = {
  LIGHT: 'lieve',
  MODERATE: 'moderata',
  SERIOUS: 'grave',
  CRITICAL: 'gravissima',
};

export const SEVERITY_LABELS = {
  [SEVERITY.LIGHT]: 'Lieve (Light)',
  [SEVERITY.MODERATE]: 'Moderata (Moderate)',
  [SEVERITY.SERIOUS]: 'Grave (Serious)',
  [SEVERITY.CRITICAL]: 'Gravissima (Critical)',
};

// Request Types
export const REQUEST_TYPES = {
  EXTRAJUDICIAL: 'stragiudiziale',
  JUDICIAL: 'giudiziale',
};

export const REQUEST_TYPE_LABELS = {
  [REQUEST_TYPES.EXTRAJUDICIAL]: 'Stragiudiziale (Extrajudicial)',
  [REQUEST_TYPES.JUDICIAL]: 'Giudiziale (Judicial)',
};

// Legal Outcomes
export const LEGAL_OUTCOMES = {
  SETTLEMENT: 'accordo',
  FAVORABLE_SENTENCE: 'sentenza_favorevole',
  UNFAVORABLE_SENTENCE: 'sentenza_sfavorevole',
  ARCHIVED: 'archiviato',
};

export const LEGAL_OUTCOME_LABELS = {
  [LEGAL_OUTCOMES.SETTLEMENT]: 'Accordo (Settlement)',
  [LEGAL_OUTCOMES.FAVORABLE_SENTENCE]: 'Sentenza Favorevole (Favorable)',
  [LEGAL_OUTCOMES.UNFAVORABLE_SENTENCE]: 'Sentenza Sfavorevole (Unfavorable)',
  [LEGAL_OUTCOMES.ARCHIVED]: 'Archiviato (Archived)',
};

// Structure Types
export const STRUCTURE_TYPES = {
  HOSPITAL: 'ospedale',
  NURSING_HOME: 'casa_cura',
  DENTAL: 'studio_dentistico',
  POLYCLINIC: 'poliambulatorio',
  DIAGNOSTIC_CENTER: 'centro_diagnostico',
  RSA: 'rsa',
  LONG_TERM_CARE: 'lungo_degenza',
  REHABILITATION: 'centro_riabilitazione',
  HOME_CARE: 'assistenza_domiciliare',
};

export const STRUCTURE_TYPE_LABELS = {
  [STRUCTURE_TYPES.HOSPITAL]: 'Ospedale (Hospital)',
  [STRUCTURE_TYPES.NURSING_HOME]: 'Casa di Cura (Nursing Home)',
  [STRUCTURE_TYPES.DENTAL]: 'Studio Dentistico (Dental Office)',
  [STRUCTURE_TYPES.POLYCLINIC]: 'Poliambulatorio (Polyclinic)',
  [STRUCTURE_TYPES.DIAGNOSTIC_CENTER]: 'Centro Diagnostico (Diagnostic Center)',
  [STRUCTURE_TYPES.RSA]: 'RSA - Residenza Sanitaria Assistenziale',
  [STRUCTURE_TYPES.LONG_TERM_CARE]: 'Struttura Lungo Degenza',
  [STRUCTURE_TYPES.REHABILITATION]: 'Centro Riabilitazione (Rehabilitation)',
  [STRUCTURE_TYPES.HOME_CARE]: 'Assistenza Domiciliare (Home Care)',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  OPERATOR: 'operator',
  VIEWER: 'viewer',
};

export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Amministratore (Admin)',
  [USER_ROLES.MANAGER]: 'Direttore (Manager)',
  [USER_ROLES.OPERATOR]: 'Operatore (Operator)',
  [USER_ROLES.VIEWER]: 'Visualizzatore (Viewer)',
};

// CVS Committee Members
export const CVS_ROLES = {
  RISK_MANAGER: 'risk_manager',
  MEDICAL_LEGAL: 'medico_legale',
  LOSS_ADJUSTER: 'loss_adjuster',
  ATTORNEY: 'avvocato_fiduciario',
};

export const CVS_ROLE_LABELS = {
  [CVS_ROLES.RISK_MANAGER]: '🛡️ Risk Manager',
  [CVS_ROLES.MEDICAL_LEGAL]: '⚕️ Medico Legale (Medical Legal)',
  [CVS_ROLES.LOSS_ADJUSTER]: '📊 Loss Adjuster',
  [CVS_ROLES.ATTORNEY]: '⚖️ Avvocato Fiduciario (Attorney)',
};

// Meeting Types
export const MEETING_TYPES = {
  ORDINARY: 'ordinaria',
  EXTRAORDINARY: 'straordinaria',
  URGENT: 'urgente',
};

export const MEETING_TYPE_LABELS = {
  [MEETING_TYPES.ORDINARY]: 'Riunione Ordinaria (Ordinary)',
  [MEETING_TYPES.EXTRAORDINARY]: 'Riunione Straordinaria (Extraordinary)',
  [MEETING_TYPES.URGENT]: 'Riunione Urgente (Urgent)',
};
