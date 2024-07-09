import moment from "moment";
import { images } from "./images";

export const moreErr = [
  { id: 1, title: "Terms & Conditions", screen: "TermsAndCondition" },
  { id: 2, title: "Privacy Policy", screen: "PrivacyPolicy" },
  { id: 3, title: "FAQs", screen: "FAQ" },
  { id: 4, title: "About Us", screen: "AboutUs" },
  { id: 5, title: "Contact Us", screen: "ContactUs" },
];

export const recommendationOptions = [
  { id: 1, label: "Social Media", isChecked: false },
  { id: 2, label: "Recommended by someone", isChecked: false },
  { id: 3, label: "Internet Search", isChecked: false },
  { id: 4, label: "Book Store", isChecked: false },
  { id: 5, label: "Promotional Emails", isChecked: false },
];

export const configArr = [
  {
    id: 1,
    title: "Notification",
  },
  {
    id: 2,
    title: "Change Password",
  },
  {
    id: 3,
    title: "Delete Account",
  },
  {
    id: 4,
    title: "Log Out",
  },
];

export const sortByData = [
  {
    id: 1,
    title: "Rating: Highest First",
    sort_by: "rating",
    sort_value: "DESC",
  },
  {
    id: 2,
    title: "Rating: Lowest First",
    sort_by: "rating",
    sort_value: "ASC",
  },
  {
    id: 3,
    title: "Newest",
    sort_by: "createdAt",
    sort_value: "DESC",
  },
  {
    id: 4,
    title: "Oldest",
    sort_by: "createdAt",
    sort_value: "ASC",
  },
  {
    id: 5,
    title: "Z-A",
    sort_by: "full_name",
    sort_value: "DESC",
  },
  {
    id: 6,
    title: "A-Z",
    sort_by: "full_name",
    sort_value: "ASC",
  },
];
export const FilterData = [
  {
    id: 1,
    title: "All",
    search_type:"all"
  },
  {
    id: 2,
    title: "Goodreads",
    search_type:'goodreads'
  },
  {
    id: 3,
    title: "In App",
    search_type:'in_app'
  },
];

export const delArr = [
  "No Longer Interested in the app",
  "Privacy Concerns",
  "Limited Content or Selection",
  "Other",
];

export const reportArr = ["Harassment", "Bullying", "Spam", "Something else"];

export const demoBooksArr = {
  books: [
    {
      book_id: "75f61b76-e82b-465e-87a7-31ab87c5d482",
      thumbnail_image: "local/books_OL1845053W/author_cover_undefined.jpg",
      title: "Literacy Through the Book Arts",
    },
    {
      book_id: "dd1d878e-760d-4e14-894c-a08becd7ed6d",
      thumbnail_image: "local/books_OL18731408W/author_cover_undefined.jpg",
      title:
        "Creating Meaning through Literature and the Arts: Arts Integration for Classroom Teachers (4th Edition)",
    },
  ],
  name: "Rick Wright",
  profile_pic:
    "https://reanlo-dev.s3.us-east-2.amazonaws.com/https%3A//d5y4to5apuwjo.cloudfront.net/local/reanlo/user_%2831954827-7c97-46d1-a0e3-fb630a97ccb4%29/profile_pic_1717570968419340.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZQ3DS7XZNWYUOV4H%2F20240619%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20240619T094724Z&X-Amz-Expires=3600&X-Amz-Signature=7e129eee2fd3d255686b266b141b72c69f36767b539d1e57df494926166c0158&X-Amz-SignedHeaders=host",
};

export const reasonArr = [
  { title: "Feedback of Beta tester", value: "1" },
  { title: "Report issues", value: "2" },
  { title: "Become an author", value: "3" },
  { title: "Book Related", value: "4" },
  { title: "General query", value: "5" },
];

export const socialConnect = [
  {
    platform: "Instagram",
    icon: "instagram",
    connect: false,
    link: "https://www.instagram.com/",
  },
  {
    platform: "Tiktok",
    icon: "tiktok",
    connect: false,
    link: "https://www.tiktok.com/",
  },
  {
    platform: "Twitter",
    icon: "x-twitter",
    connect: false,
    link: "https://x.com/",
  },
  // {
  //   platform: "Tumblr",
  //   icon: "tumblr",
  //   connect: false,
  //   link: "https://www.tumblr.com/",
  // },
  {
    platform: "Youtube",
    icon: "youtube",
    connect: false,
    link: "https://www.youtube.com/",
  },
];

