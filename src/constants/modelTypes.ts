
export enum conditionType {
  "!=" = "!=",
  "<" = "<",
  "<=" = "<=",
  "==" = "==",
  ">" = ">",
  ">=" = ">=",
  "array-contains" = "array-contains",
  "array-contains-any" = "array-contains-any",
  "in" = "in",
  "not-in" = "not-in",
}

export interface whereCondition {
  property: string;
  condition:
    | "!="
    | "<"
    | "<="
    | "=="
    | ">"
    | ">="
    | "array-contains"
    | "array-contains-any"
    | "in"
    | "not-in";
  value: string | number | boolean;
}
