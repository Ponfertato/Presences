const presence = new Presence({
    clientId: "858934458522796042"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "large_image",
    startTimestamp: browsingStamp,
    buttons: [
      { label: document.title, url: document.location.href }
    ]
  },
    appGame = document.getElementById("app-game").hidden;

  if (document.location.pathname === "/" && appGame === true) {
    // Pony Town Homepage
    presenceData.details = "Viewing At Home Page";
    presenceData.smallImageKey = "home-solid_white";
  } else if (document.location.pathname === "/help") {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Help";
    presenceData.smallImageKey = "question-circle-solid_white";
  } else if (document.location.pathname === "/about") {
    presenceData.details = "Viewing Page:";
    presenceData.state = "About";
    presenceData.smallImageKey = "info-circle-solid_white";
  } else if (document.location.pathname === "/character") {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Characters";
    presenceData.smallImageKey = "horse-head-solid_white";
  } else if (document.location.pathname === "/account") {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Account";
    presenceData.smallImageKey = "user-solid_white";
  }

  if (document.location.pathname === "/" && appGame === false) {
    // Pony Town in Game
    const onlineStatus = document.querySelector(
      'ui-button.dropdown-toggle.no-arrow.unselectable.status-button'
    ).getAttribute("title");
    //let partyIsland = document.getElementsByClassName('building-box')[0].hidden;
    //let currentServer = await document.querySelector(<any>'div.dropdown-header.d-flex.justify-content-between.mb-1 > span').innerText;
    presenceData.details = "Plays on the server";
    presenceData.state = "Current status:" + onlineStatus.replace(/(Status)|[|]/g, "");
    presenceData.smallImageKey = "play-circle-solid_white";
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);

});