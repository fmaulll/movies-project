export const convertRupiah = (value: number) => {
  const rupiah = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  });

  return rupiah.format(value).slice(0, rupiah.format(value).length - 3);
};
