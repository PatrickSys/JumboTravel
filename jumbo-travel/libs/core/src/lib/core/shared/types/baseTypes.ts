export type baseTypes = 'bcn' | 'pmi' | 'mad' | 'sev' | 'bio' | 'vlc'

export interface BaseCode {
  [key: string]: string;
}


export const baseCodes: BaseCode = {
  'pmi': 'Palma de Mallorca',
  'mad': 'Madrid',
  'sev': 'Sevilla',
  'bio': 'Bilbao',
  'vlc': 'Valencia',
  'bcn': 'Barcelona'
}
