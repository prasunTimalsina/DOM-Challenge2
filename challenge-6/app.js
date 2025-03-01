/**
 * Write your challenge solution here
 */

const clockEl = document.querySelector(".clock");
const digitalClockEl = document.querySelector(".digital-clock");
const dateEl = document.querySelector(".date");
const hourHandEl = document.querySelector(".hour");
const minuteHandEl = document.querySelector(".minute");
const secondHandEl = document.querySelector(".second");

/// functions
const initNumbers = () => {
  //init numbers
  for (let i = 1; i <= 12; i++) {
    const timeNumberEl = document.createElement("div");
    timeNumberEl.classList.add("number");
    const span = document.createElement("span");
    span.textContent = `${i}`;
    timeNumberEl.appendChild(span);

    // 360/12 = 30deg
    timeNumberEl.style.setProperty("--rotation", `${30 * i}deg`);
    clockEl.appendChild(timeNumberEl);
  }
};

const updateTimer = () => {
  setInterval(() => {
    const currentTime = new Date();
    const hrs = currentTime.getHours();
    const min = currentTime.getMinutes();
    const sec = currentTime.getSeconds();
    let formatedHrs = String(hrs % 12 === 0 ? 12 : hrs % 12).padStart(2, "0");
    let formatedMin = String(min % 60).padStart(2, "0");
    let formatedSecond = String(sec % 60).padStart(2, "0");
    //Date
    const formatedDate = currentTime.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    // adding AM PM
    /* hrs >= 12
      ? (formatedHrs = formatedHrs + " PM")
      : (formatedHrs = formatedHrs + " AM"); */
    digitalClockEl.textContent = `${formatedHrs}:${formatedMin}:${formatedSecond}`;

    updateHands(formatedHrs, min, sec);
    dateEl.textContent = formatedDate;
  }, 1000);
};

// function to update hand
const updateHands = (hrs, min, sec) => {
  /*  hourHandEl.style.transform = `rotate(${(360 / 12) * hrs}deg)`; */
  secondHandEl.style.transform = `rotate(${((360 / 60) * sec) % 360}deg)`;
  minuteHandEl.style.transform = `rotate(${(360 / 60) * min}deg)`;
  hourHandEl.style.transform = `rotate(${
    (360 / 12) * hrs + (30 / 60) * min
  }deg)`;
};

/// init
initNumbers();
updateTimer();
/* updateHands(1, 0, 0); */
