export type baseTypes = 'bcn' | 'pmi' | 'mad' | 'sev' | 'bio' | 'vlc'

export interface BaseCode {
  [key: string]: string;
}


export const baseCodes: BaseCode = {
  'pmi': 'Barcelona',
  'mad': 'Madrid',
  'sev': 'Sevilla',
  'bio': 'Bilbao',
  'vlc': 'Valencia'
}
