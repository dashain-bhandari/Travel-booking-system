import Exp1 from "@/public/ExpeditionPackage/Exp1.png";
import Exp2 from "@/public/ExpeditionPackage/Exp2.png";
import Exp3 from "@/public/ExpeditionPackage/Exp3.png";
import Package8000Img1 from "@/public/ExpeditionPackage/8000/8000Exp1.png";
import Package8000Img2 from "@/public/ExpeditionPackage/8000/8000Exp2.png";
import Package8000Img3 from "@/public/ExpeditionPackage/8000/8000Exp3.png";
import Package8000Img4 from "@/public/ExpeditionPackage/8000/8000Exp4.png";

import Package7000Img1 from "@/public/ExpeditionPackage/7000/7000Exp1.png";
import Package7000Img2 from "@/public/ExpeditionPackage/7000/7000Exp2.png";
import Package7000Img3 from "@/public/ExpeditionPackage/7000/7000Exp3.png";
import Package7000Img4 from "@/public/ExpeditionPackage/7000/7000Exp4.png";

import Package6000Img1 from "@/public/ExpeditionPackage/6000/6000Exp1.png";
import Package6000Img2 from "@/public/ExpeditionPackage/6000/6000Exp2.png";
import Package6000Img3 from "@/public/ExpeditionPackage/6000/6000Exp3.png";
import Package6000Img4 from "@/public/ExpeditionPackage/6000/6000Exp4.png";

import Package5000Img1 from "@/public/ExpeditionPackage/5000/5000Exp1.png";
import Package5000Img2 from "@/public/ExpeditionPackage/5000/5000Exp2.png";

const ExpeditionData = [
  {
    route: "8000m",
    intro: "Explore the pinnacle of adventure with our expeditions to the world's highest 8000-meter peaks. These majestic summits, including Mount Everest, Kanchenjunga, Lhotse, and Makalu, offer a monumental challenge and awe-inspiring beauty, demanding elite mountaineering skills and careful planning.",
    id: 1,
    name: "8000m",
    desc: "Experience the breathtaking Manaslu expedition and challenging climbs.",
    days: 14,
    distance: "130 km",
    img: Exp1,
    package: [
      {
        packageImg: Package8000Img1,
        packageName: "Mt. Everest",
        packageDesc: "The climbing history of Mount Everest North started on the Northside, in Tibet....",
        packageDay: "58 Days",
      },
      {
        packageImg: Package8000Img2,
        packageName: "Mount Kanchenjunga",
        packageDesc: "A sacred quest and expedition for hidden treasures to the aptly named Mt. Kanchenjunga.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Package8000Img3,
        packageName: "Mount Lhotse",
        packageDesc: "Embark on an extraordinary journey with the Lhotse Mountain Expedition, an iconic quest to conquer one of the world's highest peaks...",
        packageDay: "60 Days",
      },
      {
        packageImg: Package8000Img4,
        packageName: "Mount Makalu",
        packageDesc: "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
    ],
  },
  {
    route: "7000m",
    intro: "Conquer the majestic 7000-meter peaks and experience unparalleled alpine challenges. Peaks like Ama Dablam, Baruntse, and Pumori offer climbers the thrill of technical ascents, breathtaking scenery, and a perfect blend of adventure and challenge.",
    id: 2,
    name: "7000m",
    desc: "Conquer Island Peak for unreal Himalayan views and an unforgettable adventure.",
    days: 21,
    distance: "230 km",
    img: Exp2,
    package: [
      {
        packageImg: Package7000Img1,
        packageName: "Mount Pumori",
        packageDesc: "The Pumori Expedition is a challenging and renowned mountaineering venture that takes place....",
        packageDay: "34 Days",
      },
      {
        packageImg: Package7000Img2,
        packageName: "Mount Baruntse",
        packageDesc: "The Baruntse Expedition is a challenging mountaineering endeavor situated in the Khumbu region of Nepal....",
        packageDay: "55 Days",
      },
      {
        packageImg: Package7000Img3,
        packageName: "Tilicho Peak",
        packageDesc: "The Tilicho Peak Expedition is a challenging and exhilarating mountaineering endeavor located in the Annapurna region of Nepal....",
        packageDay: "35 Days",
      },
      {
        packageImg: Package7000Img4,
        packageName: "Mount Himlung",
        packageDesc: "The Himlung Himal Expedition is a challenging mountaineering endeavor located in Nepal's Manaslu region....",
        packageDay: "35 Days",
      },
    ],
  },
  {
    route: "6000m",
    intro: "Embark on thrilling adventures to the stunning 6000-meter peaks, perfect for aspiring mountaineers. Peaks like Island Peak (Imja Tse), Mera Peak, and Lobuche East offer accessible challenges and a gateway to the high-altitude Himalayas.",
    id: 3,
    name: "6000m",
    desc: "Summit Mt. Annapurna for stunning vistas and an epic adventure.",
    days: 16,
    distance: "160 km",
    img: Exp3,
    package: [
      {
        packageImg: Package6000Img1,
        packageName: "Mera Peak",
        packageDesc: "Mera Peak Climbing is a thrilling and challenging adventure that takes you to the pinnacle of one of Nepal's highest trekking peaks....",
        packageDay: "16 Days",
      },
      {
        packageImg: Package6000Img2,
        packageName: "Larke Peak",
        packageDesc: "The amazing 17 Days Larke Peak Climbing Journey introduces you to the remote trails which will carry you....",
        packageDay: "17 Days",
      },
      {
        packageImg: Package6000Img3,
        packageName: "Island Peak",
        packageDesc: "Island Peak climbing is a popular adventure activity in the Everest region of Nepal, offering...",
        packageDay: "15 Days",
      },
      {
        packageImg: Package6000Img4,
        packageName: "Cholatse Peak",
        packageDesc: "Cholatse Peak is one of the technical 6000ers in the middle of Khumbu and Gokyo Valley.",
        packageDay: "15 Days",
      },
    ],
  },
  {
    route: "5000m",
    intro: "Discover the beauty and excitement of 5000-meter peaks, ideal for high-altitude trekking and climbing. Peaks such as Gokyo Ri, Kala Patthar, and Thorong La provide accessible adventures with stunning views of the Himalayan giants.",
    id: 4,
    name: "5000m",
    desc: "Summit Mt. Annapurna for stunning vistas and an epic adventure.",
    days: 16,
    distance: "160 km",
    img: Exp3,
    package: [
      {
        packageImg: Package5000Img1,
        packageName: "Yala Peak",
        packageDesc: "Yala Peak Climbing, a beautiful trekking experience that leads all the way to the summit of Yala Peak (5550 m), is an easy mountaineering...",
        packageDay: "16 Days",
      },
      {
        packageImg: Package5000Img2,
        packageName: "Tserko Ri Trek",
        packageDesc: "Langtang Tserko Ri Trek is the nearest trial from Kathmandu. Langtang Tserko Ri Trek (4,984 meters) is an easy trekking trial...",
        packageDay: "17 Days",
      },
    ],
  },
];

export default ExpeditionData;
