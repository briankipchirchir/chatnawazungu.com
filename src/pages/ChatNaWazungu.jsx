import { useState, useEffect, useRef, createContext, useContext } from "react";

const API = "https://fulz-1.onrender.com";

// ─── ROUTER ───────────────────────────────────────────────────────────────────
function useRoute() {
  const [route, setRoute] = useState(window.location.hash || "#/");
  useEffect(() => {
    const handler = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  const navigate = (path) => { window.location.hash = path; };
  return { route, navigate };
}

// ─── AUTH CONTEXT ─────────────────────────────────────────────────────────────
const AuthCtx = createContext(null);
function useAuth() { return useContext(AuthCtx); }

// ─── DEMO DATA ────────────────────────────────────────────────────────────────
const DEMO_USERS = [
  { id: 1,   name: "James O.",      avatar: "🇬🇧", country: "United Kingdom",  online: true,  lastSeen: "now",        bio: "Language teacher, love African culture" },
  { id: 2,   name: "Maria S.",      avatar: "🇩🇪", country: "Germany",         online: true,  lastSeen: "now",        bio: "Traveller & food lover" },
  { id: 3,   name: "Tom B.",        avatar: "🇺🇸", country: "United States",   online: false, lastSeen: "2 hrs ago",  bio: "Software engineer & music fan" },
  { id: 4,   name: "Anna K.",       avatar: "🇫🇮", country: "Finland",         online: true,  lastSeen: "now",        bio: "Nordic explorer, hiking addict" },
  { id: 5,   name: "Pierre D.",     avatar: "🇫🇷", country: "France",          online: false, lastSeen: "1 hr ago",   bio: "Chef & wine enthusiast" },
  { id: 6,   name: "Yuki T.",       avatar: "🇯🇵", country: "Japan",           online: true,  lastSeen: "now",        bio: "Manga artist & language learner" },
  { id: 7,   name: "Sofia R.",      avatar: "🇮🇹", country: "Italy",           online: true,  lastSeen: "now",        bio: "Fashion designer & pasta lover" },
  { id: 8,   name: "Lars N.",       avatar: "🇸🇪", country: "Sweden",          online: false, lastSeen: "3 hrs ago",  bio: "Environmental scientist" },
  { id: 9,   name: "Amelia W.",     avatar: "🇦🇺", country: "Australia",       online: true,  lastSeen: "now",        bio: "Marine biologist, beach life" },
  { id: 10,  name: "Carlos M.",     avatar: "🇲🇽", country: "Mexico",          online: false, lastSeen: "30 min ago", bio: "Architect & street food fan" },
  { id: 11,  name: "Priya P.",      avatar: "🇮🇳", country: "India",           online: true,  lastSeen: "now",        bio: "Data scientist & Bollywood fan" },
  { id: 12,  name: "Ali H.",        avatar: "🇦🇪", country: "UAE",             online: true,  lastSeen: "now",        bio: "Business consultant & traveler" },
  { id: 13,  name: "Nina V.",       avatar: "🇷🇺", country: "Russia",          online: false, lastSeen: "5 hrs ago",  bio: "Ballet dancer & book reader" },
  { id: 14,  name: "Lucas F.",      avatar: "🇧🇷", country: "Brazil",          online: true,  lastSeen: "now",        bio: "Football coach & samba dancer" },
  { id: 15,  name: "Emma L.",       avatar: "🇨🇦", country: "Canada",          online: true,  lastSeen: "now",        bio: "Nurse & hiking enthusiast" },
  { id: 16,  name: "David C.",      avatar: "🇿🇦", country: "South Africa",    online: false, lastSeen: "1 hr ago",   bio: "Wildlife photographer" },
  { id: 17,  name: "Ingrid B.",     avatar: "🇳🇴", country: "Norway",          online: true,  lastSeen: "now",        bio: "Ship captain & fjord explorer" },
  { id: 18,  name: "Mei L.",        avatar: "🇨🇳", country: "China",           online: false, lastSeen: "2 hrs ago",  bio: "Tea ceremony master & painter" },
  { id: 19,  name: "Hassan A.",     avatar: "🇪🇬", country: "Egypt",           online: true,  lastSeen: "now",        bio: "Archaeologist & history buff" },
  { id: 20,  name: "Elena P.",      avatar: "🇬🇷", country: "Greece",          online: true,  lastSeen: "now",        bio: "Olive farmer & philosopher" },
  { id: 21,  name: "Kwame A.",      avatar: "🇬🇭", country: "Ghana",           online: true,  lastSeen: "now",        bio: "Music producer & fufu lover" },
  { id: 22,  name: "Isabella T.",   avatar: "🇵🇹", country: "Portugal",        online: false, lastSeen: "4 hrs ago",  bio: "Fado singer & surfer" },
  { id: 23,  name: "Raj S.",        avatar: "🇵🇰", country: "Pakistan",        online: true,  lastSeen: "now",        bio: "Cricket coach & biryani chef" },
  { id: 24,  name: "Fatima N.",     avatar: "🇲🇦", country: "Morocco",         online: true,  lastSeen: "now",        bio: "Textile artist & desert guide" },
  { id: 25,  name: "Oliver K.",     avatar: "🇳🇿", country: "New Zealand",     online: false, lastSeen: "6 hrs ago",  bio: "Rugby player & sheep farmer" },
  { id: 26,  name: "Akira M.",      avatar: "🇯🇵", country: "Japan",           online: true,  lastSeen: "now",        bio: "Sushi chef & origami master" },
  { id: 27,  name: "Chiara B.",     avatar: "🇮🇹", country: "Italy",           online: false, lastSeen: "2 hrs ago",  bio: "Opera singer & pizza aficionado" },
  { id: 28,  name: "Viktor Z.",     avatar: "🇨🇿", country: "Czech Republic",  online: true,  lastSeen: "now",        bio: "Beer brewer & castle explorer" },
  { id: 29,  name: "Amara D.",      avatar: "🇸🇳", country: "Senegal",         online: true,  lastSeen: "now",        bio: "Fisherman & storyteller" },
  { id: 30,  name: "Rosa M.",       avatar: "🇦🇷", country: "Argentina",       online: false, lastSeen: "1 hr ago",   bio: "Tango dancer & steak lover" },
  { id: 31,  name: "Nadia K.",      avatar: "🇺🇦", country: "Ukraine",         online: true,  lastSeen: "now",        bio: "Poet & sunflower farmer" },
  { id: 32,  name: "Bjorn H.",      avatar: "🇩🇰", country: "Denmark",         online: false, lastSeen: "3 hrs ago",  bio: "Viking historian & cyclist" },
  { id: 33,  name: "Leila F.",      avatar: "🇮🇷", country: "Iran",            online: true,  lastSeen: "now",        bio: "Carpet weaver & poet" },
  { id: 34,  name: "Miguel A.",     avatar: "🇵🇭", country: "Philippines",     online: true,  lastSeen: "now",        bio: "Diver & lechon master" },
  { id: 35,  name: "Zoe C.",        avatar: "🇨🇭", country: "Switzerland",     online: false, lastSeen: "30 min ago", bio: "Watchmaker & chocolate tester" },
  { id: 36,  name: "Kofi O.",       avatar: "🇳🇬", country: "Nigeria",         online: true,  lastSeen: "now",        bio: "Entrepreneur & Afrobeats fan" },
  { id: 37,  name: "Ana G.",        avatar: "🇨🇴", country: "Colombia",        online: true,  lastSeen: "now",        bio: "Salsa teacher & coffee grower" },
  { id: 38,  name: "Tariq M.",      avatar: "🇸🇦", country: "Saudi Arabia",    online: false, lastSeen: "2 hrs ago",  bio: "Architect & falconer" },
  { id: 39,  name: "Yuna P.",       avatar: "🇰🇷", country: "South Korea",     online: true,  lastSeen: "now",        bio: "K-drama writer & kimchi maker" },
  { id: 40,  name: "Dmitri V.",     avatar: "🇷🇺", country: "Russia",          online: false, lastSeen: "5 hrs ago",  bio: "Chess grandmaster & ice fisher" },
  { id: 41,  name: "Isabeau M.",    avatar: "🇧🇪", country: "Belgium",         online: true,  lastSeen: "now",        bio: "Chocolatier & comic artist" },
  { id: 42,  name: "Sipho N.",      avatar: "🇿🇦", country: "South Africa",    online: true,  lastSeen: "now",        bio: "Jazz musician & safari guide" },
  { id: 43,  name: "Hana C.",       avatar: "🇭🇷", country: "Croatia",         online: false, lastSeen: "1 hr ago",   bio: "Winemaker & Adriatic sailor" },
  { id: 44,  name: "Ravi K.",       avatar: "🇱🇰", country: "Sri Lanka",       online: true,  lastSeen: "now",        bio: "Tea planter & elephant keeper" },
  { id: 45,  name: "Marta W.",      avatar: "🇵🇱", country: "Poland",          online: false, lastSeen: "4 hrs ago",  bio: "Mathematician & pierogi chef" },
  { id: 46,  name: "Caleb J.",      avatar: "🇯🇲", country: "Jamaica",         online: true,  lastSeen: "now",        bio: "Reggae musician & sprinter" },
  { id: 47,  name: "Aiko S.",       avatar: "🇯🇵", country: "Japan",           online: true,  lastSeen: "now",        bio: "Robot engineer & green tea fan" },
  { id: 48,  name: "Femi A.",       avatar: "🇳🇬", country: "Nigeria",         online: false, lastSeen: "2 hrs ago",  bio: "Nollywood director & jollof chef" },
  { id: 49,  name: "Petra H.",      avatar: "🇩🇪", country: "Germany",         online: true,  lastSeen: "now",        bio: "Car engineer & Oktoberfest fan" },
  { id: 50,  name: "Diego R.",      avatar: "🇺🇾", country: "Uruguay",         online: true,  lastSeen: "now",        bio: "Gaucho & yerba mate drinker" },
  { id: 51,  name: "Oksana L.",     avatar: "🇧🇾", country: "Belarus",         online: false, lastSeen: "3 hrs ago",  bio: "Forest botanist & mushroom picker" },
  { id: 52,  name: "Samuel O.",     avatar: "🇰🇪", country: "Kenya",           online: true,  lastSeen: "now",        bio: "Marathon runner & Maasai warrior" },
  { id: 53,  name: "Cecile D.",     avatar: "🇫🇷", country: "France",          online: true,  lastSeen: "now",        bio: "Perfume maker & museum curator" },
  { id: 54,  name: "Oskar J.",      avatar: "🇮🇸", country: "Iceland",         online: false, lastSeen: "6 hrs ago",  bio: "Geothermal engineer & aurora chaser" },
  { id: 55,  name: "Lakshmi R.",    avatar: "🇮🇳", country: "India",           online: true,  lastSeen: "now",        bio: "Classical dancer & spice trader" },
  { id: 56,  name: "Felix W.",      avatar: "🇦🇹", country: "Austria",         online: false, lastSeen: "1 hr ago",   bio: "Pianist & Alpine climber" },
  { id: 57,  name: "Adaeze O.",     avatar: "🇳🇬", country: "Nigeria",         online: true,  lastSeen: "now",        bio: "Fashion blogger & suya fan" },
  { id: 58,  name: "Javier L.",     avatar: "🇪🇸", country: "Spain",           online: true,  lastSeen: "now",        bio: "Flamenco guitarist & tapas chef" },
  { id: 59,  name: "Miriam E.",     avatar: "🇮🇱", country: "Israel",          online: false, lastSeen: "2 hrs ago",  bio: "Startup founder & hummus lover" },
  { id: 60,  name: "Takeshi Y.",    avatar: "🇯🇵", country: "Japan",           online: true,  lastSeen: "now",        bio: "Samurai historian & ramen chef" },
  { id: 61,  name: "Bianca F.",     avatar: "🇧🇷", country: "Brazil",          online: true,  lastSeen: "now",        bio: "Carnival designer & capoeira fighter" },
  { id: 62,  name: "Ahmed K.",      avatar: "🇹🇳", country: "Tunisia",         online: false, lastSeen: "4 hrs ago",  bio: "Archaeologist & couscous chef" },
  { id: 63,  name: "Astrid L.",     avatar: "🇸🇪", country: "Sweden",          online: true,  lastSeen: "now",        bio: "ABBA superfan & IKEA designer" },
  { id: 64,  name: "Emmanuel N.",   avatar: "🇨🇲", country: "Cameroon",        online: true,  lastSeen: "now",        bio: "Football star & ndolé cook" },
  { id: 65,  name: "Valentina C.",  avatar: "🇨🇱", country: "Chile",           online: false, lastSeen: "30 min ago", bio: "Astronomer & empanada baker" },
  { id: 66,  name: "Henk V.",       avatar: "🇳🇱", country: "Netherlands",     online: true,  lastSeen: "now",        bio: "Tulip grower & cheese taster" },
  { id: 67,  name: "Zainab M.",     avatar: "🇸🇩", country: "Sudan",           online: false, lastSeen: "3 hrs ago",  bio: "Textile weaver & Nile sailor" },
  { id: 68,  name: "Cormac B.",     avatar: "🇮🇪", country: "Ireland",         online: true,  lastSeen: "now",        bio: "Pub storyteller & Gaelic football fan" },
  { id: 69,  name: "Svetlana P.",   avatar: "🇧🇬", country: "Bulgaria",        online: true,  lastSeen: "now",        bio: "Rose oil farmer & folk dancer" },
  { id: 70,  name: "Ibrahim D.",    avatar: "🇲🇱", country: "Mali",            online: false, lastSeen: "5 hrs ago",  bio: "Kora musician & griot storyteller" },
  { id: 71,  name: "Mei-Ling H.",   avatar: "🇹🇼", country: "Taiwan",          online: true,  lastSeen: "now",        bio: "Night market vendor & bubble tea inventor" },
  { id: 72,  name: "Kristoffer A.", avatar: "🇫🇴", country: "Faroe Islands",   online: false, lastSeen: "2 hrs ago",  bio: "Sheep herder & Northern Lights guide" },
  { id: 73,  name: "Blessing C.",   avatar: "🇿🇲", country: "Zambia",          online: true,  lastSeen: "now",        bio: "Victoria Falls guide & wildlife ranger" },
  { id: 74,  name: "Natasha V.",    avatar: "🇷🇴", country: "Romania",         online: true,  lastSeen: "now",        bio: "Gymnast & Dracula castle tour guide" },
  { id: 75,  name: "Kenji I.",      avatar: "🇯🇵", country: "Japan",           online: false, lastSeen: "1 hr ago",   bio: "Bullet train engineer & anime fan" },
  { id: 76,  name: "Grace A.",      avatar: "🇹🇿", country: "Tanzania",        online: true,  lastSeen: "now",        bio: "Kilimanjaro guide & safari expert" },
  { id: 77,  name: "Sven E.",       avatar: "🇩🇪", country: "Germany",         online: true,  lastSeen: "now",        bio: "Physicist & sausage connoisseur" },
  { id: 78,  name: "Amina B.",      avatar: "🇩🇿", country: "Algeria",         online: false, lastSeen: "4 hrs ago",  bio: "Berber historian & couscous queen" },
  { id: 79,  name: "Mateo C.",      avatar: "🇵🇪", country: "Peru",            online: true,  lastSeen: "now",        bio: "Machu Picchu guide & ceviche chef" },
  { id: 80,  name: "Olga T.",       avatar: "🇷🇺", country: "Russia",          online: false, lastSeen: "6 hrs ago",  bio: "Cosmonaut trainer & borscht maker" },
  { id: 81,  name: "Ekundayo A.",   avatar: "🇧🇯", country: "Benin",           online: true,  lastSeen: "now",        bio: "Voodoo historian & djembe player" },
  { id: 82,  name: "Linnea S.",     avatar: "🇸🇪", country: "Sweden",          online: true,  lastSeen: "now",        bio: "Midwinter festival organizer & skier" },
  { id: 83,  name: "Patrick O.",    avatar: "🇮🇪", country: "Ireland",         online: false, lastSeen: "2 hrs ago",  bio: "Whiskey distiller & céilí dancer" },
  { id: 84,  name: "Yasmine K.",    avatar: "🇱🇧", country: "Lebanon",         online: true,  lastSeen: "now",        bio: "Mezze chef & Cedar forest hiker" },
  { id: 85,  name: "Oluwaseun F.",  avatar: "🇳🇬", country: "Nigeria",         online: false, lastSeen: "3 hrs ago",  bio: "Tech startup CEO & Afrobeats DJ" },
  { id: 86,  name: "Freya M.",      avatar: "🇩🇰", country: "Denmark",         online: true,  lastSeen: "now",        bio: "Lego designer & hygge expert" },
  { id: 87,  name: "Rodrigo S.",    avatar: "🇪🇨", country: "Ecuador",         online: true,  lastSeen: "now",        bio: "Galapagos biologist & surf instructor" },
  { id: 88,  name: "Kirra M.",      avatar: "🇦🇺", country: "Australia",       online: false, lastSeen: "1 hr ago",   bio: "Aboriginal art teacher & outback guide" },
  { id: 89,  name: "Sergei B.",     avatar: "🇧🇾", country: "Belarus",         online: true,  lastSeen: "now",        bio: "Cybersecurity expert & sauna lover" },
  { id: 90,  name: "Tunde A.",      avatar: "🇳🇬", country: "Nigeria",         online: true,  lastSeen: "now",        bio: "Nollywood actor & highlife musician" },
  { id: 91,  name: "Mia H.",        avatar: "🇩🇰", country: "Denmark",         online: false, lastSeen: "5 hrs ago",  bio: "UX designer & minimalism advocate" },
  { id: 92,  name: "Jose C.",       avatar: "🇵🇷", country: "Puerto Rico",     online: true,  lastSeen: "now",        bio: "Reggaeton producer & beach volleyball player" },
  { id: 93,  name: "Zanele M.",     avatar: "🇿🇼", country: "Zimbabwe",        online: true,  lastSeen: "now",        bio: "Stone sculptor & Victoria Falls guide" },
  { id: 94,  name: "Maxim K.",      avatar: "🇰🇿", country: "Kazakhstan",      online: false, lastSeen: "2 hrs ago",  bio: "Horse trainer & eagle hunter" },
  { id: 95,  name: "Birgit L.",     avatar: "🇩🇪", country: "Germany",         online: true,  lastSeen: "now",        bio: "Environmental lawyer & forest bather" },
  { id: 96,  name: "Nneka O.",      avatar: "🇳🇬", country: "Nigeria",         online: true,  lastSeen: "now",        bio: "Human rights lawyer & Ankara fashion designer" },
  { id: 97,  name: "Tarquin P.",    avatar: "🇬🇧", country: "United Kingdom",  online: false, lastSeen: "4 hrs ago",  bio: "Eccentric inventor & tea ceremony devotee" },
  { id: 98,  name: "Camille R.",    avatar: "🇫🇷", country: "France",          online: true,  lastSeen: "now",        bio: "Pastry chef & museum guide" },
  { id: 99,  name: "Kazimiera W.",  avatar: "🇵🇱", country: "Poland",          online: false, lastSeen: "3 hrs ago",  bio: "Amber jeweler & Baltic sea swimmer" },
  { id: 100, name: "Themba N.",     avatar: "🇿🇦", country: "South Africa",    online: true,  lastSeen: "now",        bio: "Jazz pianist & wine sommelier" },
];

const DEMO_MESSAGES = {
  1:  [{ from:"them", text:"Hello! How are you doing today? I've been curious about Kenya for a long time — a friend of mine visited Nairobi last year and couldn't stop talking about the food and the people!", time:"10:02" },
       { from:"me",   text:"I'm great, thanks for asking! How about you?", time:"10:03" },
       { from:"them", text:"Doing well! I've always wanted to learn more about Kenya 🇰🇪", time:"10:04" }],
  2:  [{ from:"them", text:"Guten Tag! Do you speak any German? I've been trying to learn Swahili actually — jambo is the only word I know so far, haha!", time:"09:30" },
       { from:"me",   text:"Just a little! Wie geht's? 😄", time:"09:31" },
       { from:"them", text:"Haha sehr gut! You're a fast learner!", time:"09:32" }],
  4:  [{ from:"them", text:"Hi there! Finland is so cold right now 🥶 It's been snowing for three days straight and the lakes are completely frozen — we've been ice skating to work! How's the weather in your part of the world?", time:"08:15" }],
  6:  [{ from:"them", text:"Konnichiwa! Are you interested in Japanese culture? I've always been curious what people in Africa think about Japan — our cultures seem so different but I feel like there's a lot of warmth in both!", time:"11:00" }],
  14: [{ from:"them", text:"Oi! I heard Kenyan athletes are incredible — you guys dominate long-distance running! Do you run yourself? In Brazil we're all about football obviously but I have mad respect for Kipchoge!", time:"12:30" }],
  36: [{ from:"them", text:"Hey! A Kenyan in the chat, nice! Nigeria and Kenya have such a great rivalry in music and business — I feel like East Africa and West Africa are both rising so fast. What's the tech scene like in Nairobi these days?", time:"14:00" }],
};

// ─── LONG GENERIC REPLIES ─────────────────────────────────────────────────────
const REPLIES = [
  "That is genuinely so interesting to hear! I had no idea things worked that way over there. You know, back here we have a completely different way of doing it and it's funny how much the culture shapes the little everyday habits. I'd love to visit someday and experience it firsthand rather than just reading about it online.",
  "Haha, I completely know what you mean! It's one of those things that sounds so strange from the outside but once you live it, it just becomes totally normal. My family always laughs at me when I try to explain it to them — they think I've gone a bit mad from all my travels honestly.",
  "Really? I had absolutely no idea about that! You know what, this is exactly why I love talking to people from different parts of the world. You learn things you'd never pick up from any book or documentary. How long has that been a part of the culture there?",
  "Oh wow, you should definitely come visit my country someday! I think you would absolutely love it here. The food alone would blow your mind — we have dishes that have been passed down for hundreds of years and every family has their own secret version. Plus the landscapes are just stunning.",
  "What's the weather actually like there right now? I always imagine it's so different from what we have here. We've been dealing with some really unusual weather lately — either way too hot or suddenly freezing, nobody can predict it anymore. Climate change is really showing up in strange ways.",
  "I love learning about different cultures, it honestly makes me feel more connected to the world in a way that nothing else does. Social media gives you a surface level view but actually talking to someone real from that place is completely different. You get the real stories, the honest experiences.",
  "That's amazing! How long have you been doing that? I tried something similar a few years ago and I have to say it completely changed how I see things. Before I started I was quite close-minded about it but now I'd recommend it to literally everyone I know.",
  "Ha! Same here actually, funny that we have that in common! Sometimes I forget how much we all share underneath the different languages and traditions. At the end of the day people everywhere just want the same basic things — good food, good company, and something to laugh about.",
  "Oh my goodness, that's such a wild story! I can't believe that actually happened. Did everyone around you just carry on as normal or was there a big reaction? Over here something like that would be the talk of the neighborhood for months honestly, people never let things go.",
  "That makes a lot of sense when you put it that way. I've been thinking about it from the wrong angle I think. It's so easy to project your own context onto other people's situations without realizing you're doing it. Thanks for explaining — I feel like I understand so much better now.",
  "You know what, Kenya has always been on my bucket list! I keep seeing incredible photos of the Maasai Mara and Amboseli online and every single time I think 'this is the year I'm finally going' and then something comes up. One day though, I'm absolutely determined.",
  "The food must be so incredible there honestly. I'm a complete foodie and I've been watching so many videos about East African cuisine lately — the use of spices and the way everything is so communal and shared. It's the kind of eating I really love, not just fuel but an actual experience.",
  "I started learning about that culture a few months ago and honestly it has become a bit of an obsession for me already. The history is so deep and layered and every time I think I've understood something I realize there's another whole dimension to it. It's humbling in the best way.",
  "Your English is seriously so good by the way! I always feel a bit embarrassed when I'm the only one speaking just one language. I've been trying to learn a second language for years but I keep giving up after about two months when it gets hard. Any advice on how to actually stick with it?",
  "That's such a beautiful way to look at it. I think sometimes we get so caught up in our own corner of the world and our own daily routine that we forget how big and varied everything actually is. Conversations like this are genuinely good for the soul I think.",
  "Oh interesting! I've heard conflicting things about that so it's good to get a perspective from someone who actually lives there. The media here tends to paint a very one-dimensional picture of places it doesn't fully understand, which is frustrating. What's the reality actually like day to day?",
  "Ha, that is so funny that you say that! My friends and I were literally just having a debate about something very related to this last week and we couldn't agree at all. I'm definitely going to share what you just said because I think it might settle the argument once and for all.",
  "What kind of music are you into? I ask because I feel like music is one of those universal things that crosses every single border. I've been listening to a lot of African music lately and it just has this incredible energy that I can't find anywhere else. It makes you want to get up and dance immediately.",
  "That's honestly so fascinating to me. I studied a bit of history in school but we only ever learned about Europe and a tiny bit of America — the rest of the world was basically invisible in the curriculum which is such a shame when you think about how much incredible history is out there.",
  "I can't imagine what it's like to experience all four seasons so dramatically like that. Here we basically have two seasons — a wet one and a slightly less wet one haha. But there's something magical about real snow and proper autumn colors that I've always dreamed of experiencing in person.",
  "You know I actually think Kenya and my country have more in common than people realize. Both growing so fast, both dealing with the same mixture of holding onto tradition while also embracing modernity, both with incredibly young and ambitious populations. The future feels exciting from where I'm standing.",
  "My grandmother used to always say that you don't really know a place until you've eaten in someone's home there. Not a restaurant, someone's actual kitchen where the recipes haven't changed in three generations. I think about that a lot when I'm traveling and try to make it happen whenever I can.",
  "Honestly the more I chat with people from around the world the more I realize that the news gives such a distorted view of everything. Every place has problems but every place also has so much beauty and resilience and humor that just never makes it onto the screen. Real conversations are everything.",
  "That's wild! I've never even considered that angle before. You've genuinely given me something to think about today. I love when a conversation shifts your perspective like that — it doesn't happen as often as you'd think even when you're actively trying to stay open-minded and curious.",
  "Do you ever feel like the world is getting smaller and bigger at the same time? Like technology connects us in ways that were unimaginable even twenty years ago, but then some days everything feels so overwhelming and divided. I go back and forth on whether the internet has been a net positive for human connection.",
  "I think one of the most beautiful things about traveling — even virtually through conversations — is realizing that your way of seeing things is just one way among billions. It's very humbling actually and I mean that in the best possible sense, not in a discouraging way at all.",
  "That is such a mood honestly. Some days everything just clicks and you feel on top of the world, and other days the smallest thing throws off the whole energy. I've been trying to be more intentional about the mornings because I find they set the tone for everything that follows.",
  "Oh we have something very similar here! It's one of those things where you grow up thinking it's completely unique to your culture and then you talk to someone halfway across the world and realize it's basically universal human behavior. Makes you wonder what else we've been thinking was special but actually isn't.",
  "I really hope things improve with the global situation. It's been such a strange few years for everyone everywhere and I think we all deserve a bit of calm and stability now. On a personal level people are just trying to get on with things and build something decent for themselves and their families.",
  "Your country produces some genuinely outstanding athletes — and not just in running! The sporting culture there seems so strong and so community-rooted. Over here sport is kind of corporate and detached from the grassroots in a way that I think really hurts the overall culture and the quality of the athletes.",
  "I've been trying to cook more food from other cultures lately. It's such a good way to connect with a place even when you can't physically be there. Last month I attempted jollof rice which was an adventure, and this week I want to try something from East Africa. Any recommendations from your end?",
  "The entrepreneurial energy coming out of Africa right now is honestly incredible to follow from here. The innovation in mobile payments and fintech especially — Mpesa changed the whole world's understanding of what was possible and now everyone's following that model. Kenya really led the way on that one.",
  "What do young people there care most about right now? I feel like the youth everywhere are carrying so much weight — climate, economy, political instability — but they also seem more globally connected and empathetic than any previous generation. I find that genuinely hopeful even when the news is bad.",
  "Sometimes I think the best conversations happen completely by accident with strangers who had no reason to connect. Something about the randomness makes you both more honest somehow. There's no history, no judgment, just two people genuinely curious about each other's world. That's actually quite rare and precious.",
];

// Transactions loaded live from backend

// ─── STYLES ───────────────────────────────────────────────────────────────────
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #080c14; --surface: #0f1623; --surface2: #161e2e;
    --border: rgba(255,255,255,0.07); --border2: rgba(255,255,255,0.12);
    --green: #00e5a0; --green2: #00b87a; --green-dim: rgba(0,229,160,0.12);
    --text: #e8edf5; --muted: rgba(232,237,245,0.4); --muted2: rgba(232,237,245,0.2);
    --red: #ff5f6d; --gold: #ffd166;
    --radius: 16px; --radius-sm: 10px;
  }
  body { font-family:'DM Sans',sans-serif; background:#080c14; color:#e8edf5; min-height:100vh; }
  h1,h2,h3,h4 { font-family:'Syne',sans-serif; }
  button { font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.18s; }
  button:hover:not(:disabled) { filter:brightness(1.1); }
  input,textarea,select { font-family:'DM Sans',sans-serif; }
  input::placeholder,textarea::placeholder { color:rgba(232,237,245,0.25); }
  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.12); border-radius:99px; }

  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes spin   { to{transform:rotate(360deg)} }
  @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes blobA  { 0%,100%{transform:translate(0,0)scale(1)} 50%{transform:translate(40px,-30px)scale(1.08)} }
  @keyframes blobB  { 0%,100%{transform:translate(0,0)scale(1)} 50%{transform:translate(-30px,40px)scale(1.06)} }
  @keyframes msgIn  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shake  { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }

  .anim-fadeup { animation:fadeUp 0.45s ease both; }
  .shake { animation:shake 0.4s ease; }

  .btn-primary {
    background:linear-gradient(135deg,#00e5a0,#00b87a);
    color:#080c14; border:none; font-weight:700; letter-spacing:0.03em;
    border-radius:10px; padding:14px 28px; font-size:14px;
    box-shadow:0 4px 24px rgba(0,229,160,0.3);
  }
  .btn-ghost {
    background:transparent; border:1px solid rgba(255,255,255,0.12);
    color:rgba(232,237,245,0.4); border-radius:10px;
    padding:12px 24px; font-size:13px;
  }
  .btn-ghost:hover { border-color:#00e5a0; color:#00e5a0; }
  .card { background:#0f1623; border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:1.5rem; }

  .field { margin-bottom:1.1rem; }
  .field label {
    display:block; font-size:11px; font-weight:600; letter-spacing:0.1em;
    text-transform:uppercase; color:rgba(232,237,245,0.4); margin-bottom:7px;
  }
  .field input, .field select {
    width:100%; height:48px;
    background:rgba(255,255,255,0.04);
    border:1.5px solid rgba(255,255,255,0.08);
    border-radius:10px; color:#e8edf5; font-size:14px;
    padding:0 16px; outline:none; transition:border-color 0.2s, box-shadow 0.2s;
    -webkit-appearance:none; appearance:none;
  }
  .field input:focus, .field select:focus {
    border-color:#00e5a0;
    box-shadow:0 0 0 3px rgba(0,229,160,0.1);
  }
  .field input.err, .field select.err { border-color:#ff5f6d; }
  .field input.err:focus { box-shadow:0 0 0 3px rgba(255,95,109,0.15); }
  .field select option { background:#0f1623; color:#e8edf5; }
  .field-err { font-size:11px; color:#ff5f6d; margin-top:5px; display:flex; align-items:center; gap:4px; }

  .badge-online  { width:9px; height:9px; border-radius:50%; background:#00e5a0; box-shadow:0 0 8px #00e5a0; flex-shrink:0; }
  .badge-offline { width:9px; height:9px; border-radius:50%; background:rgba(232,237,245,0.2); flex-shrink:0; }

  .alert-err {
    background:rgba(255,95,109,0.1); border:1px solid rgba(255,95,109,0.25);
    border-radius:10px; padding:10px 14px; font-size:13px; color:#ff5f6d;
    margin-bottom:1rem; display:flex; align-items:center; gap:8px;
  }
`;

// ─── TINY COMPONENTS ──────────────────────────────────────────────────────────
function Spinner({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    style={{ animation:"spin 0.7s linear infinite", flexShrink:0 }}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" opacity="0.2"/>
    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>;
}

function Avatar({ emoji, size = 42, online }) {
  return <div style={{ position:"relative", flexShrink:0 }}>
    <div style={{ width:size, height:size, borderRadius:"50%", background:"#161e2e",
      border:"1px solid rgba(255,255,255,0.12)", display:"flex", alignItems:"center",
      justifyContent:"center", fontSize:size*0.48 }}>
      {emoji}
    </div>
    {online !== undefined && (
      <div style={{ position:"absolute", bottom:1, right:1 }}
        className={online ? "badge-online" : "badge-offline"}/>
    )}
  </div>;
}

function Field({ label, name, type="text", placeholder, value, onChange, error, hint, children }) {
  return (
    <div className="field">
      <label>{label}{hint && <span style={{float:"right",fontSize:10,color:"rgba(232,237,245,0.2)",textTransform:"none",letterSpacing:0}}>{hint}</span>}</label>
      {children || (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={error ? "err" : ""}
          autoComplete={type==="password" ? "current-password" : type==="email" ? "email" : "off"}
        />
      )}
      {error && <p className="field-err">⚠ {error}</p>}
    </div>
  );
}

// ─── SHELL ────────────────────────────────────────────────────────────────────
function Shell({ children, active }) {
  const { navigate } = useRoute();
  const { user, logout } = useAuth();
  const nav = [
    { path:"#/chat",     icon:"💬", label:"Chats"    },
    { path:"#/earnings", icon:"💰", label:"Earnings" },
    { path:"#/withdraw", icon:"📤", label:"Withdraw" },
    { path:"#/profile",  icon:"👤", label:"Profile"  },
  ];
  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <nav style={{ height:56, background:"#0f1623", borderBottom:"1px solid rgba(255,255,255,0.07)",
        display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 1.2rem",
        position:"sticky", top:0, zIndex:50 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:22 }}>💬</span>
          <span style={{ fontFamily:"Syne", fontWeight:800, fontSize:15 }}>Chat Na Wazungu</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:12, color:"rgba(232,237,245,0.4)" }}>
            Hi, <b style={{ color:"#e8edf5" }}>{user?.username}</b>
          </span>
          <button onClick={logout} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.07)",
            color:"rgba(232,237,245,0.4)", borderRadius:8, padding:"5px 12px", fontSize:12 }}>
            Logout
          </button>
        </div>
      </nav>
      <div style={{ flex:1, padding:"1.2rem", maxWidth:900, width:"100%", margin:"0 auto" }}>
        {children}
      </div>
      <nav style={{ height:60, background:"#0f1623", borderTop:"1px solid rgba(255,255,255,0.07)",
        display:"flex", alignItems:"center", justifyContent:"space-around",
        position:"sticky", bottom:0, zIndex:50 }}>
        {nav.map(n => {
          const isActive = active === n.path;
          return <button key={n.path} onClick={() => navigate(n.path)}
            style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3,
              background:"transparent", border:"none",
              color:isActive ? "#00e5a0" : "rgba(232,237,245,0.4)",
              fontSize:11, fontWeight:isActive ? 700 : 400, padding:"4px 12px" }}>
            <span style={{ fontSize:20 }}>{n.icon}</span>
            {n.label}
          </button>;
        })}
      </nav>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: LANDING
// ═══════════════════════════════════════════════════════════════════════════════
function LandingPage() {
  const { navigate } = useRoute();
  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", overflow:"hidden", position:"relative" }}>
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"-15%", left:"-10%", width:600, height:600,
          borderRadius:"50%", background:"radial-gradient(circle,rgba(0,229,160,0.07),transparent 70%)",
          animation:"blobA 14s ease-in-out infinite" }}/>
        <div style={{ position:"absolute", bottom:"-10%", right:"-10%", width:500, height:500,
          borderRadius:"50%", background:"radial-gradient(circle,rgba(0,184,122,0.06),transparent 70%)",
          animation:"blobB 18s ease-in-out infinite" }}/>
      </div>
      <div style={{ position:"relative", zIndex:1, flex:1, display:"flex", flexDirection:"column" }}>
        <nav style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"1.2rem 2rem", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#00e5a0,#00b87a)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>💬</div>
            <span style={{ fontFamily:"Syne", fontWeight:800, fontSize:16 }}>Chat Na Wazungu</span>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <button className="btn-ghost" onClick={() => navigate("#/login")} style={{ padding:"9px 20px", fontSize:13 }}>Sign In</button>
            <button className="btn-primary" onClick={() => navigate("#/register")} style={{ padding:"9px 20px", fontSize:13 }}>Get Started</button>
          </div>
        </nav>
        <div className="anim-fadeup" style={{ flex:1, display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center", textAlign:"center", padding:"4rem 1.5rem 3rem" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8,
            background:"rgba(0,229,160,0.12)", border:"1px solid rgba(0,229,160,0.2)",
            borderRadius:20, padding:"5px 14px", marginBottom:"1.8rem" }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#00e5a0",
              display:"inline-block", boxShadow:"0 0 8px #00e5a0" }}/>
            <span style={{ fontSize:12, color:"#00e5a0", fontWeight:600 }}>Live Platform</span>
          </div>
          <h1 style={{ fontFamily:"Syne", fontSize:"clamp(36px,7vw,72px)", fontWeight:900,
            lineHeight:1.05, letterSpacing:"-2px", marginBottom:"1.2rem" }}>
            Chat with the World.<br/>
            <span style={{ background:"linear-gradient(135deg,#00e5a0,#6fffcb)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Earn as You Go.</span>
          </h1>
          <p style={{ fontSize:"clamp(14px,2.5vw,17px)", color:"rgba(232,237,245,0.4)",
            maxWidth:520, lineHeight:1.75, marginBottom:"2.5rem" }}>
            Connect with people worldwide, have meaningful conversations, and earn credits for your time. Withdraw anytime via M-PESA.
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center" }}>
            <button className="btn-primary" onClick={() => navigate("#/register")}
              style={{ fontSize:15, padding:"15px 36px", borderRadius:12 }}>
              Create Account 🚀
            </button>
            <button className="btn-ghost" onClick={() => navigate("#/login")}
              style={{ fontSize:15, padding:"15px 36px", borderRadius:12 }}>
              Sign In
            </button>
          </div>
          <div style={{ display:"flex", gap:10, marginTop:"3rem", flexWrap:"wrap", justifyContent:"center" }}>
            {["💬 Real-time chat","💰 Earn per session","📤 M-PESA withdrawals","🌍 100+ global users"].map(f => (
              <span key={f} style={{ background:"#0f1623", border:"1px solid rgba(255,255,255,0.07)",
                borderRadius:20, padding:"7px 16px", fontSize:13, color:"rgba(232,237,245,0.4)" }}>{f}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: REGISTER
// ═══════════════════════════════════════════════════════════════════════════════
function RegisterPage() {
  const { navigate } = useRoute();
  const { login } = useAuth();
  const [form, setForm] = useState({ username:"", email:"", phone:"", country:"Kenya", password:"", confirm:"" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const set = k => v => { setForm(f => ({ ...f, [k]:v })); setErrors(e => ({ ...e, [k]:"" })); setApiError(""); };

  const validate = () => {
    const e = {};
    if (!form.username.trim())                      e.username = "Username is required";
    else if (form.username.trim().length < 3)       e.username = "At least 3 characters";
    if (!form.email.includes("@"))                  e.email = "Enter a valid email address";
    if (!form.phone.match(/^0[17]\d{8}$/))          e.phone = "Use format 07XXXXXXXX or 01XXXXXXXX";
    if (form.password.length < 6)                   e.password = "Minimum 6 characters";
    if (form.password !== form.confirm)             e.confirm = "Passwords don't match";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    setLoading(true);
    setApiError("");
    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          country: form.country,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data.error || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }
      login({ ...data.user, balance: data.user.balance || 0, totalEarned: data.user.totalEarned || 0 });
      navigate("#/chat");
    } catch {
      setApiError("Could not connect to server. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem 1rem" }}>
      <div className="anim-fadeup" style={{ width:"100%", maxWidth:420 }}>
        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <div style={{ width:52, height:52, borderRadius:14, background:"linear-gradient(135deg,#00e5a0,#00b87a)",
            display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", fontSize:26 }}>💬</div>
          <h1 style={{ fontSize:26, fontWeight:800, letterSpacing:"-0.8px" }}>Create account</h1>
          <p style={{ color:"rgba(232,237,245,0.4)", fontSize:13, marginTop:4 }}>Join thousands of chatters worldwide</p>
        </div>

        {apiError && (
          <div className="alert-err">
            <span>⚠</span> {apiError}
          </div>
        )}

        <div className={`card ${shake ? "shake" : ""}`} style={{ padding:"1.8rem" }}>
          <Field label="Username" value={form.username} onChange={set("username")} placeholder="Your display name" error={errors.username}/>
          <Field label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" error={errors.email}/>
          <Field label="Phone" value={form.phone} onChange={set("phone")} placeholder="07XXXXXXXX" hint="For M-PESA" error={errors.phone}/>

          <div className="field">
            <label>Country</label>
            <select value={form.country} onChange={e => set("country")(e.target.value)}>
              {["Kenya","Uganda","Tanzania","Rwanda","Ethiopia","Nigeria","Ghana","South Africa"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <Field label="Password" type="password" value={form.password} onChange={set("password")} placeholder="Min. 6 characters" error={errors.password}/>
          <Field label="Confirm Password" type="password" value={form.confirm} onChange={set("confirm")} placeholder="Repeat password" error={errors.confirm}/>

          <button className="btn-primary" onClick={handleSubmit} disabled={loading}
            style={{ width:"100%", height:50, marginTop:4, display:"flex", alignItems:"center",
              justifyContent:"center", gap:8, opacity:loading ? 0.7 : 1 }}>
            {loading ? <><Spinner/>Creating account…</> : "Create Account →"}
          </button>
        </div>

        <p style={{ textAlign:"center", fontSize:13, color:"rgba(232,237,245,0.4)", marginTop:"1.2rem" }}>
          Already have an account?{" "}
          <span onClick={() => navigate("#/login")} style={{ color:"#00e5a0", fontWeight:600, cursor:"pointer" }}>Sign in</span>
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: LOGIN
// ═══════════════════════════════════════════════════════════════════════════════
function LoginPage() {
  const { navigate } = useRoute();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async () => {
    let valid = true;
    setEmailErr(""); setPassErr(""); setApiError("");

    if (!email.includes("@")) { setEmailErr("Enter a valid email address"); valid = false; }
    if (password.length < 6)  { setPassErr("Password must be at least 6 characters"); valid = false; }

    if (!valid) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data.error || "Login failed. Check your credentials.");
        setLoading(false);
        return;
      }
      login({ ...data.user, balance: data.user.balance || 0, totalEarned: data.user.totalEarned || 0 });
      navigate("#/chat");
    } catch {
      setApiError("Could not connect to server. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem 1rem" }}>
      <div className="anim-fadeup" style={{ width:"100%", maxWidth:380 }}>
        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <div style={{ width:52, height:52, borderRadius:14, background:"linear-gradient(135deg,#00e5a0,#00b87a)",
            display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", fontSize:26 }}>💬</div>
          <h1 style={{ fontSize:26, fontWeight:800, letterSpacing:"-0.8px" }}>Welcome back</h1>
          <p style={{ color:"rgba(232,237,245,0.4)", fontSize:13, marginTop:4 }}>Sign in to continue chatting</p>
        </div>

        {apiError && (
          <div className="alert-err">
            <span>⚠</span> {apiError}
          </div>
        )}

        <div className={`card ${shake ? "shake" : ""}`} style={{ padding:"1.8rem" }}>
          <Field label="Email" type="email" value={email} onChange={v => { setEmail(v); setEmailErr(""); setApiError(""); }}
            placeholder="you@email.com" error={emailErr}/>
          <Field label="Password" type="password" value={password} onChange={v => { setPassword(v); setPassErr(""); setApiError(""); }}
            placeholder="Your password" error={passErr}/>

          <button className="btn-primary" onClick={handleSubmit} disabled={loading}
            style={{ width:"100%", height:50, display:"flex", alignItems:"center",
              justifyContent:"center", gap:8, opacity:loading ? 0.7 : 1 }}>
            {loading ? <><Spinner/>Signing in…</> : "Sign In →"}
          </button>
        </div>

        <p style={{ textAlign:"center", fontSize:13, color:"rgba(232,237,245,0.4)", marginTop:"1.2rem" }}>
          No account yet?{" "}
          <span onClick={() => navigate("#/register")} style={{ color:"#00e5a0", fontWeight:600, cursor:"pointer" }}>Register</span>
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: CHAT LIST
// ═══════════════════════════════════════════════════════════════════════════════
function ChatListPage() {
  const { navigate } = useRoute();
  const [search, setSearch] = useState("");
  const filtered = DEMO_USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.country.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Shell active="#/chat">
      <div className="anim-fadeup">
        <div style={{ marginBottom:"1.4rem" }}>
          <h2 style={{ fontSize:22, fontWeight:800, letterSpacing:"-0.5px" }}>Messages</h2>
          <p style={{ color:"rgba(232,237,245,0.4)", fontSize:13, marginTop:3 }}>Chat and earn Ksh 150 per session · {DEMO_USERS.length} users online</p>
        </div>
        <div style={{ position:"relative", marginBottom:"1rem" }}>
          <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:16, pointerEvents:"none" }}>🔍</span>
          <input placeholder="Search by name or country…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ width:"100%", height:44, background:"#0f1623", border:"1px solid rgba(255,255,255,0.07)",
              borderRadius:10, color:"#e8edf5", fontSize:14, paddingLeft:42, outline:"none" }}/>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
          {filtered.map(u => {
            const lastMsg = DEMO_MESSAGES[u.id];
            const preview = lastMsg ? lastMsg[lastMsg.length-1].text : "Start a conversation…";
            return (
              <div key={u.id} onClick={() => navigate(`#/chat/${u.id}`)}
                style={{ display:"flex", alignItems:"center", gap:14, padding:"1rem 1.2rem",
                  background:"#0f1623", border:"1px solid rgba(255,255,255,0.07)",
                  borderRadius:16, cursor:"pointer", transition:"all 0.18s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.12)"}
                onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}>
                <Avatar emoji={u.avatar} size={46} online={u.online}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontWeight:600, fontSize:15 }}>{u.name}</span>
                    <span style={{ fontSize:11, color:"rgba(232,237,245,0.2)", flexShrink:0 }}>{u.online?"now":u.lastSeen}</span>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:2 }}>
                    <span style={{ fontSize:13, color:"rgba(232,237,245,0.4)", overflow:"hidden",
                      textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:"70%" }}>{preview}</span>
                    <span style={{ fontSize:10, color:u.online?"#00e5a0":"rgba(232,237,245,0.2)",
                      flexShrink:0, marginLeft:8 }}>{u.country}</span>
                  </div>
                </div>
                <span style={{ color:"rgba(232,237,245,0.2)", fontSize:18 }}>›</span>
              </div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: CHAT ROOM
// ═══════════════════════════════════════════════════════════════════════════════
function ChatRoomPage({ userId }) {
  const { navigate } = useRoute();
  const { addEarning } = useAuth();
  const person = DEMO_USERS.find(u => u.id === Number(userId));
  const [messages, setMessages] = useState(DEMO_MESSAGES[Number(userId)] || []);
  const [input, setInput] = useState("");
  const [earned, setEarned] = useState(0);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const replyIndexRef = useRef(Math.floor(Math.random() * REPLIES.length));

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  if (!person) { navigate("#/chat"); return null; }

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2,"0")}`;
    setMessages(m => [...m, { from:"me", text:input.trim(), time }]);
    setInput("");
    setEarned(e => e + 150);
    addEarning(150);
    setTyping(true);
    setTimeout(() => {
      // cycle through replies in order so they don't repeat quickly
      const reply = REPLIES[replyIndexRef.current % REPLIES.length];
      replyIndexRef.current += 1;
      const t2 = new Date();
      setMessages(m => [...m, { from:"them", text:reply,
        time:`${t2.getHours()}:${String(t2.getMinutes()).padStart(2,"0")}` }]);
      setTyping(false);
    }, 1400 + Math.random()*1000);
  };

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:"#080c14" }}>
      <div style={{ height:60, background:"#0f1623", borderBottom:"1px solid rgba(255,255,255,0.07)",
        display:"flex", alignItems:"center", gap:12, padding:"0 1rem", flexShrink:0 }}>
        <button onClick={() => navigate("#/chat")}
          style={{ background:"transparent", border:"none", color:"rgba(232,237,245,0.4)",
            fontSize:22, padding:"4px 8px", borderRadius:8, lineHeight:1 }}>‹</button>
        <Avatar emoji={person.avatar} size={38} online={person.online}/>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:700, fontSize:15 }}>{person.name}</div>
          <div style={{ fontSize:11, color:person.online?"#00e5a0":"rgba(232,237,245,0.4)" }}>
            {person.online?"Online":"Last seen "+person.lastSeen} · {person.country}
          </div>
        </div>
        {earned > 0 && (
          <div style={{ background:"rgba(0,229,160,0.12)", border:"1px solid rgba(0,229,160,0.2)",
            borderRadius:20, padding:"4px 12px", fontSize:12, color:"#00e5a0", fontWeight:700 }}>
            +Ksh {earned} earned
          </div>
        )}
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"1rem", display:"flex", flexDirection:"column", gap:"0.6rem" }}>
        <div style={{ textAlign:"center", marginBottom:"0.5rem" }}>
          <span style={{ fontSize:11, color:"rgba(232,237,245,0.2)", background:"#0f1623",
            border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:"3px 12px" }}>
            Today · You earn Ksh 150 per message sent
          </span>
        </div>
        {messages.map((m, i) => (
          <div key={i} style={{ display:"flex", justifyContent:m.from==="me"?"flex-end":"flex-start",
            animation:"msgIn 0.25s ease both" }}>
            <div style={{ maxWidth:"78%", padding:"10px 14px",
              borderRadius:m.from==="me"?"16px 16px 4px 16px":"16px 16px 16px 4px",
              background:m.from==="me"?"linear-gradient(135deg,#00e5a0,#00b87a)":"#161e2e",
              color:m.from==="me"?"#080c14":"#e8edf5", fontSize:14, lineHeight:1.6,
              border:m.from==="me"?"none":"1px solid rgba(255,255,255,0.07)" }}>
              {m.text}
              <div style={{ fontSize:10, marginTop:4, opacity:0.6, textAlign:"right" }}>{m.time}</div>
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ display:"flex", justifyContent:"flex-start" }}>
            <div style={{ padding:"10px 16px", background:"#161e2e",
              border:"1px solid rgba(255,255,255,0.07)", borderRadius:"16px 16px 16px 4px",
              display:"flex", gap:4, alignItems:"center" }}>
              {[0,1,2].map(i => <span key={i} style={{ width:6, height:6, borderRadius:"50%",
                background:"rgba(232,237,245,0.4)",
                animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite` }}/>)}
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>
      <div style={{ padding:"0.8rem 1rem", background:"#0f1623",
        borderTop:"1px solid rgba(255,255,255,0.07)",
        display:"flex", gap:10, alignItems:"center", flexShrink:0 }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key==="Enter" && sendMessage()}
          placeholder="Type a message…"
          style={{ flex:1, height:44, background:"#161e2e", border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:22, color:"#e8edf5", fontSize:14, padding:"0 16px", outline:"none" }}/>
        <button onClick={sendMessage} disabled={!input.trim()}
          style={{ width:44, height:44, borderRadius:"50%",
            background:"linear-gradient(135deg,#00e5a0,#00b87a)", border:"none",
            fontSize:18, display:"flex", alignItems:"center", justifyContent:"center",
            flexShrink:0, opacity:input.trim() ? 1 : 0.4 }}>➤</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: EARNINGS
