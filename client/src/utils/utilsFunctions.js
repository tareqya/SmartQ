import * as Crypto from "expo-crypto";

export const encrpt = async (text) => {
  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    text
  );
  return digest;
};

export const getDate = (time) => {
  const d = new Date(time);
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();
  return `${day} / ${month} / ${year}`;
};

export const getTime = (time) => {
  const d = new Date(time);
  const hours = d.getHours().toString().padStart(2, "0");
  const mins = d.getMinutes().toString().padStart(2, "0");
  return `${hours} : ${mins}`;
};
