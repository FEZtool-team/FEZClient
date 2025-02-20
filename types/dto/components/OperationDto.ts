interface OperationDataDto {
  bands: {
    red_band?: number | undefined;
    green_band?: number | undefined;
    blue_band?: number | undefined;
    nir_band?: number | undefined;
    swir1_band?: number | undefined;
    swir2_band?: number | undefined;
  };
  extra_params: Record<string, string | number | boolean | null>;
  tif_file: number | undefined;
}

export type { OperationDataDto };
