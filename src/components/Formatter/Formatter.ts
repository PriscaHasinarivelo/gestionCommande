export const formattageMontant = (montant: number) => {
    return new Intl.NumberFormat("fr-Fr").format(montant);
  };