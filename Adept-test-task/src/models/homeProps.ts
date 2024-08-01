import { Company } from "./company";
export interface HomeProps {
  onSelectionChange: (count: number) => void;
  selectAll: boolean;
  onClickToDelete: (selectedCompanies: Company[]) => void;
}