// ═══════════════════════════════════════════════════════════════════════════════
function EarningsPage() {
  const { user } = useAuth();
  const gross = user.totalEarned || 0;
  const fee = Math.round(gross * 0.2);
  const net = gross - fee;

  const [boosts, setBoosts] = useState([]);
  const [loadingBoosts, setLoadingBoosts] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/boosts/by-id/${user.id}`)
      .then(r => r.ok ? r.json() : [])
      .then(data => { setBoosts(Array.isArray(data) ? data : []); setLoadingBoosts(false); })
      .catch(() => setLoadingBoosts(false));
  }, [user.id]);

  const chatSessions = Math.floor(gross / 150);
  const chatTxns = Array.from({ length: chatSessions }, (_, i) => ({
    id: `chat-${i}`, type: "earn",
    desc: "Chat session earnings",
    amount: 150,
    date: "Recent",
  }));
  const boostTxns = boosts.map(b => ({
    id: `boost-${b.id}`, type: b.paid ? "fee" : "pending",
    desc: `Platform fee payment${b.paid ? " ✓" : " (pending)"}`,
    amount: -(b.fee || 0),
    date: b.paymentDate ? new Date(b.paymentDate).toLocaleDateString() : "Pending",
    receipt: b.mpesaReceipt,
  }));
  const allTxns = [...boostTxns, ...chatTxns].slice(0, 20);

  return (
    <Shell active="#/earnings">
      <div className="anim-fadeup">
        <div style={{ marginBottom:"1.4rem" }}>
          <h2 style={{ fontSize:22, fontWeight:800, letterSpacing:"-0.5px" }}>Earnings</h2>
          <p style={{ color:"rgba(232,237,245,0.4)", fontSize:13, marginTop:3 }}>Platform fee paid before each withdrawal</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"0.8rem", marginBottom:"1.4rem" }}>
          {[
            { label:"Total Earned",      value:`Ksh ${gross}`, color:"#00e5a0", icon:"💰" },
            { label:"Platform Fee (20%)", value:`Ksh ${fee}`,  color:"#ff5f6d", icon:"📊" },
            { label:"Net Balance",        value:`Ksh ${net}`,  color:"#ffd166", icon:"💳" },
          ].map(c => (
            <div key={c.label} className="card" style={{ textAlign:"center", padding:"1.2rem 0.8rem" }}>
              <div style={{ fontSize:24, marginBottom:6 }}>{c.icon}</div>
              <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:"clamp(16px,3vw,22px)", color:c.color }}>{c.value}</div>
              <div style={{ fontSize:11, color:"rgba(232,237,245,0.4)", marginTop:4, lineHeight:1.3 }}>{c.label}</div>
            </div>
          ))}
        </div>
        <div style={{ background:"rgba(255,209,102,0.08)", border:"1px solid rgba(255,209,102,0.2)",
          borderRadius:12, padding:"1rem 1.2rem", marginBottom:"1.4rem", display:"flex", gap:12, alignItems:"flex-start" }}>
          <span style={{ fontSize:20, flexShrink:0 }}>ℹ️</span>
          <p style={{ fontSize:12, color:"rgba(232,237,245,0.4)", lineHeight:1.7 }}>
            You earn <b style={{ color:"#e8edf5" }}>Ksh 150</b> per chat session. To withdraw, you first pay the <b style={{ color:"#e8edf5" }}>20% platform fee</b> via M-PESA STK push. After payment is confirmed, your net balance is released.
          </p>
        </div>
        <h3 style={{ fontWeight:700, fontSize:15, marginBottom:"0.8rem" }}>Transaction History</h3>
        {loadingBoosts ? (
          <div style={{ display:"flex", justifyContent:"center", padding:"2rem", color:"rgba(232,237,245,0.4)" }}>
            <Spinner/>&nbsp;Loading transactions…
          </div>
        ) : allTxns.length === 0 ? (
          <div style={{ textAlign:"center", padding:"2rem", color:"rgba(232,237,245,0.3)", fontSize:13 }}>
            No transactions yet. Start chatting to earn!
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
            {allTxns.map(t => (
              <div key={t.id} className="card" style={{ display:"flex", alignItems:"center", gap:14, padding:"0.9rem 1.2rem" }}>
                <div style={{ width:38, height:38, borderRadius:10,
                  background:t.type==="earn"?"rgba(0,229,160,0.12)":t.type==="pending"?"rgba(255,209,102,0.1)":"rgba(255,95,109,0.1)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>
                  {t.type==="earn"?"💬":t.type==="pending"?"⏳":"📊"}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:500 }}>{t.desc}</div>
                  <div style={{ fontSize:11, color:"rgba(232,237,245,0.4)", marginTop:2 }}>
                    {t.date}{t.receipt ? ` · ${t.receipt}` : ""}
                  </div>
                </div>
                <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:15,
                  color:t.amount>0?"#00e5a0":t.type==="pending"?"#ffd166":"#ff5f6d", flexShrink:0 }}>
                  {t.amount>0?"+":""}Ksh {Math.abs(t.amount)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Shell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: WITHDRAW
// ═══════════════════════════════════════════════════════════════════════════════
function WithdrawPage() {
  const { user, withdraw } = useAuth();
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState(user.phone || "");
  const [phoneErr, setPhoneErr] = useState("");
  const [amountErr, setAmountErr] = useState("");
  const [apiError, setApiError] = useState("");
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);
  const [boostId, setBoostId] = useState(null);
  const [pollCount, setPollCount] = useState(0);

  const gross = user.totalEarned || 0;
  const platformFee = Math.round(gross * 0.2);
  const available = gross - platformFee;
  const amtNum = Number(amount);
  const withdrawFee = Math.round(amtNum * 0.2);

  const handleRequest = () => {
    setAmountErr(""); setPhoneErr(""); setApiError("");
    let valid = true;
    if (!amtNum || amtNum < 1000)      { setAmountErr("Minimum withdrawal is Ksh 1000"); valid = false; }
    else if (amtNum > available)     { setAmountErr(`Only Ksh ${available} available`); valid = false; }
    if (!phone.match(/^(07|01|254|\+254)\d{8,9}$/)) { setPhoneErr("Enter a valid M-PESA number"); valid = false; }
    if (valid) setStep("confirm");
  };

  const handlePayFee = async () => {
    setLoading(true);
    setApiError("");
    try {
      const res = await fetch(`${API}/api/boosts/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          amount: amtNum,
          fee: withdrawFee,
          identificationNumber: String(user.id),
          customer_name: user.username,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setApiError(data.error || "Failed to initiate payment. Try again.");
        setLoading(false);
        return;
      }
      setBoostId(data.boostId);
      setLoading(false);
      setStep("waiting");
      setPollCount(0);
    } catch {
      setApiError("Could not connect to server. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step !== "waiting" || !boostId) return;
    if (pollCount > 20) { setStep("failed"); return; }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${API}/api/boosts/${boostId}`);
        const data = await res.json();
        if (data.paymentStatus === "COMPLETED") {
          withdraw(amtNum);
          setStep("success");
        } else if (data.paymentStatus === "FAILED" || data.paymentStatus === "CANCELLED") {
          setStep("failed");
        } else {
          setPollCount(c => c + 1);
        }
      } catch {
        setPollCount(c => c + 1);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [step, boostId, pollCount]);

  if (step === "success") return (
    <Shell active="#/withdraw">
      <div className="anim-fadeup" style={{ textAlign:"center", paddingTop:"3rem" }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(0,229,160,0.12)",
          border:"1px solid rgba(0,229,160,0.3)", display:"flex", alignItems:"center",
          justifyContent:"center", margin:"0 auto 1.5rem", fontSize:32 }}>✓</div>
        <h2 style={{ fontSize:24, fontWeight:800, letterSpacing:"-0.5px" }}>Withdrawal Processed!</h2>
        <p style={{ color:"rgba(232,237,245,0.4)", fontSize:14, marginTop:8, lineHeight:1.7 }}>
          Platform fee of <b style={{ color:"#e8edf5" }}>Ksh {withdrawFee}</b> paid successfully.<br/>
          <b style={{ color:"#e8edf5" }}>Ksh {amtNum - withdrawFee}</b> has been released to <b style={{ color:"#e8edf5" }}>{phone}</b>.
        </p>
        <button className="btn-primary" onClick={() => { setStep("form"); setAmount(""); }}
          style={{ marginTop:"1.5rem", padding:"13px 32px" }}>
          Make Another Withdrawal
        </button>
      </div>
    </Shell>
  );

  if (step === "failed") return (
    <Shell active="#/withdraw">
      <div className="anim-fadeup" style={{ textAlign:"center", paddingTop:"3rem" }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(255,95,109,0.1)",
          border:"1px solid rgba(255,95,109,0.3)", display:"flex", alignItems:"center",
          justifyContent:"center", margin:"0 auto 1.5rem", fontSize:32 }}>✗</div>
        <h2 style={{ fontSize:24, fontWeight:800 }}>Payment Failed</h2>
        <p style={{ color:"rgba(232,237,245,0.4)", fontSize:14, marginTop:8, lineHeight:1.7 }}>
          The M-PESA payment was not completed.<br/>Please check your phone and try again.
        </p>
        <button className="btn-primary" onClick={() => setStep("confirm")}
          style={{ marginTop:"1.5rem", padding:"13px 32px" }}>
          Try Again
        </button>
      </div>
    </Shell>
  );

  if (step === "waiting") return (
    <Shell active="#/withdraw">
      <div className="anim-fadeup" style={{ textAlign:"center", paddingTop:"3rem" }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(0,229,160,0.08)",
          border:"1px solid rgba(0,229,160,0.2)", display:"flex", alignItems:"center",
          justifyContent:"center", margin:"0 auto 1.5rem" }}>
          <Spinner size={32}/>
        </div>
        <h2 style={{ fontSize:22, fontWeight:800 }}>Check Your Phone</h2>
        <p style={{ color:"rgba(232,237,245,0.4)", fontSize:14, marginTop:10, lineHeight:1.8 }}>
          An M-PESA STK push has been sent to<br/>
          <b style={{ color:"#e8edf5", fontSize:16 }}>{phone}</b><br/>
          Enter your PIN to pay the platform fee of <b style={{ color:"#ffd166" }}>Ksh {withdrawFee}</b>.
        </p>
        <div style={{ marginTop:"1.5rem", background:"#0f1623", border:"1px solid rgba(255,255,255,0.07)",
          borderRadius:12, padding:"1rem", display:"inline-block" }}>
          <p style={{ fontSize:12, color:"rgba(232,237,245,0.3)", animation:"pulse 2s ease-in-out infinite" }}>
            Waiting for M-PESA confirmation… ({pollCount > 0 ? `${pollCount * 3}s` : "just sent"})
          </p>
        </div>
        <br/>
        <button className="btn-ghost" onClick={() => setStep("form")}
          style={{ marginTop:"1.2rem", padding:"10px 24px", fontSize:13 }}>
          Cancel
        </button>
      </div>
    </Shell>
  );

  if (step === "confirm") return (
    <Shell active="#/withdraw">
      <div className="anim-fadeup" style={{ maxWidth:420, margin:"0 auto" }}>
        <h2 style={{ fontSize:22, fontWeight:800, marginBottom:"1.5rem" }}>Confirm Withdrawal</h2>
        <div className="card" style={{ marginBottom:"1rem" }}>
          {[
            ["Withdrawal amount", `Ksh ${amtNum}`],
            ["Platform fee (20%)", `Ksh ${withdrawFee}`],
            ["You receive", `Ksh ${amtNum - withdrawFee}`],
            ["Fee sent to", phone],
          ].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"0.7rem 0",
              borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ fontSize:13, color:"rgba(232,237,245,0.4)" }}>{k}</span>
              <span style={{ fontSize:13, fontWeight:600,
                color:k==="Platform fee (20%)"?"#ff5f6d":k==="You receive"?"#00e5a0":"#e8edf5" }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ background:"rgba(255,209,102,0.08)", border:"1px solid rgba(255,209,102,0.2)",
          borderRadius:10, padding:"10px 14px", marginBottom:"1rem", fontSize:12,
          color:"rgba(232,237,245,0.5)", lineHeight:1.7 }}>
          📱 An M-PESA STK push will be sent to your phone. Enter your PIN to pay the platform fee, then your net balance will be released.
        </div>
        {apiError && <div className="alert-err" style={{ marginBottom:"1rem" }}>⚠ {apiError}</div>}
        <div style={{ display:"flex", gap:10 }}>
          <button className="btn-ghost" onClick={() => setStep("form")} style={{ flex:1, height:48 }}>Back</button>
          <button className="btn-primary" onClick={handlePayFee} disabled={loading}
            style={{ flex:2, height:48, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            {loading ? <><Spinner/>Sending STK…</> : "Pay Fee & Withdraw →"}
          </button>
        </div>
      </div>
    </Shell>
  );

  return (
    <Shell active="#/withdraw">
      <div className="anim-fadeup" style={{ maxWidth:420, margin:"0 auto" }}>
        <div style={{ marginBottom:"1.4rem" }}>
          <h2 style={{ fontSize:22, fontWeight:800, letterSpacing:"-0.5px" }}>Withdraw Funds</h2>
          <p style={{ color:"rgba(232,237,245,0.4)", fontSize:13, marginTop:3 }}>Pay platform fee via M-PESA to withdraw</p>
        </div>
        <div style={{ background:"linear-gradient(135deg,rgba(0,229,160,0.12),rgba(0,184,122,0.06))",
          border:"1px solid rgba(0,229,160,0.2)", borderRadius:16, padding:"1.4rem", marginBottom:"1.4rem" }}>
          <p style={{ fontSize:11, color:"rgba(0,229,160,0.6)", fontWeight:700, letterSpacing:"0.1em",
            textTransform:"uppercase", marginBottom:6 }}>Available Balance</p>
          <p style={{ fontFamily:"Syne", fontSize:38, fontWeight:900, color:"#00e5a0", letterSpacing:"-1.5px" }}>
            Ksh {available}
          </p>
          <p style={{ fontSize:12, color:"rgba(232,237,245,0.4)", marginTop:4 }}>
            Total earned Ksh {gross} · 20% fee = Ksh {platformFee}
          </p>
        </div>
        <div className="card">
          <Field label="Amount to Withdraw (Ksh)" type="number" value={amount}
            onChange={v => { setAmount(v); setAmountErr(""); }}
            placeholder="e.g. 1000" error={amountErr}/>

          {amtNum > 0 && (
            <div style={{ background:"rgba(255,95,109,0.06)", border:"1px solid rgba(255,95,109,0.15)",
              borderRadius:10, padding:"10px 14px", marginBottom:"1rem", fontSize:12,
              color:"rgba(232,237,245,0.5)", display:"flex", justifyContent:"space-between" }}>
              <span>Platform fee (20%)</span>
              <span style={{ color:"#ff5f6d", fontWeight:700 }}>Ksh {withdrawFee}</span>
            </div>
          )}

          <Field label="M-PESA Number" type="tel" value={phone}
            onChange={v => { setPhone(v); setPhoneErr(""); }}
            placeholder="07XX or 254XX" error={phoneErr}/>

          <div style={{ display:"flex", gap:8, marginBottom:"1rem", flexWrap:"wrap" }}>
            {[1000, 2000, 5000, available].filter((v,i,a) => a.indexOf(v)===i && v>=50).map(v => (
              <button key={v} onClick={() => setAmount(String(v))}
                style={{ background:Number(amount)===v?"rgba(0,229,160,0.12)":"#161e2e",
                  border:`1px solid ${Number(amount)===v?"rgba(0,229,160,0.4)":"rgba(255,255,255,0.07)"}`,
                  color:Number(amount)===v?"#00e5a0":"rgba(232,237,245,0.4)",
                  borderRadius:20, padding:"5px 14px", fontSize:12, fontWeight:600 }}>
                {v===available ? "All" : "Ksh "+v}
              </button>
            ))}
          </div>

          <button className="btn-primary" onClick={handleRequest} style={{ width:"100%", height:50 }}>
            Continue to Payment →
          </button>
        </div>
      </div>
    </Shell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE: PROFILE
// ═══════════════════════════════════════════════════════════════════════════════
function ProfilePage() {
  const { user, logout } = useAuth();
  const { navigate } = useRoute();
  const fee = Math.round((user.totalEarned||0) * 0.2);
  const stats = [
    { label:"Total Earned",   value:`Ksh ${user.totalEarned||0}` },
    { label:"Net (after fee)", value:`Ksh ${(user.totalEarned||0) - fee}` },
    { label:"Chats",           value: Math.floor((user.totalEarned||0)/150) },
    { label:"Balance",         value:`Ksh ${user.balance||0}` },
  ];
  return (
    <Shell active="#/profile">
      <div className="anim-fadeup">
        <div style={{ textAlign:"center", marginBottom:"1.8rem", paddingTop:"0.5rem" }}>
          <div style={{ width:80, height:80, borderRadius:"50%",
            background:"linear-gradient(135deg,#00e5a0,#00b87a)",
            display:"flex", alignItems:"center", justifyContent:"center",
            margin:"0 auto 12px", fontSize:36, fontFamily:"Syne", fontWeight:800, color:"#080c14" }}>
            {user.username[0].toUpperCase()}
          </div>
          <h2 style={{ fontSize:22, fontWeight:800 }}>@{user.username}</h2>
          <p style={{ color:"rgba(232,237,245,0.4)", fontSize:13, marginTop:3 }}>{user.email} · {user.country}</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"0.8rem", marginBottom:"1.4rem" }}>
          {stats.map(s => (
            <div key={s.label} className="card" style={{ textAlign:"center", padding:"1rem" }}>
              <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:20, color:"#00e5a0" }}>{s.value}</div>
              <div style={{ fontSize:11, color:"rgba(232,237,245,0.4)", marginTop:3 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div className="card" style={{ marginBottom:"1rem" }}>
          <h3 style={{ fontWeight:700, fontSize:14, marginBottom:"1rem", color:"rgba(232,237,245,0.4)" }}>ACCOUNT DETAILS</h3>
          {[
            ["Username", "@"+user.username],
            ["Email", user.email],
            ["Phone", user.phone],
            ["Country", user.country],
            ["Platform Fee", "20% of total earnings"],
          ].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"0.65rem 0", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ fontSize:13, color:"rgba(232,237,245,0.4)" }}>{k}</span>
              <span style={{ fontSize:13, fontWeight:500 }}>{v}</span>
            </div>
          ))}
        </div>
        <button onClick={() => { logout(); navigate("#/"); }}
          style={{ width:"100%", height:48, background:"rgba(255,95,109,0.1)",
            border:"1px solid rgba(255,95,109,0.25)", color:"#ff5f6d",
            borderRadius:10, fontWeight:700, fontSize:14 }}>
          Sign Out
        </button>
      </div>
    </Shell>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const { route, navigate } = useRoute();
  const [user, setUser] = useState(() => {
    try { const s = sessionStorage.getItem("cnw_user"); return s ? JSON.parse(s) : null; } catch { return null; }
  });

  const auth = {
    user,
    login: (u) => { setUser(u); try { sessionStorage.setItem("cnw_user", JSON.stringify(u)); } catch {} },
    logout: () => { setUser(null); try { sessionStorage.removeItem("cnw_user"); } catch {} navigate("#/"); },
    addEarning: (amt) => setUser(u => {
      const updated = { ...u, totalEarned:(u.totalEarned||0)+amt, balance:(u.balance||0)+amt };
      try { sessionStorage.setItem("cnw_user", JSON.stringify(updated)); } catch {}
      return updated;
    }),
    withdraw: (amt) => setUser(u => {
      const updated = { ...u, balance: Math.max(0,(u.balance||0)-amt) };
      try { sessionStorage.setItem("cnw_user", JSON.stringify(updated)); } catch {}
      return updated;
    }),
  };

  const requireAuth = (Component, props) => {
    if (!user) { setTimeout(() => navigate("#/login"), 0); return null; }
    return <Component {...props}/>;
  };

  let page = null;
  if      (route === "#/" || route === "")      page = user ? (navigate("#/chat"), null) : <LandingPage/>;
  else if (route === "#/register")              page = <RegisterPage/>;
  else if (route === "#/login")                 page = <LoginPage/>;
  else if (route === "#/chat")                  page = requireAuth(ChatListPage);
  else if (route.startsWith("#/chat/"))         page = requireAuth(ChatRoomPage, { userId: route.split("/")[2] });
  else if (route === "#/earnings")              page = requireAuth(EarningsPage);
  else if (route === "#/withdraw")              page = requireAuth(WithdrawPage);
  else if (route === "#/profile")               page = requireAuth(ProfilePage);
  else                                          page = <LandingPage/>;

  return (
    <AuthCtx.Provider value={auth}>
      <style>{G}</style>
      {page}
    </AuthCtx.Provider>
  );
}