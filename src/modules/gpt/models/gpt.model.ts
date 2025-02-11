// src/gpt/gpt.model.ts
export interface GptDataModel {
  products: any;
  location: any;
  confirm: any;
  completed: boolean;
}

export interface IGptMessage {
  role: string;
  content: string;
}

export type NameFuntions =
  | 'showMedicines'
  | 'saveOrder'
  | 'addMedicine'
  | 'updateMedicine'
  | 'showOrder'
  | 'deleteMedicine'
  | 'addUserInfo'
  | 'setDailyReminder'
  | 'quoteProducts';
