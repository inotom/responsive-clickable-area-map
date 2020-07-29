/** @prettier */

const getRatio = (elImg: HTMLImageElement) => elImg.clientWidth / elImg.naturalWidth;

const updateAreaSize = (elImg: HTMLImageElement, elAreas: NodeListOf<HTMLAreaElement>) => {
  const ratio = getRatio(elImg);

  Array.prototype.slice.call(elAreas, 0).forEach((elArea) => {
    const nextCoords = elArea.dataset.origCoords
      ?.split(',')
      .map((v: string) => parseInt(v, 10) * ratio)
      .join(',');
    if (nextCoords) {
      elArea.setAttribute('coords', nextCoords);
    }
  });
};

export const responsiveClickableAreaMap = (imgSelector: string): void => {
  const elImages: NodeListOf<HTMLImageElement> = document.querySelectorAll(imgSelector);

  Array.prototype.slice.call(elImages, 0).forEach((elImg) => {
    const mapName = elImg.getAttribute('usemap')?.slice(1);
    if (!mapName) {
      return;
    }
    const elAreas: NodeListOf<HTMLAreaElement> = document.querySelectorAll(
      `map[name="${mapName}"] area[shape][coords]`
    );

    Array.prototype.slice.call(elAreas, 0).forEach((elArea) => {
      const coords = elArea.getAttribute('coords');
      if (coords) {
        elArea.dataset.origCoords = coords;
      }
    });

    window.addEventListener('resize', () => {
      updateAreaSize(elImg, elAreas);
    });

    updateAreaSize(elImg, elAreas);
  });
};
