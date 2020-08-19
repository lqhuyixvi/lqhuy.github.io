// JavaScript Documentconst navClassName = "nav";
const navClassName = "nav";
const navLinkClassName = `${navClassName}__link`;
const navLineClassName = `${navClassName}__line`;
const activeLinkClassName = `${navLinkClassName}--active`;

const navLine = document.querySelector(`.${navLineClassName}`);
const navLinks = document.querySelectorAll(`.${navLinkClassName}`);
const getActiveLink = () => document.querySelector(`.${activeLinkClassName}`);

const setLinkActive = (link) => link.classList.add(activeLinkClassName);
const setLinkInactive = (link) => link.classList.remove(activeLinkClassName);

const getItemDimentions = (item) => item && item.getBoundingClientRect();

const moveLineToItem = (item) => {
  const linkOffset = item.offsetLeft;
  const linkWidth = item.scrollWidth;

  relocateLine(linkOffset, linkWidth);
};

const relocateLine = (leftOffset, width) => {
  navLine.style.transform = `translateX(${leftOffset}px) scaleX(${width})`;
};

// Function created just for the sake of not duplicating code for a certain events :)
HTMLElement.prototype.addEventListeners = function (
  events = [],
  callback = () => {}
) {
  events.forEach((event) => this.addEventListener(event, callback));
};

const activeLinkOnPageLoad = getActiveLink();
activeLinkOnPageLoad && moveLineToItem(activeLinkOnPageLoad);

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    const currentlyActiveLink = getActiveLink();
    setLinkInactive(currentlyActiveLink);

    setLinkActive(navLink);
    moveLineToItem(navLink);
  });

  navLink.addEventListeners(["mouseover", "focus"], () => {
    moveLineToItem(navLink);
  });

  navLink.addEventListeners(["blur", "mouseout"], () => {
    const currentlyActiveLink = getActiveLink();
    moveLineToItem(currentlyActiveLink);
  });
});
