// hooks/useSelectedCompanies.ts
import { useEffect, useState } from "react";
import { Company } from "../models/company";

export const useSelectedCompanies = (
  companies: Company[],
  selectAll: boolean,
  onSelectionChange: (count: number) => void,
  onClickToDelete: (companies: Company[]) => void
) => {
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);

  useEffect(() => {
    if (selectAll) {
      setSelectedCompanies(companies.map((company) => company.id));
    } else {
      setSelectedCompanies([]);
    }
  }, [selectAll, companies]);

  useEffect(() => {
    onSelectionChange(selectedCompanies.length);
    const selectedCompanyObjects = companies.filter((company) =>
      selectedCompanies.includes(company.id)
    );
    onClickToDelete(selectedCompanyObjects);
  }, [selectedCompanies]);

  const handleCheckboxChange = (id: number) => {
    setSelectedCompanies((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((companyId) => companyId !== id)
        : [...prevSelected, id]
    );
  };

  return { selectedCompanies, handleCheckboxChange };
};
