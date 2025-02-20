import ImageEnhancementIcon from "~icons/carbon/edge-enhancement";
import AdaptiveImageIcon from "~icons/mdi/tune";
import EqualizeImageIcon from "~icons/material-symbols/equalizer";
import FloatImageIcon from "~icons/ion/swap-horizontal";
import GammaImageIcon from "~icons/tabler/sun";
import LogAdjustIcon from "~icons/mdi/adjust";
import OrginalImageIcon from "~icons/fa6-solid/image";
import SigmodidImageIcon from "~icons/mdi/sine-wave";
import RGBAdaptiveImageIcon from "~icons/mdi/gradient-horizontal";
import RGBEqualizeImageIcon from "~icons/mdi/palette-outline";
import RGBGammaImageIcon from "~icons/mdi/contrast-box";
import RGBImageIcon from "~icons/mdi/image-outline";
import PCAIcon from "~icons/material-symbols/analytics-outline";
import BandIcon from "~icons/material-symbols/document-scanner-outline-rounded";
import BeforeAfterIcon from "~icons/material-symbols/two-pager-rounded";
import TifIcon from "~icons/material-symbols/imagesmode-outline";
import SpectralIndicesIcon from "~icons/mdi/chart-line";
import AFVIIcon from "~icons/fa6-solid/leaf";
import BIIcon from "~icons/ic/round-wb-sunny";
import NDVIIcon from "~icons/mdi/nature-people-outline";
import NDWIIcon from "~icons/ion/water-outline";
import SAVIIcon from "~icons/mdi/terrain";
import UIIcon from "~icons/tabler/building-skyscraper";
import SpectralProfileIcon from "~icons/mdi/chart-multiline";
import HSVIcon from "~icons/carbon/color-palette";
import IRHSVIcon from "~icons/mdi/flare";
import HUEIcon from "~icons/mdi/palette";
import IRHUEIcon from "~icons/mdi/palette-outline";
import SATURATIONIcon from "~icons/mdi/adjust";
import VALUEIcon from "~icons/mdi/brightness-6";
import VALUEIRIcon from "~icons/mdi/radiator";
import ClusterIcon from "~icons/material-symbols/scatter-plot";
import FiltersIcon from "~icons/mdi/filter";
import GuassianIcon from "~icons/mdi/blur";
import LaplacianIcon from "~icons/tabler/hexagon";
import MedianIcon from "~icons/mdi/format-line-weight";
import SobelIcon from "~icons/mdi/vector-line";

import type { ActionList, OperationMode } from "~/types/tools/tools";

// todo odd input and tif mode

