const query = document.querySelector("#query");
const results = document.querySelector("#results");

const selection = document.querySelector("#selection");
const divs = document.querySelectorAll("#results > div");
let ul = document.querySelector("#results > div.active > ul");
ul.innerHTML = "";

const startSearch = document.querySelector("#search");
const loadMore = document.querySelector("#load-more");
const loadLimit = document.querySelector("#load-limit");
const loadLimitDisplay = document.querySelector("#load-limit-disp");

const errorMsg = document.querySelector("#error-msg");

let searchYTMButton;

selection.addEventListener("change", function () {
    const selectedValue = selection.value;
    errorMsg.innerText = "";

    divs.forEach((div) => {
        if (div.id === selectedValue) {
            div.classList.add("active");
            document.querySelectorAll(".loader").forEach((loader) => {
                loader.remove();
            });
            for (let i = 0; i < 20; i++) {
                const loader = document.createElement("div");
                loader.classList.add("loader");
                loader.classList.add("hidden");
                loader.innerHTML = `<svg
  role="img"
  width="280"
  height="120"
  aria-labelledby="loading-aria"
  viewBox="0 0 280 120"
  preserveAspectRatio="none"
>
  <title id="loading-aria">Loading...</title>
  <rect
    x="0"
    y="0"
    width="100%"
    height="100%"
    clip-path="url(#clip-path)"
    style='fill: url("#fill");'
  ></rect>
  <defs>
    <clipPath id="clip-path">
        <rect x="470" y="225" rx="3" ry="3" width="410" height="6" /> 
        <rect x="480" y="231" rx="3" ry="3" width="380" height="6" /> 
        <rect x="464" y="237" rx="3" ry="3" width="178" height="6" /> 
        <circle cx="580" cy="141" r="20" /> 
        <rect x="515" y="226" rx="0" ry="0" width="116" height="9" /> 
        <rect x="504" y="200" rx="0" ry="0" width="120" height="48" /> 
        <rect x="349" y="208" rx="0" ry="0" width="405" height="58" /> 
        <rect x="516" y="214" rx="0" ry="0" width="135" height="49" /> 
        <circle cx="580" cy="117" r="16" /> 
        <rect x="539" y="148" rx="0" ry="0" width="161" height="5" /> 
        <rect x="126" y="6" rx="6" ry="6" width="140" height="12" /> 
        <rect x="9" y="6" rx="4" ry="4" width="100" height="100" /> 
        <rect x="126" y="32" rx="5" ry="5" width="83" height="10" /> 
        <rect x="561" y="187" rx="0" ry="0" width="84" height="9" />
    </clipPath>
    <linearGradient id="fill">
      <stop
        offset="0.599964"
        stop-color="#cccccc"
        stop-opacity="1"
      >
        <animate
          attributeName="offset"
          values="-2; -2; 1"
          keyTimes="0; 0.25; 1"
          dur="2s"
          repeatCount="indefinite"
        ></animate>
      </stop>
      <stop
        offset="1.59996"
        stop-color="#ffffff"
        stop-opacity="1"
      >
        <animate
          attributeName="offset"
          values="-1; -1; 2"
          keyTimes="0; 0.25; 1"
          dur="2s"
          repeatCount="indefinite"
        ></animate>
      </stop>
      <stop
        offset="2.59996"
        stop-color="#cccccc"
        stop-opacity="1"
      >
        <animate
          attributeName="offset"
          values="0; 0; 3"
          keyTimes="0; 0.25; 1"
          dur="2s"
          repeatCount="indefinite"
        ></animate>
      </stop>
    </linearGradient>
  </defs>
                </svg>`;
                div.appendChild(loader);
                ul = document.querySelector("#results > div.active > ul");
            }
        } else {
            div.classList.remove("active");
        }
    });
});

let offset = 0;
loadMore.addEventListener("click", function () {
    offset += 20;
    startSearch.click();
});

