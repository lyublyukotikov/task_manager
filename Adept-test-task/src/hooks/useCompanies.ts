import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchCompanies, updateCompany, deleteCompanies } from "../slices/companySlice";

export const useCompanies = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data: companies, status } = useSelector(
    (state: RootState) => state.companies
  );
  const [updateStatus, setUpdateStatus] = useState<"idle" | "loading" | "succeeded" | "failed">("idle");
  const [deleteStatus, setDeleteStatus] = useState<"idle" | "loading" | "succeeded" | "failed">("idle");

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleUpdateCompany = async (id: number, updatedData: { name: string; address: string }) => {
    setUpdateStatus("loading");
    try {
      await dispatch(updateCompany({ id, data: updatedData })).unwrap();
      setUpdateStatus("succeeded");
    } catch {
      setUpdateStatus("failed");
    }
  };

  const handleDeleteCompanies = async (ids: number[]) => {
    setDeleteStatus("loading");
    try {
      await dispatch(deleteCompanies(ids)).unwrap();
      setDeleteStatus("succeeded");
    } catch {
      setDeleteStatus("failed");
    }
  };

  return { companies, status, updateCompany: handleUpdateCompany, deleteCompanies: handleDeleteCompanies, updateStatus, deleteStatus };
};