const actions: ActionList = {
  bands: [
    {
      title: "SPECTRAL INDICES",
      type: "spectral_indices",
      icon: SpectralIndicesIcon,
      requiredBands: ["RED", "GREEN", "NIR", "SWIR1", "SWIR2"],
      childrens: [
        {
          title: "AFVI",
          type: "afvi",
          icon: AFVIIcon,
          requiredBands: ["SWIR1", "NIR"],
        },
        {
          title: "BI",
          type: "bi",
          icon: BIIcon,
          requiredBands: ["NIR", "GREEN", "RED"],
        },
        {
          title: "NDVI",
          type: "ndvi",
          icon: NDVIIcon,
          requiredBands: ["RED", "NIR"],
        },
        {
          title: "NDWI",
          type: "ndwi",
          icon: NDWIIcon,
          requiredBands: ["NIR", "GREEN"],
        },
        {
          title: "SAVI",
          type: "savi",
          icon: SAVIIcon,
          requiredBands: ["RED", "NIR"],
        },
        {
          title: "UI",
          type: "ui",
          icon: UIIcon,
          requiredBands: ["SWIR2", "NIR"],
        },
      ],
    },
    {
      title: "SPECTRAL PROFILE",
      type: "spectral_profile",
      icon: SpectralProfileIcon,
      requiredBands: ["RED", "GREEN", "BLUE", "NIR", "SWIR1", "SWIR2"],
    },
    {
      title: "HSV",
      type: "hsv",
      icon: HSVIcon,
      requiredBands: ["RED", "GREEN", "BLUE", "NIR", "SWIR1", "SWIR2"],
      childrens: [
        {
          title: "HSV",
          type: "hsv",
          icon: HSVIcon,
          requiredBands: ["GREEN", "BLUE", "NIR"],
        },
        {
          title: "IRHSV",
          type: "irhsv",
          icon: IRHSVIcon,
          requiredBands: ["RED", "SWIR1", "SWIR2"],
        },
        {
          title: "HUE",
          type: "hue",
          icon: HUEIcon,
          requiredBands: ["GREEN", "BLUE", "NIR"],
        },
        {
          title: "IRHUE",
          type: "irhue",
          icon: IRHUEIcon,
          requiredBands: ["RED", "SWIR1", "SWIR2"],
        },
        {
          title: "SATURATION",
          type: "saturation",
          icon: SATURATIONIcon,
          requiredBands: ["GREEN", "BLUE", "NIR"],
        },
        {
          title: "VALUE",
          type: "valuehsv",
          icon: VALUEIcon,
          requiredBands: ["GREEN", "BLUE", "NIR"],
        },
        {
          title: "VALUEIR",
          type: "valueirhsv",
          icon: VALUEIRIcon,
          requiredBands: ["RED", "SWIR1", "SWIR2"],
        },
      ],
    },
    {
      title: "Cluster / \n K-means",
      type: "clustering",
      icon: ClusterIcon,
      requiredBands: ["NIR"],
      extra_param: {
        n_clusters: {
          title: "N clusters",
          type: "Number",
          required: true,
          value: "",
          typeHint: "positive number greater than or equal to 1",
        },
        random_state: {
          title: "Random state",
          type: "Number",
          required: false,
          value: "",
          typeHint: "positive number and 0, also could be None (null)",
        },
      },
    },
    {
      title: "Image Enhancement",
      type: "image_enhancement",
      icon: ImageEnhancementIcon,
      requiredBands: [],
      childrens: [
        {
          title: "Adaptive Image",
          type: "adaptive_image",
          icon: AdaptiveImageIcon,
          requiredBands: ["NIR"],
          extra_param: {
            clip_limit: {
              title: "Clip Limit",
              type: "Float",
              required: true,
              value: "",
              typeHint: "Float number, which should be between 0.0 and 1.0)",
            },
          },
        },
        {
          title: "Equalize Image",
          type: "equalize_image",
          icon: EqualizeImageIcon,
          requiredBands: ["NIR"],
          extra_param: {
            clip_limit: {
              title: "Clip Limit",
              type: "Float",
              required: true,
              value: "",
              typeHint: "Float number, which should be between 0.0 and 1.0)",
            },
          },
        },
        {
          title: "Float Image",
          type: "float_image",
          icon: FloatImageIcon,
          requiredBands: ["NIR"],
          extra_param: {},
        },
        {
          title: "Gamma Image",
          type: "gamma_image",
          icon: GammaImageIcon,
          requiredBands: ["NIR"],
          extra_param: {
            gamma: {
              title: "Gamma",
              type: "Float",
              required: true,
              value: "",
              typeHint: "Float number, which should be between 0.0 and 1.0)",
            },
            gain: {
              title: "Gain",
              type: "Float",
              required: true,
              value: "",
              typeHint: "Float number, which should be between 0.0 and 1.0)",
            },
          },
        },
        {
          title: "Log Adjust",
          type: "log_adjust",
          icon: LogAdjustIcon,
          requiredBands: ["NIR"],
          extra_param: {
            gain: {
              title: "Gain",
              type: "Number",
              required: true,
              value: "",
              typeHint: "Between 0.0 and 1.0",
            },
            inv: {
              title: "Inverse",
              type: "Boolean",
              required: true,
              value: false,
              typeHint: "true or false",
            },
          },
        },
        {
          title: "Orginal Image",
          type: "orginal_image",
          icon: OrginalImageIcon,
          requiredBands: ["NIR"],
          extra_param: {},
        },
        {
          title: "Sigmodid Image",
          type: "sigmodid",
          icon: SigmodidImageIcon,
          requiredBands: ["NIR"],
          extra_param: {
            gain: {
              title: "Gain",
              type: "Number",
              required: true,
              value: "",
              typeHint: "Between 0.0 and 1.0",
            },
            inv: {
              title: "Inverse",
              type: "Boolean",
              required: true,
              value: false,
              typeHint: "true or false",
            },
            cutoff: {
              title: "Cutoff",
              type: "Float",
              required: true,
              value: "",
              typeHint: "Between 0.0 and 1.0",
            },
          },
        },
        {
          title: "RGB Adaptive Image",
          type: "rgb_adaptive_image",
          icon: RGBAdaptiveImageIcon,
          requiredBands: ["RED", "GREEN", "BLUE"],
          extra_param: {},
        },
        {
          title: "RGB Equalize Image",
          type: "rgb_equalize_image",
          icon: RGBEqualizeImageIcon,
          requiredBands: ["RED", "GREEN", "BLUE"],
          extra_param: {},
        },
        {
          title: "RGB Gamma Image",
          type: "rgb_gamma_image",
          icon: RGBGammaImageIcon,
          requiredBands: ["RED", "GREEN", "BLUE"],
          extra_param: {},
        },
        {
          title: "RGB Image",
          type: "rgb_image",
          icon: RGBImageIcon,
          requiredBands: ["RED", "GREEN", "BLUE"],
          extra_param: {},
        },
      ],
    },
    {
      title: "PCA",
      type: "pca",
      icon: PCAIcon,
      requiredBands: ["RED", "GREEN", "BLUE", "NIR", "SWIR1", "SWIR2"],
      extra_param: {},
    },
  ],
  before_after: [],
  tif: [
    {
      title: "Filters",
      type: "filters",
      icon: FiltersIcon,
      requiredBands: [],
      childrens: [
        {
          title: "Guassian",
          type: "guassion",
          icon: GuassianIcon,
          requiredBands: [],
        },
        {
          title: "Laplacian",
          type: "laplacian",
          icon: LaplacianIcon,
          requiredBands: [],
          extra_param: {
            kernel_size: {
              title: "Kernel size",
              type: "Number",
              required: true,
              value: "",
              typeHint: "Positive Odd Integer, also must be a positive (n > 0)",
            },
          },
        },
        {
          title: "Median",
          type: "median",
          icon: MedianIcon,
          requiredBands: [],
          extra_param: {
            kernel_size: {
              title: "Kernel size",
              type: "Number",
              required: true,
              value: "",
              typeHint: "Positive Odd Integer, also must be a positive (n > 0)",
            },
          },
        },
        {
          title: "Sobel",
          type: "sobel",
          icon: SobelIcon,
          requiredBands: [],
          extra_param: {
            kernel_size: {
              title: "Kernel size",
              type: "Number",
              required: true,
              value: "",
              typeHint: "Positive Odd Integer, also must be a positive (n > 0)",
            },
          },
        },
      ],
    },
  ],
};

