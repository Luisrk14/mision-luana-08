export type GuestMode = "single" | "plural" | "family";

export interface GuestInfo {
  name: string;
  mode: GuestMode;
  gender?: "M" | "F";
}

export const guestsData: Record<string, GuestInfo> = {
  sanchez: { name: "Sr. Sánchez y Esposa", mode: "plural" },
  familia_gomez: { name: "Familia Gómez Herrera", mode: "family" },
  raul_burnes: { name: "Sr. Raul Burnes y Familia", mode: "family" },
  himilce_burnes: { name: "Sra. Himilce Burnes y Familia", mode: "family" },
  jacqueline_luis: {
    name: "Srta. Jacqueline Luis Fuertes",
    mode: "single",
    gender: "F",
  },
  fiorela_bruno: {
    name: "Srta. Fiorela Bruno Bruno",
    mode: "single",
    gender: "F",
  },
  juan_aquije: { name: "Sr. Juan Aquije y Familia", mode: "family" },
  luis_aquije: { name: "Sr. Luis Aquije Ulco", mode: "single", gender: "M" },
  lea_solis: { name: "Srta. Lea Solis Montaña", mode: "single", gender: "F" },
  orlando_inga: {
    name: "Sr. Orlando Inga Quevedo",
    mode: "single",
    gender: "M",
  },
  faubricio_moreno: {
    name: "Sr. Fabricio Moreno Burnes",
    mode: "single",
    gender: "M",
  },
  lucas: {
    name: "Lucas",
    mode: "single",
    gender: "M",
  },
  lea: {
    name: "Lea",
    mode: "single",
    gender: "F",
  },
};
