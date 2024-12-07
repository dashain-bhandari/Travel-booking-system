import Team1 from "@/public/Team/team1.avif";
import Team2 from "@/public/Team/team2.avif";
import Team3 from "@/public/Team/team3.avif";
import Team4 from "@/public/Team/team4.avif";

// Porter category
import Guider from "@/public/Team/poter-men.png";
import Yak from "@/public/Team/yak.avif";
import Mule from "@/public/Team/mule.avif";

import Cook1 from "@/public/Team/cook1.png";
import Cook2 from "@/public/Team/cook2.png";

import ExpGuide1 from "@/public/Team/expedition-guide1.png";
import ExpGuide2 from "@/public/Team/expedition-guide2.png";
import ExpGuide3 from "@/public/Team/expedition-guide3.png";

import TrekGuide1 from "@/public/Team/trek-guide1.png";
import TrekGuide2 from "@/public/Team/trek-guide2.png";

const teamMembers = [
  {
    id: 1,
    name: "Nima Sherpa",
    role: "Managing Director",
    category: "BOD",
    img: Team1,
    desc: "Nima oversees all operations, ensuring our expeditions and treks are safe, enjoyable, and memorable for all participants.",
  },
  {
    id: 2,
    name: "Pemba Tamang",
    role: "Trekking Expert",
    category: "BOD",
    img: Team2,
    desc: "Pemba curates unique trekking routes and experiences, drawing on extensive knowledge of the Himalayas and local culture.",
  },
  {
    id: 3,
    name: "Karma Gurung",
    role: "Destination Specialist",
    category: "BOD",
    img: Team3,
    desc: "Karma crafts detailed guides for trekkers, highlighting the rich cultural and natural beauty of Nepal's diverse regions.",
  },
  {
    id: 4,
    name: "Dawa Lama",
    role: "Marketing Strategist",
    category: "BOD",
    img: Team4,
    desc: "Dawa develops strategies to showcase our trekking and expedition services, reaching out to adventure seekers worldwide.",
  },
  {
    id: 5,
    name: "Pasang Sherpa",
    role: "Expedition Guide",
    category: "Expedition guide",
    img: ExpGuide3,
    desc: "Pasang leads high-altitude expeditions, ensuring safety and guiding climbers to the summits of some of Nepal's tallest peaks.",
  },
  {
    id: 6,
    name: "Mingma Dorji",
    role: "Climbing Guide",
    category: "Expedition guide",
    img: ExpGuide1,
    desc: "Mingma provides expert guidance and training for climbers, with a focus on safety and technique on challenging terrains.",
  },
  {
    id: 7,
    name: "Tenzing Bhote",
    role: "Route Planner",
    category: "Expedition guide",
    img: ExpGuide2,
    desc: "Tenzing meticulously plans routes for expeditions, ensuring optimal paths for safe and successful climbs.",
  },
  {
    id: 8,
    name: "Lakpa Sherpa",
    role: "Trekking Guide",
    category: "Trekking guide",
    img: TrekGuide1,
    desc: "Lakpa leads trekking groups, sharing his deep knowledge of the Himalayas and ensuring a culturally rich experience.",
  },
  {
    id: 9,
    name: "Sonam Gyalzen",
    role: "Guest Relations Coordinator",
    category: "Trekking guide",
    img: TrekGuide2,
    desc: "Sonam ensures our guests' needs are met, providing support from initial inquiries to the end of their trekking journey.",
  },
  {
    id: 10,
    name: "Chhiring Sherpa",
    role: "Logistics Coordinator",
    category: "Porter guide",
    img: Guider,
    desc: "Chhiring manages logistics for expeditions, coordinating porters and supplies to ensure seamless operations.",
  },
  {
    id: 11,
    name: "Yak",
    role: "",
    category: "Porter guide",
    img: Yak,
    desc: "Dorje oversees the transport of goods and equipment using yaks, ensuring everything reaches its destination efficiently.",
  },
  {
    id: 12,
    name: "Mule",
    role: "",
    category: "Porter guide",
    img: Mule,
    desc: "Pema coordinates daily operations, ensuring all aspects of the trekking and expedition services run smoothly.",
  },
  {
    id: 13,
    name: "Rinchen Thapa",
    role: "Expedition Cook",
    category: "Cook",
    img: Cook1,
    desc: "Rinchen prepares nutritious meals for expedition teams, ensuring climbers have the energy needed for their journeys.",
  },
  {
    id: 14,
    name: "Lhakpa Dolma",
    role: "Trekking Cook",
    category: "Cook",
    img: Cook2,
    desc: "Lhakpa provides delicious and hearty meals on trekking routes, catering to the diverse tastes and dietary needs of our guests.",
  },
];

export default teamMembers;
