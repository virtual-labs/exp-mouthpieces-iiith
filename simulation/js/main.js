let sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

let arrayRemove = (arr, value) => {
  return arr.filter(function (ele) {
    return ele != value;
  });
};

let ids = ["long-1", "container-1", "curve", "long-2", "container-2"];
let aids = ["curve-start"]; // Ids used in asynchrnous animation function

let asyncMove = async (id, curPosition = 0, finalPosition = 1) => {
  let path = document.getElementById(id);
  while (true) {
    let speed2 = document.getElementById("water-flow").value;
    speed2 = speed2 * 0.0002;
    speed2 = speed2 == 0 ? 0.0002 : speed2;
    // For Moving water in all seven pipes asynchronusly
    if (curPosition > finalPosition) break;
    curPosition += speed2;
    path.setAttribute("offset", curPosition);
    await sleep(0.5);
  }
};

let animation = async () => {
  for (let i = 0; i < ids.length; i++) {
    let id = ids[i];
    let path = document.getElementById(id);
    let finalPosition = 1;
    let curPosition = 0;
    let flag = true;
    while (true) {
      let speed2 = document.getElementById("water-flow").value;
      speed2 = speed2 * 0.0002;
      speed2 = speed2 == 0 ? 0.0002 : speed2;
      if (curPosition > finalPosition) break;
      if (id == "container-1" && curPosition > 0.4 && flag) {
        flag = false;
        asyncMove("curve-start");
      }
      curPosition += speed2;
      path.setAttribute("offset", curPosition);
      await sleep(2);
    }
  }
};

let resetEverything = () => {
  aids.forEach((id) => {
    let path = document.getElementById(id);
    path.setAttribute("offset", 0);
  });
  ids.forEach((id) => {
    let path = document.getElementById(id);
    path.setAttribute("offset", 0);
  });
};

let startAnimation = async () => {
  resetEverything();
  document.getElementById("startbutton").disabled = true;
  document.getElementById("resetbutton").disabled = true;
  await animation();
  document.getElementById("startbutton").disabled = false;
  document.getElementById("resetbutton").disabled = false;
};
