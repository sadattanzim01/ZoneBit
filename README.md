# <img width="35" height="35" alt="img" src="https://github.com/user-attachments/assets/67ca52a7-b61f-44de-88b3-27d49c55ef14"> ZoneBit

> *Find your timezone, bit by bit.*

A timezone city-finder app that uses **24-bit bitmasks** and **bitwise AND operations** to match world capital cities to GMT offsets — no traditional `===` comparisons anywhere in the search logic.

🔗 **Live Demo:** [sadattanzim01.github.io/ZoneBit](https://sadattanzim01.github.io/ZoneBit/)

---

## What Is ZoneBit? <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20Shrugging.png" alt="Man Shrugging" width="30" height="30">

ZoneBit is a browser-based app that lets you search for world capital cities by their GMT timezone offset. Type in a GMT value like `-4` or `+9`, hit **Find Cities**, and the app instantly returns every capital city in that timezone.

What makes it different from a simple filter is *how* it finds the matches. Instead of looping through cities and comparing `city.gmt === searchOffset`, ZoneBit encodes every city's timezone as a **binary number** and uses a **bitwise AND (`&`)** operation to determine matches. This is the same technique used in low-level systems programming, permission flags, and network masks — applied here in a clean, visual way.

---

## Why Is This Useful? <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Alarm%20Clock.png" alt="Alarm Clock" width="30" height="30">

### As a learning tool
Most developers never move beyond `if/else` and `===` for conditional logic. ZoneBit demonstrates a fundamentally different approach: encoding state as bits and evaluating conditions with bitwise operations. This technique scales to hundreds or thousands of conditions without performance degradation — something long chains of if-statements can't do.

### As a reference app
With 190+ world capitals across 8 regions, ZoneBit is a genuinely useful timezone reference. You can instantly answer questions like:
- *"Which capitals share my timezone?"*
- *"Which capitals are NOT in GMT +2?"*
- *"How many cities are in the GMT -5 zone?"*

### As a portfolio project
This project demonstrates understanding of binary number systems, bitwise operators, DOM manipulation, and clean UI design — all in vanilla HTML/CSS/JS with zero dependencies.

---

## How the Bit Mask Logic Works <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Link.png" alt="Link" width="30" height="30">

### The core idea
There are 25 possible GMT offsets (-12 to +12). ZoneBit maps each offset to a **bit position** in a 24-bit number:

```
bit position = GMT offset + 12

GMT -12  →  bit 0
GMT  0   →  bit 12
GMT +3   →  bit 15
GMT +9   →  bit 21
```

Each city is assigned a 24-bit integer with **exactly one bit turned ON** — the bit that corresponds to its GMT offset:

```
Moscow  (GMT +3)  →  bit 15  →  000000000100000000000000
Paris   (GMT +2)  →  bit 14  →  000000000010000000000000
New York(GMT -4)  →  bit  8  →  000000000000000100000000
Tokyo   (GMT +9)  →  bit 21  →  000000100000000000000000
```

### The search
When you search for a GMT offset, a **search mask** is built the same way — a 24-bit number with one bit ON at the target position. Then bitwise AND is applied against every city:

```
Searching for GMT +2 (bit 14):
searchMask = 000000000010000000000000

Paris.bits  = 000000000010000000000000
Paris & mask = 000000000010000000000000  → non-zero → MATCH ✓

Moscow.bits = 000000000100000000000000
Moscow & mask = 000000000000000000000000 → zero → NO MATCH ✗
```

### The code
```js
// Each city gets a bitmask based on its GMT offset
function createCityMask(offset) {
  return 1 << (offset + 12);
}

// Search uses bitwise AND — no === anywhere
function findCities(searchOffset, invert = false) {
  const searchMask = createCityMask(searchOffset);
  return cities.filter(city => {
    const match = (city.bits & searchMask) !== 0;
    return invert ? !match : match;
  });
}
```

The `invert` flag powers the **"NOT in GMT"** bonus feature — it flips the result so you get every city that does *not* share that timezone.

---

## Features <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Crystal%20Ball.png" alt="Crystal Ball" width="30" height="30">

- 🌍 **190+ world capitals** organized across 8 regions
- 🗂️ **Collapsible region sections** — Europe, North America, South America, Africa, Middle East, Central Asia, East & Southeast Asia, Oceania
- 🔍 **GMT offset search** — find all cities in a given timezone
- 🔄 **Inverted search** — find all cities NOT in a given timezone
- 📊 **Live result count** — shows how many cities matched
- ⌨️ **Keyboard support** — press Enter to search
- 💡 **Built-in explainer panel** — shows the bit logic visually inside the app
- 📱 **Responsive layout** — works on mobile and desktop

---

## Cities Covered <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Globe%20Showing%20Asia-Australia.png" alt="Globe Showing Asia-Australia" width="30" height="30">

| Region | Count |
|--------|-------|
| Europe | 45 |
| North America | 24 |
| South America | 14 |
| Africa | 55 |
| Middle East | 14 |
| Central Asia | 16 |
| East & Southeast Asia | 17 |
| Oceania | 15 |
| **Total** | **200** |

---

## Project Structure <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Chains.png" alt="Chains" width="30" height="30">

```
ZoneBit/
├── index.html    — Page structure and layout
├── style.css     — Dark terminal aesthetic, responsive grid
├── script.js     — Bit mask logic, city data, DOM rendering
└── img.png       — ZoneBit logo / favicon
```

---

## How It Was Built <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Hammer%20and%20Wrench.png" alt="Hammer and Wrench" width="30" height="30">

### Step 1 — Data modelling
Each city was assigned a GMT offset integer. A helper function converts that integer to a bit position and uses the left shift operator (`<<`) to generate a unique 24-bit bitmask per city.

### Step 2 — Search logic
Rather than comparing offsets with `===`, a search mask is created for the target GMT value. Bitwise AND (`&`) between a city's bitmask and the search mask returns non-zero only when they share the same bit — confirming a timezone match.

### Step 3 — UI
Built with vanilla HTML, CSS, and JavaScript — no frameworks or libraries. The city list is dynamically rendered from a JavaScript object organized by region, with collapsible sections built using CSS `max-height` transitions. The output panel fades in on search using CSS class toggling.

### Step 4 — Styling
Dark terminal aesthetic using `Courier New` monospace font, a `#00ff9d` green accent, and a two-column responsive grid layout that collapses to single column on mobile.

---

## Running Locally <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Desktop%20Computer.png" alt="Desktop Computer" width="30" height="30">

No build step or dependencies required. Just clone and open:

```bash
git clone https://github.com/sadattanzim01/ZoneBit.git
cd ZoneBit
open index.html
```

Or drag `index.html` directly into any browser.

---

## References <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Bookmark%20Tabs.png" alt="Bookmark Tabs" width="30" height="30">

- [World Time Zones — greenwichmeantime.com](https://greenwichmeantime.com/time-zone/definition/)
- [Bitwise Operators — MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)
- [App Ideas Collection](https://github.com/florinpop17/app-ideas) — Tier 2 Intermediate challenge