const operationModes: OperationMode[] = [
  { title: "Bands", icon: BandIcon, value: "bands" },
  {
    title: "Before & after(bands)",
    icon: BeforeAfterIcon,
    value: "before_after",
  },
  { title: "Single file", icon: TifIcon, value: "tif" },
];

export { actions, operationModes };

/**
 const actions: ActionList = {
  bands: [
    {
      title: 'SPECTRAL INDICES',
      type: 'spectral_indices',
      icon: ImageEnhancementIcon,
      requiredBands: ['RED', 'GREEN', 'NIR', 'SWIR1', 'SWIR2'],
      childrens: [
        {
          title: 'AFVI',
          type: 'afvi',
          icon: ImageEnhancementIcon,
          requiredBands: ['SWIR1', 'NIR'],
        },
        {
          title: 'BI',
          type: 'bi',
          icon: ImageEnhancementIcon,
          requiredBands: ['NIR', 'GREEN', 'RED'],
        },
        {
          title: 'NDVI',
          type: 'ndvi',
          icon: ImageEnhancementIcon,
          requiredBands: ['RED', 'NIR'],
        },
        {
          title: 'NDWI',
          type: 'ndwi',
          icon: ImageEnhancementIcon,
          requiredBands: ['NIR', 'GREEN'],
        },
        {
          title: 'SAVI',
          type: 'savi',
          icon: ImageEnhancementIcon,
          requiredBands: ['RED', 'NIR'],
        },
        {
          title: 'UI',
          type: 'ui',
          icon: ImageEnhancementIcon,
          requiredBands: ['SWIR2', 'NIR'],
        },
        {
          title: 'NDVI',
          type: 'ndvi',
          icon: ImageEnhancementIcon,
          requiredBands: ['RED', 'NIR'],
        },
      ],
    },
    {
      title: 'SPECTRAL PROFILE',
      type: 'spectral_profile',
      icon: ImageEnhancementIcon,
      requiredBands: ['RED', 'GREEN', 'BLUE', 'NIR', 'SWIR1', 'SWIR2'],
    },
    {
      title: 'Cluster / \n K-means',
      type: 'clustering',
      icon: ImageEnhancementIcon,
      requiredBands: ['NIR'],
      extra_param: {
        n_clusters: {
          title: 'N clusters',
          type: 'Number',
          required: true,
          value: '',
          typeHint: 'positive number greater than or equal to 1',
        },
        random_state: {
          title: 'Random state',
          type: 'Number',
          required: false,
          value: '',
          typeHint: 'positive number and 0, also could be None (null)',
        },
      },
    },
  ],
  'before-after': [],
  tif: [
    {
      title: 'Filters',
      type: 'filters',
      icon: ImageEnhancementIcon,
      requiredBands: [],
      childrens: [
        {
          title: 'Guassian',
          type: 'guassion',
          icon: ImageEnhancementIcon,
          requiredBands: [],
        },
        {
          title: 'Laplacian',
          type: 'laplacian',
          icon: ImageEnhancementIcon,
          requiredBands: [],
          extra_param: {
            kernel_size: {
              title: 'Kernel size',
              type: 'Number',
              required: true,
              value: '',
              typeHint: 'Positive Odd Integer, also must be a positive (n > 0)',
            },
          },
        },
        {
          title: 'Median',
          type: 'median',
          icon: ImageEnhancementIcon,
          requiredBands: [],
          extra_param: {
            kernel_size: {
              title: 'Kernel size',
              type: 'Number',
              required: true,
              value: '',
              typeHint: 'Positive Odd Integer, also must be a positive (n > 0)',
            },
          },
        },
        {
          title: 'Sobel',
          type: 'sobel',
          icon: ImageEnhancementIcon,
          requiredBands: [],
          extra_param: {
            kernel_size: {
              title: 'Kernel size',
              type: 'Number',
              required: true,
              value: '',
              typeHint: 'Positive Odd Integer, also must be a positive (n > 0)',
            },
          },
        },
      ],
    },
  ],
};

 */
