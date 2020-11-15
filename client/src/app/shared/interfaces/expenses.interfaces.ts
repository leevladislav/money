export interface Expense {
  expense: number;
  date: string;
  category: string;
  wallet: string;
  description?: string | null;
  _id?: string;
}
