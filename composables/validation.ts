// Validation and Media Rules Mixin
export const useValidation = () => {
  const { t: $t } = useI18n();
  const validationRules = {
    required: (v: string): boolean | string =>
      !!v || $t("form_validation.required"),
    requiredArray: (v: string): boolean | string =>
      v.length > 0 || "لطفا فیلد مورد نظر را تکمیل کنید",
    select: (v: string): boolean | string =>
      !!v || $t("form_validation.select"),
    selectObj: (v: string): boolean | string =>
      Boolean(Object.keys(v || {})[0]) || $t("form_validation.select"),
    username: (v: string): boolean | string => {
      const pattern = /^[a-zA-Z0-9._]+$/;
      return pattern.test(v) || $t("form_validation.invalid_username");
    },
    password: (v: string): boolean | string => {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&*])/;
      return pattern.test(v) || $t("form_validation.pass_easy");
    },
    email: (v: string): boolean | string => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(v) || $t("form_validation.invalid_email");
    },
    phone: (v: string): boolean | string => {
      const pattern = /^\d{10}$/;
      const pattern2 = /^\d{9}$/;
      return (
        (pattern.test(v) && v[0] !== "0") ||
        (pattern2.test(v) && v[0] !== "0") ||
        $t("form_validation.invalid_mobile")
      );
    },
    numeric: (v: string): boolean | string => {
      if (!v.trim()) return true;
      if (!isNaN(parseFloat(v))) return true;
      return $t("form_validation.only_number");
    },
    min: (v: string): boolean | string => {
      return v.length >= 8 || $t("form_validation.must_8_chars");
    },
    min3: (v: string): boolean | string => {
      return v.length >= 3 || $t("form_validation.min3");
    },
    min5: (v: string): boolean | string => {
      return v.length >= 5 || $t("form_validation.min5");
    },
    min8: (v: string): boolean | string => {
      return v.length >= 8 || $t("form_validation.must_8_chars");
    },
    max30: (v: string): boolean | string => {
      return v.length <= 30 || $t("form_validation.max30");
    },
    max90: (v: string): boolean | string => {
      return (v && v.length <= 90) || $t("form_validation.max90");
    },
    Nmin20: (v: string): boolean | string => {
      return parseInt(v) >= 20 || $t("form_validation.min20");
    },
    Nmin1: (v: string): boolean | string => {
      return parseInt(v) >= 1 || $t("form_validation.min1");
    },
    minMax: (v: string): boolean | string => {
      return parseInt(v) >= parseInt("1") || $t("form_validation.minMax");
    },
  };

  // Media Rules
  const mediaRules = {
    max2m: (value: File): boolean | string => {
      return !value || value.size < 2000000 || $t("form_validation.max2m");
    },
    required: (value: File[]): boolean | string => {
      return value.length > 0 || $t("form_validation.max2m");
    },
    justTif: (value: File[]): boolean | string => {
      const file = value[0];
      return (
        (file && file.type == "image/tiff") || $t("form_validation.just_tif")
      );
    },
  };
  return { validationRules, mediaRules };
};