export const splashscreenData = [
  {
    id: 1,
    description:
      "There is some good in this world, and it’s worth fighting for.",
    subText: "— J.R.R. Tolkien, The Two Towers",
  },
  {
    id: 2,
    description: "It does not do to dwell on dreams and forget to live.",
    subText: "― J.K. Rowling, Harry Potter and the Sorcerer’s Stone ",
  },
  {
    id: 3,
    description:
      "Life, with its rules, its obligations, and its freedoms, is like a sonnet: You’re given the form, but you have to write the sonnet yourself.",
    subText: "— Madeleine L’Engle, A Wrinkle in Time",
  },
  {
    id: 4,
    description: "Whatever our souls are made of, his and mine are the same.",
    subText: "— Emily Brontë, Wuthering Heights",
  },
  {
    id: 5,
    description: "There are years that ask questions and years that answer.",
    subText: "— Zora Neale Hurston, Their Eyes Were Watching God",
  },
  {
    id: 6,
    description:
      "All happy families are alike; each unhappy family is unhappy in its own way.",
    subText: "— Leo Tolstoy, Anna Karenina",
  },
  {
    id: 7,
    description:
      "We are always more afraid than we wish to be, but we can always be braver than we expect.",
    subText: "Robert Jordan, Lord of Chaos (The Wheel of Time Book #6) ",
  },
  {
    id: 8,
    description: "And as we pretend to be brave, we become so",
    subText: "– Pierce Brown, Morning Star",
  },
  {
    id: 9,
    description:
      "Oh Father of the Gods, please judge this man on who he hoped to be, and not what the world made of him",
    subText: " – Nicholas Eames, Kings Of The Wyld (The Band, #1)",
  },
  {
    id: 10,
    description:
      "Sometimes a hypocrite is nothing more than a man in the process of changing” – Brandon Sanderson, Oathbringer",
    subText: "(The Stormlight Archive, #3) ",
  },
  {
    id: 11,
    description:
      "Can a man still be brave if he’s afraid?” “That is the only time a man can be brave",
    subText: "– George R.R. Martin, A Song of Ice and Fire",
  },
  {
    id: 12,
    description:
      "Coming back to where you started is not the same as never leaving",
    subText: "– Terry Pratchett, A Hat Full of Sky ",
  },
  {
    id: 13,
    description:
      "There is no struggle too vast, no odds too overwhelming, for even should we fail - should we fall - we will know that we have lived.",
    subText: "– Steven Erikson, Toll the Hounds",
  },
  {
    id: 14,
    description:
      "Tell him to turn away from death and choose life! Choose struggle and toil and pain and lovely, lovely life!",
    subText: "– Robin Hobb, Fool's Fate (The Tawny Man Trilogy, Book #3)",
  },
  {
    id: 15,
    description:
      "Take life as it comes. Run when you have to, fight when you must, rest when you can.",
    subText: "– Robert Jordan, The Eye of the World (Wheel of Time Book #1)",
  },
  {
    id: 16,
    description: "There are years that ask questions and years that answer.",
    subText: " – Ursula K. Le Guin, A Wizard of Earthsea",
  },
  {
    id: 17,
    description: "“Who wills, Can. Who tries, Does. Who loves, Lives",
    subText: "–  Anne McCaffrey, Dragonflight",
  },
  {
    id: 18,
    description:
      "If you must mount the gallows, give a jest to the crowd, a coin to the hangman, and make the drop with a smile on your lips",
    subText: "– Robert Jordan, The Fires of Heaven (Wheel of Time Book #5)",
  },
  {
    id: 19,
    description:
      "It's what you do with time that makes it matter. I'd rather spend a year making new memories than a thousand wandering around in the same old ones.",
    subText: "– Mark Lawrence, The Girl and the Stars",
  },
  {
    id: 20,
    description:
      "The trouble with running is wherever you run to, there you are.",
    subText: "– Joe Abercrombie, Red Country",
  },
  {
    id: 21,
    description:
      "You have nothing but me, I said. “And yet, you’d let me go? I have nothing but you, he murmured. So I am letting you go.",
    subText:
      " – Carissa Broadbent, The Ashes and the Star-Cursed King (Crowns of Nyaxia Book #2)",
  },
  {
    id: 22,
    description: "When fear arrives, something is about to happen.",
    subText: " – Leigh Bardugo, Crooked Kingdom (Six of Crows Book #2)",
  },
  {
    id: 23,
    description:
      "“I would come for you. And if I couldn’t walk, I’d crawl to you, and no matter how broken we were, we’d fight our way out together.",
    subText: "– Leigh Bardugo, Crooked Kingdom (Six of Crows Book #2) ",
  },
  {
    id: 24,
    description: "…but maybe being brave didn’t mean being unafraid.",
    subText: "– Leigh Bardugo, Crooked Kingdom (Six of Crows Book #2)",
  },
  {
    id: 25,
    description:
      "Noble dragons don't have friends. The nearest they can get to the idea is an enemy who is still alive.",
    subText: "― Terry Pratchett, Guards! Guards! ",
  },
  {
    id: 26,
    description:
      "Give a man a fire and he's warm for a day, but set fire to him and he's warm for the rest of his life.",
    subText: "― Terry Pratchett, Jingo",
  },
  {
    id: 27,
    description: "Egg, I dreamed that I was old.",
    subText: "– George R.R. Martin, A Song of Ice and Fire",
  },
  {
    id: 28,
    description: "Reader, I ran the fuck away.",
    subText: "– Naomi Novik, Deadly Education",
  },
  {
    id: 29,
    description: "Honor is dead. But I'll see what I can do.",
    subText:
      "– Brandon Sanderson, Words of Radiance (The Stormlight Archive, #2) ",
  },
  {
    id: 30,
    description:
      "What is the point of having free will if one cannot occasionally spit in the eye of destiny?",
    subText: "– Jim Butcher, White Night (The Dresden Files, #9)",
  },
  {
    id: 31,
    description: "The building was on fire, and it wasn't my fault.",
    subText: "– Jim Butcher, Blood Rites (The Dresden Files, #6)",
  },
  {
    id: 32,
    description:
      "Time is an unkind teacher, delivering lessons that we learn far too late for them to be useful. Years after I could have benefited from them, the insights come to me.",
    subText: "– Robin Hobb, Fool's Assassin",
  },
  {
    id: 33,
    description:
      "Heroism is a myth you tell idealistic young people—specifically when you want them to go bleed for you",
    subText: "– Brandon Sanderson, Rhythm of War (The Stormlight Archive, #4)",
  },
  {
    id: 34,
    description: "I am the one thing you can never kill. I am Hope.",
    subText: "– Brandon Sanderson, The Final Empire (Mistborn, #1) ",
  },
  {
    id: 35,
    description:
      "There is one rule, above all others, for being a man. Whatever comes, face it on your feet.",
    subText: "– Robert Jordan, The Great Hunt",
  },
  {
    id: 36,
    description: "Always speak politely to an enraged dragon.",
    subText: "– Steven Brust, Jhereg",
  },
  {
    id: 37,
    description:
      "No matter how subtle the wizard, a knife between the shoulder blades will seriously cramp his style.",
    subText: "–  Steven Brust, Vlad Taltos series",
  },
  {
    id: 38,
    description:
      "Almost dead yesterday, maybe dead tomorrow, but alive, gloriously alive, today.",
    subText: "― Robert Jordan | Lord of Chaos (The Wheel of Time book #6) ",
  },
  {
    id: 39,
    description:
      "Real magic can never be made by offering someone else's liver. You must tear out your own, and not expect to get it back.",
    subText: "― Peter S. Beagle, The Last Unicorn ",
  },
  {
    id: 40,
    description:
      "“I am the only storm that matters now, and there is no shelter from what I bring.",
    subText: "― Rebecca Roanhorse, Black Sun ",
  },
  {
    id: 41,
    description:
      "Judge them for what they wished to be,” he begged the Father of Gods, “not what the world made of them.",
    subText: "– Nicholas Eames, Kings of the Wyld (The Band, #1) ",
  },
  {
    id: 42,
    description:
      "Humans need fantasy to be human. To be the place where the falling angel meets the rising ape.",
    subText: " - Terry Pratchett, Hogfather",
  },
  {
    id: 43,
    description: "Women forgive but never forget. Men forget but never forgive",
    subText: "– Robert Jordan, The Dragon Reborn (The Wheel of Time book #3) ",
  },
  {
    id: 44,
    description:
      "Travel is the great leveler, the great teacher, bitter as medicine, crueler than mirror-glass. A long stretch of road will teach you more about yourself than a hundred years of quiet introspection.",
    subText: "– Patrick Rothfuss, The Wise Man’s Fear",
  },
  {
    id: 45,
    description: "By you, I am forever undone.",
    subText:
      "– Holly Black, The Queen of Nothing (The Folk of the Air Book #3)",
  },
  {
    id: 46,
    description:
      "You can fly from me, high as you choose into your darkness, but you will see me always beneath you, no matter how far away, with my face turned to you. My heart is in your heart.",
    subText: "– Patricia McKillip, The Forgotten Beasts of Eld ",
  },
  {
    id: 47,
    description:
      "And I'd choose you; in a hundred lifetimes, in a hundred worlds, in any version of reality, I'd find you and I'd choose you.",
    subText: "– Kiersten White, The Chaos of Stars",
  },
  {
    id: 48,
    description:
      "I will love you until the sun dies. And when it does, I will love you in the darkness.",
    subText: "– Pierce Brown, Iron Gold (Red Rising Saga #4)",
  },
  {
    id: 49,
    description:
      "“I am in the process of nailing Mr. Humphrey Griffin to the wall so thoroughly that future generations will mistake him for a tapestry.",
    subText: " – K.J. Charles, The Magpie Lord",
  },
  {
    id: 50,
    description:
      "I could recognize him by touch alone, by smell; I would know him blind, by the way his breaths came and his feet struck the earth. I would know him in death, at the end of the world.",
    subText: "– Madeline Miller, The Song of Achilles",
  },
  {
    id: 51,
    description:
      "Nothing like being wanted, is there? Wanted by someone you want. Always seems like magic, that something can feel so good but cost nothing.",
    subText: "– Joe Abercrombie, A Little Hatred ",
  },
  {
    id: 52,
    description:
      "She'd laughed, and if he could have bottled the sound and gotten drunk on it every night, he would have. It terrified him.",
    subText: "– Leigh Bardugo, Six of Crows",
  },
  {
    id: 53,
    description:
      "Break my heart. Break it a thousand times if you like. It was only ever yours to break anyway.",
    subText: "― Kiera Cass, The One (The Selection #3)",
  },
  {
    id: 54,
    description:
      "I love you. There is no limit to what I can give to you, no time I need. Even when this world is a forgotten whisper of dust between the stars, I will love you.",
    subText: "― Sarah J. Maas, Empire of Storms (Throne of Glass, #5). ",
  },
  {
    id: 55,
    description:
      "Why do we breathe air? Because we love air? Because we don't want to suffocate. Why do we eat? Because we don't want to starve. How do I know I love her? Because I can sleep after I talk to her.",
    subText: "― Maggie Stiefvater, The Raven King",
  },
];

