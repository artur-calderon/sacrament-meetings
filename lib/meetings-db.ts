import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-11-01",
    meetingType: "testimony",
    presiding: "Bishop Daniel Smith",
    conducting: "Brother Michael Jones",
    announcements: ["Ward temple night: November 12", "Food drive donations due next Sunday"],
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Sister Emily Williams",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [],
    closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
    closingPrayer: "Brother David Davis",
  },
  {
    id: 2,
    date: "2026-10-25",
    meetingType: "regular",
    presiding: "Bishop Daniel Smith",
    conducting: "Sister Rachel Green",
    announcements: ["Primary activity: October 30 at 6:00 PM"],
    openingHymn: { number: 85, title: "How Firm a Foundation" },
    openingPrayer: "Brother David Davis",
    wardBusiness: [{ description: "Sustaining of the new Primary president" }],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: "Jesus of Nazareth, Savior and King" },
    speakers: [
      { name: "Sister Anna Brown", topic: "Faith in Jesus Christ", type: "speaker" },
      { name: "Youth Choir", topic: "I Am a Child of God", type: "musical-number" },
    ],
    closingHymn: { number: 227, title: "There Is Sunshine in My Soul Today" },
    closingPrayer: "Sister Emily Williams",
  },
  {
    id: 3,
    date: "2026-10-18",
    meetingType: "regular",
    presiding: "President John Lee",
    conducting: "Brother Michael Jones",
    announcements: ["Missionary preparation class begins Wednesday"],
    openingHymn: { number: 3, title: "Now We Sing Our Praise" },
    openingPrayer: "Sister Rachel Green",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 190, title: "In Memory of the Crucified" },
    speakers: [
      { name: "Elder Mark Wilson", topic: "Serving with Love", type: "speaker" },
      { name: "Sister Julia White", topic: "Covenants", type: "speaker" },
    ],
    closingHymn: { number: 30, title: "Come, Come, Ye Saints" },
    closingPrayer: "Brother Michael Jones",
  },
  {
    id: 4,
    date: "2026-10-11",
    meetingType: "stake",
    presiding: "President John Lee",
    conducting: "Sister Rachel Green",
    announcements: ["Stake conference schedule available in the foyer"],
    openingHymn: { number: 100, title: "Nearer, Dear Savior, to Thee" },
    openingPrayer: "Brother David Davis",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 193, title: "I Stand All Amazed" },
    speakers: [
      { name: "President John Lee", topic: "Strengthening Families", type: "speaker" },
    ],
    closingHymn: { number: 270, title: "I'll Go Where You Want Me to Go" },
    closingPrayer: "Sister Emily Williams",
  },
  {
    id: 5,
    date: "2026-10-04",
    meetingType: "general",
    presiding: "Bishop Daniel Smith",
    conducting: "Brother Michael Jones",
    announcements: ["General conference viewing begins at 10:00 AM"],
    openingHymn: { number: 94, title: "Come, Ye Thankful People" },
    openingPrayer: "Sister Anna Brown",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: "In Humility, Our Savior" },
    speakers: [
      { name: "Ward Choir", topic: "How Great Thou Art", type: "musical-number" },
      { name: "Bishop Daniel Smith", topic: "Remembering Christ", type: "speaker" },
    ],
    closingHymn: { number: 219, title: "Because I Have Been Given Much" },
    closingPrayer: "Brother David Davis",
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter((meeting) => meeting.date === date);
  }

  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}
