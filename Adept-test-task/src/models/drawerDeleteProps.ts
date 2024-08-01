import { Company } from "./company";

export interface DrawerDeleteProps {
  closeDeleteModal: () => void;
  companies: Company[];
}
