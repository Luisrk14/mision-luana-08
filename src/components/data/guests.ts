export type GuestMode = "single" | "plural" | "family";

export interface GuestInfo {
  name: string;
  mode: GuestMode;
  gender?: "M" | "F";
}

export const guestsData: Record<string, GuestInfo> = {
  abraham: {
    name: "Abraham",
    mode: "single",
    gender: "M",
  },
  jimmy: {
    name: "Jimmy",
    mode: "single",
    gender: "M",
  },
  josue: {
    name: "Josué",
    mode: "single",
    gender: "M",
  },
  lea: {
    name: "Lea",
    mode: "single",
    gender: "F",
  },
  lesly: {
    name: "Lesly",
    mode: "single",
    gender: "F",
  },
};