export const staticIntroData = [
  {
    key: 1,
    title: "Discover and Socialize",
    description:
      "Stay updated for the latest releases, and discover most recent books.",
    image: images.intro1,
  },
  {
    key: 2,
    title: "Large Book Collection",
    description:
      "Historical Novels, Adventure. fiction, fantasy, science, education and others.",
    image: images.intro2,
  },
  {
    key: 3,
    title: "Readers Community",
    description:
      "join the readers community that shares your love of books and reading.",
    image: images.intro3,
  },
];

export const goalOpt = [
  { title: "Monthly reading tracker", value: "1" },
  { title: "Yearly reading tracker", value: "2" },
];

export const profileSettingArr = [
  "Profile",
  "Import your library",
  "My Posts",
  "Switch to Author",
  "Configuration",
  "More....",
];

export const monthArr = [
  { title: "January", value: "1" },
  { title: "February", value: "2" },
  { title: "March", value: "3" },
  { title: "April", value: "4" },
  { title: "May", value: "5" },
  { title: "June", value: "6" },
  { title: "July", value: "7" },
  { title: "August", value: "8" },
  { title: "September", value: "9" },
  { title: "October", value: "10" },
  { title: "November", value: "11" },
  { title: "December", value: "12" },
];

export const yearArr = [
  { title: "2024", value: "1" },
  { title: "2023", value: "2" },
  { title: "2022", value: "3" },
  { title: "2021", value: "4" },
];

