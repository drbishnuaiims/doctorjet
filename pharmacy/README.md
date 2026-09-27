# Pharmacy Profile — Doctor Consultation

A production-ready, dependency-free pharmacy + doctor consultation webpage built with HTML5, CSS3 and vanilla JavaScript.

## Files

- `index.html` — page structure
- `css/style.css` — responsive design system
- `js/app.js` — pharmacy configuration, doctors, filters, booking modal, time-slot generation and WhatsApp routing
- `assets/logo.svg` — demo pharmacy logo
- `assets/doctors/` — demo doctor illustrations

## 1. Change pharmacy details

Open `js/app.js` and edit:

```js
const pharmacyConfig = {
  name: "Your Pharmacy",
  tagline: "Your tagline",
  logo: "assets/logo.svg",
  phone: "+91 ...",
  whatsapp: "91XXXXXXXXXX",
  address: "Your full address",
  city: "Your city",
  state: "Your state",
  pincode: "000000",
  openingHours: "8:00 AM – 10:00 PM",
  consultationHours: "By appointment",
  mapsUrl: "https://maps.google.com/?q=...",
  websiteUrl: "https://..."
};
```

The WhatsApp number must contain digits only, including country code. For India use `91` followed by the 10-digit number.

## 2. Add or remove doctors

Edit the `doctors` array in `js/app.js`.

Each doctor supports:

- name
- qualification
- specialty
- experience
- photo
- languages
- consultationMode
- fee
- availability
- doctor-specific WhatsApp number
- bio
- slotDuration
- availabilitySchedule

Example schedule:

```js
availabilitySchedule: [
  { day: "Monday", start: "17:00", end: "19:00" },
  { day: "Wednesday", start: "17:00", end: "19:00" }
]
```

The page automatically generates consultation slots based on `slotDuration`.

## 3. Doctor-specific WhatsApp routing

Leave:

```js
whatsapp: ""
```

to route requests to the pharmacy WhatsApp.

Or specify:

```js
whatsapp: "919876543210"
```

to route that doctor's requests directly to their WhatsApp.

## 4. Doctor photos

Replace the demo SVGs in `assets/doctors/` with real photos.

Recommended:
- 600 × 600 px or larger
- square image
- JPG/WebP
- professional headshot
- consistent crop

Update the `photo` field in the doctor object if using another filename.

## 5. Consultation slots

Example:

```js
slotDuration: 30,
availabilitySchedule: [
  { day: "Monday", start: "17:00", end: "19:00" }
]
```

This produces:
- 5:00 PM
- 5:30 PM
- 6:00 PM
- 6:30 PM

The endpoint itself is not offered as a bookable slot unless another backend later confirms it. The WhatsApp workflow is a request flow, not real-time appointment confirmation.

## 6. Important privacy limitation

This is a frontend-only application.

It does not:
- store patient information
- use localStorage for patient information
- send data to a server
- confirm appointments automatically

The patient's browser opens WhatsApp with a pre-filled message. The patient must send that message.

For production deployment, ensure your pharmacy's privacy notice and WhatsApp communication practices comply with applicable law and organizational policy.

## 7. Deployment

The project can be hosted as static files on:

- GitHub Pages
- Netlify
- Vercel
- any standard web host

No build command is required.

## 8. Future multi-pharmacy architecture

The frontend is deliberately configuration-driven. A later platform version can replace the local `pharmacyConfig` and `doctors` objects with API/database data without redesigning the booking UI.

Possible future route:

`/pharmacy/abc-pharmacy`

The same frontend can then render a different pharmacy profile based on the URL slug.
