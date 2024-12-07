import Trek1 from "@/public/TrekkingPackage/Trek1.png";
import Trek2 from "@/public/TrekkingPackage/Trek2.png";
import Trek3 from "@/public/TrekkingPackage/Trek3.png";

const TrekkingData = [
  {
    route: "everest_region",
    intro: "",
    img: Trek1,
    id: 1,
    name: "Everest Region",
    days: 14,
    distance: "130 km",
    package: [
      {
        packageImg: Trek1,
        packageName: "Everest Base Camp Trek",
        packageDesc: "",
        packageDay: "58 Days",
      },
      {
        packageImg: Trek2,
        packageName: "Everest Three Pass Trek",
        packageDesc: "",
        packageDay: "55 Days",
      },
      {
        packageImg: Trek3,
        packageName: "Amadablam Base Camp Trek",
        packageDesc: "",
        packageDay: "60 Days",
      },
    ],
  },
  {
    route: "annapurna_region",
    intro: "",
    img: Trek2,
    id: 2,
    name: "Annapurna Region",
    days: 14,
    distance: "130 km",
    package: [
      {
        packageImg: Trek1,
        packageName: "Everest Base Camp Trek",
        packageDesc: "",
        packageDay: "58 Days",
      },
      {
        packageImg: Trek2,
        packageName: "Everest Three Pass Trek",
        packageDesc: "",
        packageDay: "55 Days",
      },
    ],
  },
  {
    route: "langtang_region",
    intro: "",
    img: Trek3,
    id: 3,
    name: "Langtang Region",
    days: 10,
    distance: "100 km",
    package: [
      {
        packageImg: Trek1,
        packageName: "Everest Base Camp Trek",
        packageDesc: "",
        packageDay: "58 Days",
      },
      {
        packageImg: Trek2,
        packageName: "Everest Three Pass Trek",
        packageDesc: "",
        packageDay: "55 Days",
      },
    ],
  },
  {
    route: "manaslu_region",
    intro: "",
    img: Trek2,
    id: 4,
    name: "Manaslu Region",
    days: 18,
    distance: "160 km",
    package: [
      {
        packageImg: Trek2,
        packageName: "Everest Three Pass Trek",
        packageDesc: "",
        packageDay: "55 Days",
      },
    ],
  },
  {
    route: "other_treks_region",
    intro: "",
    img: Trek3,
    id: 5,
    name: "Other Treks Region",
    days: 12,
    distance: "110 km",
    package: [
      {
        packageImg: Trek1,
        packageName: "Everest Base Camp Trek",
        packageDesc: "",
        packageDay: "58 Days",
      },
      {
        packageImg: Trek2,
        packageName: "Everest Three Pass Trek",
        packageDesc: "",
        packageDay: "55 Days",
      },
    ],
  },
  {
    route: "off_beaten_treks",
    intro: "",
    img: Trek1,
    id: 6,
    name: "Off Beaten Treks",
    days: 20,
    distance: "180 km",
    package: [
      {
        packageImg: Trek1,
        packageName: "Everest Base Camp Trek",
        packageDesc: "",
        packageDay: "58 Days",
      },
      {
        packageImg: Trek2,
        packageName: "Everest Three Pass Trek",
        packageDesc: "",
        packageDay: "55 Days",
      },
    ],
  },
  {
    route: "short_trek",
    intro: "",
    img: Trek2,
    id: 7,
    name: "Short Trek",
    days: 7,
    distance: "70 km",
    package: [
      {
        packageImg: Trek1,
        packageName: "Everest Base Camp Trek",
        packageDesc: "",
        packageDay: "58 Days",
      },
      {
        packageImg: Trek2,
        packageName: "Everest Three Pass Trek",
        packageDesc: "",
        packageDay: "55 Days",
      },
    ],
  },
  {
    route: "high_passes_treks",
    intro: "",
    img: Trek3,
    id: 8,
    name: "High Passes Treks",
    days: 21,
    distance: "200 km",
    package: [
      {
        packageImg: Trek1,
        packageName: "Everest Base Camp Trek",
        packageDesc: "",
        packageDay: "58 Days",
      },
    ],
  },
];

export default TrekkingData;