export const statesArr = [
  { title: "Book Read", count: 8 },
  { title: "Avg, Rating", count: 4.2 },
  { title: "Total Pages", count: 1298 },
  { title: "Avg. Pages", count: 156 },
];

export function remainingDays(date) {
  const current_time = moment();
  const unix = Date.parse(date) / 1000;
  const given_time = moment(unix * 1000); // Assuming 'timeAgo' is in seconds
  const seconds = current_time.diff(given_time, "seconds");
  const minutes = current_time.diff(given_time, "minutes");
  const hours = current_time.diff(given_time, "hours");
  const days = current_time.diff(given_time, "days");
  const weeks = current_time.diff(given_time, "weeks");
  const months = current_time.diff(given_time, "months");
  const years = current_time.diff(given_time, "years");

  if (seconds <= 60) {
    return "Just now";
  } else if (minutes <= 60) {
    if (minutes === 1) {
      return "a min ago";
    } else {
      return `${minutes} min ago`;
    }
  } else if (hours <= 24) {
    if (hours === 1) {
      return "a hour ago";
    } else {
      return `${hours} hours ago`;
    }
  } else if (days <= 7) {
    if (days === 1) {
      return "today";
    } else {
      return `${days} days ago`;
    }
  } else if (weeks <= 4.3) {
    if (weeks === 1) {
      return "a week ago";
    } else {
      return `${weeks} weeks ago`;
    }
  } else if (months <= 12) {
    if (months === 1) {
      return "a month ago";
    } else {
      return `${months} months ago`;
    }
  } else if (years === 1) {
    return "a year ago";
  } else {
    return `${years} years ago`;
  }
}
