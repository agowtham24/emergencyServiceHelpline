import { atomWithStorage } from "jotai/utils";

export const serviceAtom = atomWithStorage("service", "");
export const SelectedserviceAtom = atomWithStorage<Service>("Selectedservice", {
  email: "",
  image: "",
  location: "",
  name: "",
  phone: "",
  serviceType: "",
  specialization: "",
  _id: "",
});

type Service = {
  email: string;
  image: string;
  location: string;
  name: string;
  phone: string;
  serviceType: string;
  specialization: string;
  _id: string;
};