// Initialisierung basierend auf der aktuellen Auswahl
const initialSelectedValue = selection.value;
divs.forEach((div) => {
    if (div.id === initialSelectedValue) {
        div.classList.add("active");
        for (let i = 0; i < 20; i++) {
            const loader = document.createElement("div");
            loader.classList.add("loader");
            loader.classList.add("hidden");
            loader.innerHTML = `<svg
  role="img"
  width="280"
  height="120"
  aria-labelledby="loading-aria"
  viewBox="0 0 280 120"
  preserveAspectRatio="none"
>
  <title id="loading-aria">Loading...</title>
  <rect
    x="0"
    y="0"
    width="100%"
    height="100%"
    clip-path="url(#clip-path)"
    style='fill: url("#fill");'
  ></rect>
  <defs>
    <clipPath id="clip-path">
        <rect x="470" y="225" rx="3" ry="3" width="410" height="6" /> 
        <rect x="480" y="231" rx="3" ry="3" width="380" height="6" /> 
        <rect x="464" y="237" rx="3" ry="3" width="178" height="6" /> 
        <circle cx="580" cy="141" r="20" /> 
        <rect x="515" y="226" rx="0" ry="0" width="116" height="9" /> 
        <rect x="504" y="200" rx="0" ry="0" width="120" height="48" /> 
        <rect x="349" y="208" rx="0" ry="0" width="405" height="58" /> 
        <rect x="516" y="214" rx="0" ry="0" width="135" height="49" /> 
        <circle cx="580" cy="117" r="16" /> 
        <rect x="539" y="148" rx="0" ry="0" width="161" height="5" /> 
        <rect x="126" y="6" rx="6" ry="6" width="140" height="12" /> 
        <rect x="9" y="6" rx="4" ry="4" width="100" height="100" /> 
        <rect x="126" y="32" rx="5" ry="5" width="83" height="10" /> 
        <rect x="561" y="187" rx="0" ry="0" width="84" height="9" />
    </clipPath>
    <linearGradient id="fill">
      <stop
        offset="0.599964"
        stop-color="#cccccc"
        stop-opacity="1"
      >
        <animate
          attributeName="offset"
          values="-2; -2; 1"
          keyTimes="0; 0.25; 1"
          dur="2s"
          repeatCount="indefinite"
        ></animate>
      </stop>
      <stop
        offset="1.59996"
        stop-color="#ffffff"
        stop-opacity="1"
      >
        <animate
          attributeName="offset"
          values="-1; -1; 2"
          keyTimes="0; 0.25; 1"
          dur="2s"
          repeatCount="indefinite"
        ></animate>
      </stop>
      <stop
        offset="2.59996"
        stop-color="#cccccc"
        stop-opacity="1"
      >
        <animate
          attributeName="offset"
          values="0; 0; 3"
          keyTimes="0; 0.25; 1"
          dur="2s"
          repeatCount="indefinite"
        ></animate>
      </stop>
    </linearGradient>
  </defs>
            </svg>`;
            div.appendChild(loader);
        }
    }
});
const lastQuery = [];

startSearch.addEventListener("click", async function () {
    errorMsg.innerText = "";

    const type = selection.value;
    if (query.value === "") {
        query.placeholder = "Bitte Ausfüllen!";
        return;
    }

    const savedQuery = query.value;
    query.focus();
    query.select();

    lastQuery.push(savedQuery);
    if (lastQuery[0] !== query.value) {
        offset = 0;
        ul.innerHTML = "";
        lastQuery.shift();
    }

    document.querySelectorAll(".loader").forEach((loader) => {
        loader.classList.remove("hidden");
    });

    const response = await fetch(
        `http://localhost:3000/${type}?query=${savedQuery}&offset=${offset}&limit=20`,
        {
            method: "POST",
        }
    ).catch(() => {
        errorMsg.innerText = "Fehler beim Senden der Anfrage!";
        return;
    });

    const data = await response.json();

    if (data.length === 0) {
        let err = "Keine Ergebnisse gefunden!";
        if (offset > 0) {
            err = "Keine weiteren Ergebnisse gefunden!";
        }
        setTimeout(() => {
            errorMsg.innerText = err;
            document.querySelectorAll(".loader").forEach((loader) => {
                loader.classList.add("hidden");
            });
            query.value = "";
            query.focus();
            loadMore.disabled = true;
        }, 1000);
        return;
    }

    loadMore.disabled = false;
    data.forEach((item) => {
        ul.appendChild(generateFields(item, type));
    });
});

function generateFields(data, type) {
    setTimeout(() => {
        if (data === undefined) {
            errorMsg.innerText = "Fehler beim Senden der Anfrage!";
        }
    }, 3000);

    const li = document.createElement("li");
    li.classList.add("hide");
    setTimeout(() => {
        li.classList.remove("hide");
        document.querySelectorAll(".loader").forEach((loader) => {
            loader.classList.add("hidden");
        });
    }, 1000);

    const img = document.createElement("img");
    if (data.image === undefined) {
        img.src = "../images/defaultIcon.png";
    } else img.src = data.image;
    img.loading = "lazy";
    li.appendChild(img);

    const body = document.createElement("div");
    body.classList.add("body");
    li.appendChild(body);

    const name = document.createElement("h1");
    name.classList.add("name");
    name.innerText = data.name;
    body.appendChild(name);

    const artist = document.createElement("h2");
    artist.classList.add("artist");
    artist.innerText = data.artist;
    body.appendChild(artist);

    const link = document.createElement("a");
    link.href = data.external;

    switch (type) {
        case "playlist":
            link.innerText = "Link zur Playlist";
            break;
        case "song":
            link.innerText = "Link zum Song";
            searchYTMButton = document.createElement("button");
            searchYTMButton.classList.add("btn");
            searchYTMButton.id = "search-ytm";
            searchYTMButton.title = "Suche auf YouTube Music";
            li.appendChild(searchYTMButton);
            searchYTM();
            break;
        case "album":
            link.innerText = "Link zum Album";
            break;
        case "artist":
            link.innerText = "Link zum Künstler";
            img.classList.add("artist-img");
            break;
    }
    body.appendChild(link);

    return li;
}

function searchYTM() {
    searchYTMButton.addEventListener("click", function () {
        const query = this.parentElement.querySelector(".name").innerText;
        const artist = this.parentElement.querySelector(".artist").innerText;

        fetch(`http://localhost:3000/search?query=${query}&artist=${artist}`, {
            method: "POST",
        }).then((response) => {
            response.json().then((data) => {
                errorMsg.innerText = "";
                if (data.videoId === "notfound") {
                    errorMsg.innerText = "Auf YouTube Music nicht vorhanden!";
                    return;
                }
                const url = `https://music.youtube.com/watch?v=${data.videoId}`;
                window.open(url, "_blank");
            });
        });
    });
}
