import EverestTrek1 from "@/public/TrekkingPackage/EverestTrek/EverestPackage1.png";
import Paragliding1 from "@/public/OtherActivities/Paragliding/paragliding1.avif";
import Paragliding2 from "@/public/OtherActivities/Paragliding/paragliding2.avif";
import Paragliding3 from "@/public/OtherActivities/Paragliding/paragliding3.avif";
import Paragliding4 from "@/public/OtherActivities/Paragliding/paragliding4.avif";
import Paragliding5 from "@/public/OtherActivities/Paragliding/paragliding5.avif";

import RockClimbing1 from "@/public/OtherActivities/RockClimbing/rock-climbing1.avif";
import RockClimbing2 from "@/public/OtherActivities/RockClimbing/rock-climbing2.avif";
import RockClimbing3 from "@/public/OtherActivities/RockClimbing/rock-climbing3.avif";
import RockClimbing4 from "@/public/OtherActivities/RockClimbing/rock-climbing4.avif";
import RockClimbing5 from "@/public/OtherActivities/RockClimbing/rock-climbing5.avif";

import MountainBiking1 from "@/public/OtherActivities/MountainBiking/mountain-biking1.avif";
import MountainBiking2 from "@/public/OtherActivities/MountainBiking/mountain-biking2.avif";
import MountainBiking3 from "@/public/OtherActivities/MountainBiking/mountain-biking3.avif";
import MountainBiking4 from "@/public/OtherActivities/MountainBiking/mountain-biking4.avif";
import MountainBiking5 from "@/public/OtherActivities/MountainBiking/mountain-biking5.avif";

import HeliTour1 from "@/public/OtherActivities/HeliTour/heli-tour1.webp";
import HeliTour2 from "@/public/OtherActivities/HeliTour/heli-tour2.webp";
import HeliTour3 from "@/public/OtherActivities/HeliTour/heli-tour3.avif";
import HeliTour4 from "@/public/OtherActivities/HeliTour/heli-tour4.webp";
import HeliTour5 from "@/public/OtherActivities/HeliTour/heli-tour5.webp";

import Rafting1 from "@/public/OtherActivities/Rafting/rafting1.avif";
import Rafting2 from "@/public/OtherActivities/Rafting/rafting2.avif";
import Rafting3 from "@/public/OtherActivities/Rafting/rafting3.avif";
import Rafting4 from "@/public/OtherActivities/Rafting/rafting4.avif";
import Rafting5 from "@/public/OtherActivities/Rafting/rafting5.avif";

