export const UserClassification = {
  SELLER: "SELLER",
  BUYER: "BUYER",
} as const;

export type UserClassificationType =
  (typeof UserClassification)[keyof typeof UserClassification];
