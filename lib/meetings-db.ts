import type { MeetingInput, SacramentMeeting } from "./types";
import { databaseConnection } from "./neon";

// const meetings: SacramentMeeting[] = [
//   {
//     id: 1,
//     date: "2026-11-01",
//     meetingType: "testimony",
//     presiding: "Bishop Daniel Smith",
//     conducting: "Brother Michael Jones",
//     announcements: ["Ward temple night: November 12", "Food drive donations due next Sunday"],
//     openingHymn: { number: 2, title: "The Spirit of God" },
//     openingPrayer: "Sister Emily Williams",
//     wardBusiness: [],
//     stakeBusiness: false,
//     sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
//     speakers: [],
//     closingHymn: { number: 31, title: "O God, Our Help in Ages Past" },
//     closingPrayer: "Brother David Davis",
//   },
//   {
//     id: 2,
//     date: "2026-10-25",
//     meetingType: "regular",
//     presiding: "Bishop Daniel Smith",
//     conducting: "Sister Rachel Green",
//     announcements: ["Primary activity: October 30 at 6:00 PM"],
//     openingHymn: { number: 85, title: "How Firm a Foundation" },
//     openingPrayer: "Brother David Davis",
//     wardBusiness: [{ description: "Sustaining of the new Primary president" }],
//     stakeBusiness: false,
//     sacramentHymn: { number: 181, title: "Jesus of Nazareth, Savior and King" },
//     speakers: [
//       { name: "Sister Anna Brown", topic: "Faith in Jesus Christ", type: "speaker" },
//       { name: "Youth Choir", topic: "I Am a Child of God", type: "musical-number" },
//     ],
//     closingHymn: { number: 227, title: "There Is Sunshine in My Soul Today" },
//     closingPrayer: "Sister Emily Williams",
//   },
//   {
//     id: 3,
//     date: "2026-10-18",
//     meetingType: "regular",
//     presiding: "President John Lee",
//     conducting: "Brother Michael Jones",
//     announcements: ["Missionary preparation class begins Wednesday"],
//     openingHymn: { number: 3, title: "Now We Sing Our Praise" },
//     openingPrayer: "Sister Rachel Green",
//     wardBusiness: [],
//     stakeBusiness: true,
//     sacramentHymn: { number: 190, title: "In Memory of the Crucified" },
//     speakers: [
//       { name: "Elder Mark Wilson", topic: "Serving with Love", type: "speaker" },
//       { name: "Sister Julia White", topic: "Covenants", type: "speaker" },
//     ],
//     closingHymn: { number: 30, title: "Come, Come, Ye Saints" },
//     closingPrayer: "Brother Michael Jones",
//   },
//   {
//     id: 4,
//     date: "2026-10-11",
//     meetingType: "stake",
//     presiding: "President John Lee",
//     conducting: "Sister Rachel Green",
//     announcements: ["Stake conference schedule available in the foyer"],
//     openingHymn: { number: 100, title: "Nearer, Dear Savior, to Thee" },
//     openingPrayer: "Brother David Davis",
//     wardBusiness: [],
//     stakeBusiness: true,
//     sacramentHymn: { number: 193, title: "I Stand All Amazed" },
//     speakers: [
//       { name: "President John Lee", topic: "Strengthening Families", type: "speaker" },
//     ],
//     closingHymn: { number: 270, title: "I'll Go Where You Want Me to Go" },
//     closingPrayer: "Sister Emily Williams",
//   },
//   {
//     id: 5,
//     date: "2026-10-04",
//     meetingType: "general",
//     presiding: "Bishop Daniel Smith",
//     conducting: "Brother Michael Jones",
//     announcements: ["General conference viewing begins at 10:00 AM"],
//     openingHymn: { number: 94, title: "Come, Ye Thankful People" },
//     openingPrayer: "Sister Anna Brown",
//     wardBusiness: [],
//     stakeBusiness: false,
//     sacramentHymn: { number: 172, title: "In Humility, Our Savior" },
//     speakers: [
//       { name: "Ward Choir", topic: "How Great Thou Art", type: "musical-number" },
//       { name: "Bishop Daniel Smith", topic: "Remembering Christ", type: "speaker" },
//     ],
//     closingHymn: { number: 219, title: "Because I Have Been Given Much" },
//     closingPrayer: "Brother David Davis",
//   },
// ];

const PAGE_SIZE = 6;

function isDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export async function getMeetings(query = "", page = 1): Promise<SacramentMeeting[]> {
  if (query && isDate(query)) {
    const meetings = await databaseConnection`SELECT
          id,
          date::text AS date,
          meeting_type AS "meetingType",
          presiding,
          conducting,
          announcements,
          opening_hymn AS "openingHymn",
          opening_prayer AS "openingPrayer",
          ward_business AS "wardBusiness",
          stake_business AS "stakeBusiness",
          sacrament_hymn AS "sacramentHymn",
          speakers,
          closing_hymn AS "closingHymn",
          closing_prayer AS "closingPrayer"
        FROM meetings
        WHERE date = ${query}::date
        ORDER BY date DESC`;

    return meetings as unknown as SacramentMeeting[];
  }

  const search = query ? `%${query}%` : null;
  const offset = Math.max(0, page - 1) * PAGE_SIZE;
  const meetings = search
    ? await databaseConnection`SELECT
          id,
          date::text AS date,
          meeting_type AS "meetingType",
          presiding,
          conducting,
          announcements,
          opening_hymn AS "openingHymn",
          opening_prayer AS "openingPrayer",
          ward_business AS "wardBusiness",
          stake_business AS "stakeBusiness",
          sacrament_hymn AS "sacramentHymn",
          speakers,
          closing_hymn AS "closingHymn",
          closing_prayer AS "closingPrayer"
        FROM meetings
        WHERE presiding ILIKE ${search}
          OR conducting ILIKE ${search}
          OR meeting_type ILIKE ${search}
          OR speakers::text ILIKE ${search}
        ORDER BY date DESC
        LIMIT ${PAGE_SIZE}
        OFFSET ${offset}`
    : await databaseConnection`SELECT
          id,
          date::text AS date,
          meeting_type AS "meetingType",
          presiding,
          conducting,
          announcements,
          opening_hymn AS "openingHymn",
          opening_prayer AS "openingPrayer",
          ward_business AS "wardBusiness",
          stake_business AS "stakeBusiness",
          sacrament_hymn AS "sacramentHymn",
          speakers,
          closing_hymn AS "closingHymn",
          closing_prayer AS "closingPrayer"
        FROM meetings
        ORDER BY date DESC
        LIMIT ${PAGE_SIZE}
        OFFSET ${offset}`;

  return meetings as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(query = ""): Promise<number> {
  const search = query ? `%${query}%` : null;
  const result = search
    ? await databaseConnection`SELECT COUNT(*)::int AS count
        FROM meetings
        WHERE presiding ILIKE ${search}
          OR conducting ILIKE ${search}
          OR meeting_type ILIKE ${search}
          OR speakers::text ILIKE ${search}`
    : await databaseConnection`SELECT COUNT(*)::int AS count FROM meetings`;

  const totalMeetings = Number(result[0]?.count ?? 0);
  return Math.max(1, Math.ceil(totalMeetings / PAGE_SIZE));
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const meetings = await databaseConnection`
    SELECT
      id,
      date::text AS date,
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  return (meetings[0] as unknown as SacramentMeeting) ?? null;
}

export async function addMeeting(meeting: MeetingInput) {
  await databaseConnection`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements,
      opening_hymn, opening_prayer, stake_business, sacrament_hymn,
      closing_hymn, closing_prayer
    )
    VALUES (
      ${meeting.date}, ${meeting.meetingType}, ${meeting.presiding}, ${meeting.conducting}, ${meeting.announcements},
      ${JSON.stringify(meeting.openingHymn)}::jsonb, ${meeting.openingPrayer}, ${meeting.stakeBusiness},
      ${JSON.stringify(meeting.sacramentHymn)}::jsonb, ${JSON.stringify(meeting.closingHymn)}::jsonb, ${meeting.closingPrayer}
    )
  `;
}

export async function updateMeeting(id: number, meeting: MeetingInput) {
  await databaseConnection`
    UPDATE meetings SET
      date = ${meeting.date},
      meeting_type = ${meeting.meetingType},
      presiding = ${meeting.presiding},
      conducting = ${meeting.conducting},
      announcements = ${meeting.announcements},
      opening_hymn = ${JSON.stringify(meeting.openingHymn)}::jsonb,
      opening_prayer = ${meeting.openingPrayer},
      stake_business = ${meeting.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
      closing_hymn = ${JSON.stringify(meeting.closingHymn)}::jsonb,
      closing_prayer = ${meeting.closingPrayer}
    WHERE id = ${id}
  `;
}

export async function deleteMeeting(id: number) {
  await databaseConnection`DELETE FROM meetings WHERE id = ${id}`;
}