const OtherActivitiesData = [
  {
    route: "rafting",
    id: 1,
    name: "Rafting",
    desc: "Dive into an exhilarating rafting adventure on Nepal's roaring rivers. Navigate through thrilling rapids and tranquil stretches, surrounded by stunning landscapes and lush greenery. This 14-day journey offers a perfect blend of adrenaline-pumping action and serene natural beauty, ideal for both seasoned rafters and beginners. Experience the excitement of white-water rafting, camp under the stars, and immerse yourself in the vibrant culture and breathtaking scenery of Nepal.",
    days: 14,
    HeroImg: Rafting3,
    package: [
      {
        packageImg: Rafting1,
        packageName: "Mt. Everest",
        packageDesc:
          "The climbing history of Mount Everest North started on the Northside, in Tibet....",
        packageDay: "58 Days",
      },
      {
        packageImg: Rafting2,
        packageName: "Mount Kanchenjunga",
        packageDesc:
          "A sacred quest and expedition for hidden treasures to the aptly named Mt. Kanchenjunga.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Rafting3,
        packageName: "Mount Lhotse",
        packageDesc:
          "Embark on an extraordinary journey with the Lhotse Mountain Expedition, an iconic quest to conquer one of the world's highest peaks...",
        packageDay: "60 Days",
      },
      {
        packageImg: Rafting4,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Rafting5,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
    ],
  },
  {
    route: "heli_tour",
    id: 1,
    name: "Heli Tour",
    desc: "Embark on an unforgettable helicopter adventure across Nepal's stunning landscapes. Soar high above the clouds for a bird's-eye view of the Himalayas, including the iconic Mount Everest. Our helicopter tours provide a luxurious and effortless way to explore remote regions, sacred sites, and picturesque valleys in just a few hours. Perfect for those who want to experience mountain beauty without the physical challenges of trekking.",
    days: 14,
    HeroImg: HeliTour3,
    package: [
      {
        packageImg: HeliTour1,
        packageName: "Mt. Everest",
        packageDesc:
          "The climbing history of Mount Everest North started on the Northside, in Tibet....",
        packageDay: "58 Days",
      },
      {
        packageImg: HeliTour2,
        packageName: "Mount Kanchenjunga",
        packageDesc:
          "A sacred quest and expedition for hidden treasures to the aptly named Mt. Kanchenjunga.....",
        packageDay: "55 Days",
      },
      {
        packageImg: HeliTour3,
        packageName: "Mount Lhotse",
        packageDesc:
          "Embark on an extraordinary journey with the Lhotse Mountain Expedition, an iconic quest to conquer one of the world's highest peaks...",
        packageDay: "60 Days",
      },
      {
        packageImg: HeliTour4,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
      {
        packageImg: HeliTour5,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
    ],
  },
  {
    route: "paragliding",
    id: 2,
    name: "Paragliding",
    desc: "Experience the thrill of paragliding over Nepal's breathtaking landscapes. Glide through the air and enjoy panoramic views of the Himalayas, lush valleys, and serene lakes. This adventure is perfect for adrenaline seekers and offers a unique perspective of Nepal's natural beauty.",
    days: 1,
    HeroImg: Paragliding2,
    package: [
      {
        packageImg: Paragliding1,
        packageName: "Mt. Everest",
        packageDesc:
          "The climbing history of Mount Everest North started on the Northside, in Tibet....",
        packageDay: "58 Days",
      },
      {
        packageImg: Paragliding2,
        packageName: "Mount Kanchenjunga",
        packageDesc:
          "A sacred quest and expedition for hidden treasures to the aptly named Mt. Kanchenjunga.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Paragliding3,
        packageName: "Mount Lhotse",
        packageDesc:
          "Embark on an extraordinary journey with the Lhotse Mountain Expedition, an iconic quest to conquer one of the world's highest peaks...",
        packageDay: "60 Days",
      },
      {
        packageImg: Paragliding4,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Paragliding5,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
    ],
  },
  {
    route: "mountain_biking",
    id: 4,
    name: "Mountain Biking",
    desc: "Explore Nepal's rugged terrain and picturesque landscapes on a mountain biking adventure. Ride through challenging trails, ancient villages, and lush forests while soaking in the natural beauty and rich culture of the region. This activity is perfect for both seasoned bikers and adventure enthusiasts.",
    days: 3,
    HeroImg: MountainBiking4,
    package: [
      {
        packageImg: MountainBiking1,
        packageName: "Mt. Everest",
        packageDesc:
          "The climbing history of Mount Everest North started on the Northside, in Tibet....",
        packageDay: "58 Days",
      },
      {
        packageImg: MountainBiking2,
        packageName: "Mount Kanchenjunga",
        packageDesc:
          "A sacred quest and expedition for hidden treasures to the aptly named Mt. Kanchenjunga.....",
        packageDay: "55 Days",
      },
      {
        packageImg: MountainBiking3,
        packageName: "Mount Lhotse",
        packageDesc:
          "Embark on an extraordinary journey with the Lhotse Mountain Expedition, an iconic quest to conquer one of the world's highest peaks...",
        packageDay: "60 Days",
      },
      {
        packageImg: MountainBiking4,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
      {
        packageImg: MountainBiking5,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
    ],
  },
  // {
  //   route: "rock_climbing",
  //   id: 5,
  //   name: "Rock Climbing",
  //   desc: "Test your strength and skills with rock climbing in Nepal. With its diverse climbing routes and stunning backdrops, Nepal offers a fantastic experience for climbers of all levels. From beginners to advanced climbers, you'll find routes that challenge and excite you.",
  //   days: 2,
  //   HeroImg: RockClimbing5,
  //   packageImg: [
  //     RockClimbing1,
  //     RockClimbing2,
  //     RockClimbing3,
  //     RockClimbing4,
  //     RockClimbing5,
  //   ],
  // },
  {
    route: "canyoning",
    id: 5,
    name: "Canyoning",
    desc: "Test your strength and skills with rock climbing in Nepal. With its diverse climbing routes and stunning backdrops, Nepal offers a fantastic experience for climbers of all levels. From beginners to advanced climbers, you'll find routes that challenge and excite you.",
    days: 2,
    HeroImg: RockClimbing5,
    package: [
      {
        packageImg: Rafting1,
        packageName: "Mt. Everest",
        packageDesc:
          "The climbing history of Mount Everest North started on the Northside, in Tibet....",
        packageDay: "58 Days",
      },
      {
        packageImg: Rafting2,
        packageName: "Mount Kanchenjunga",
        packageDesc:
          "A sacred quest and expedition for hidden treasures to the aptly named Mt. Kanchenjunga.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Rafting3,
        packageName: "Mount Lhotse",
        packageDesc:
          "Embark on an extraordinary journey with the Lhotse Mountain Expedition, an iconic quest to conquer one of the world's highest peaks...",
        packageDay: "60 Days",
      },
      {
        packageImg: Rafting4,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Rafting5,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
    ],
  },
  {
    route: "heritage_tour",
    id: 5,
    name: "Heritage Tour",
    desc: "Test your strength and skills with rock climbing in Nepal. With its diverse climbing routes and stunning backdrops, Nepal offers a fantastic experience for climbers of all levels. From beginners to advanced climbers, you'll find routes that challenge and excite you.",
    days: 2,
    HeroImg: RockClimbing5,
    package: [
      {
        packageImg: Rafting1,
        packageName: "Mt. Everest",
        packageDesc:
          "The climbing history of Mount Everest North started on the Northside, in Tibet....",
        packageDay: "58 Days",
      },
      {
        packageImg: Rafting2,
        packageName: "Mount Kanchenjunga",
        packageDesc:
          "A sacred quest and expedition for hidden treasures to the aptly named Mt. Kanchenjunga.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Rafting3,
        packageName: "Mount Lhotse",
        packageDesc:
          "Embark on an extraordinary journey with the Lhotse Mountain Expedition, an iconic quest to conquer one of the world's highest peaks...",
        packageDay: "60 Days",
      },
      {
        packageImg: Rafting4,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Rafting5,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
    ],
  },
  {
    route: "rock_climbing_trip",
    id: 5,
    name: "Rock Climbing Trip",
    desc: "Test your strength and skills with rock climbing in Nepal. With its diverse climbing routes and stunning backdrops, Nepal offers a fantastic experience for climbers of all levels. From beginners to advanced climbers, you'll find routes that challenge and excite you.",
    days: 2,
    HeroImg: RockClimbing5,
    package: [
      {
        packageImg: RockClimbing1,
        packageName: "Mt. Everest",
        packageDesc:
          "The climbing history of Mount Everest North started on the Northside, in Tibet....",
        packageDay: "58 Days",
      },
      {
        packageImg: RockClimbing2,
        packageName: "Mount Kanchenjunga",
        packageDesc:
          "A sacred quest and expedition for hidden treasures to the aptly named Mt. Kanchenjunga.....",
        packageDay: "55 Days",
      },
      {
        packageImg: RockClimbing3,
        packageName: "Mount Lhotse",
        packageDesc:
          "Embark on an extraordinary journey with the Lhotse Mountain Expedition, an iconic quest to conquer one of the world's highest peaks...",
        packageDay: "60 Days",
      },
      {
        packageImg: RockClimbing4,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
      {
        packageImg: RockClimbing5,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
    ],
  },
  {
    route: "pilgrimage_tour",
    id: 5,
    name: "Pilgrimage Tour",
    desc: "Test your strength and skills with rock climbing in Nepal. With its diverse climbing routes and stunning backdrops, Nepal offers a fantastic experience for climbers of all levels. From beginners to advanced climbers, you'll find routes that challenge and excite you.",
    days: 2,
    HeroImg: RockClimbing5,
    package: [
      {
        packageImg: Rafting1,
        packageName: "Mt. Everest",
        packageDesc:
          "The climbing history of Mount Everest North started on the Northside, in Tibet....",
        packageDay: "58 Days",
      },
      {
        packageImg: Rafting2,
        packageName: "Mount Kanchenjunga",
        packageDesc:
          "A sacred quest and expedition for hidden treasures to the aptly named Mt. Kanchenjunga.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Rafting3,
        packageName: "Mount Lhotse",
        packageDesc:
          "Embark on an extraordinary journey with the Lhotse Mountain Expedition, an iconic quest to conquer one of the world's highest peaks...",
        packageDay: "60 Days",
      },
      {
        packageImg: Rafting4,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Rafting5,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
    ],
  },
  {
    route: "ice_climbing",
    id: 5,
    name: "Ice Climbing",
    desc: "Test your strength and skills with rock climbing in Nepal. With its diverse climbing routes and stunning backdrops, Nepal offers a fantastic experience for climbers of all levels. From beginners to advanced climbers, you'll find routes that challenge and excite you.",
    days: 2,
    HeroImg: RockClimbing5,
    package: [
      {
        packageImg: Rafting1,
        packageName: "Mt. Everest",
        packageDesc:
          "The climbing history of Mount Everest North started on the Northside, in Tibet....",
        packageDay: "58 Days",
      },
      {
        packageImg: Rafting2,
        packageName: "Mount Kanchenjunga",
        packageDesc:
          "A sacred quest and expedition for hidden treasures to the aptly named Mt. Kanchenjunga.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Rafting3,
        packageName: "Mount Lhotse",
        packageDesc:
          "Embark on an extraordinary journey with the Lhotse Mountain Expedition, an iconic quest to conquer one of the world's highest peaks...",
        packageDay: "60 Days",
      },
      {
        packageImg: Rafting4,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
      {
        packageImg: Rafting5,
        packageName: "Mount Makalu",
        packageDesc:
          "The Makalu Expedition is a challenging and prestigious mountaineering endeavor that involves climbing Makalu.....",
        packageDay: "55 Days",
      },
    ],
  },
];

export default OtherActivitiesData;
