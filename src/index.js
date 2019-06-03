/** @prettier */

const getRatio = elImg => elImg.clientWidth / elImg.naturalWidth;

const updateAreaSize = (elImg, elAreas) => {
  const ratio = getRatio(elImg);

  Array.from(elAreas, elArea => {
    const nextCoords = elArea.dataset.origCoords
      .split(',')
      .map(v => parseInt(v, 10) * ratio)
      .join(',');
    elArea.setAttribute('coords', nextCoords);
  });
};

export const responsiveClickableAreaMap = imgSelector => {
  const elImages = document.querySelectorAll(imgSelector);

  Array.from(elImages, elImg => {
    const mapName = elImg.getAttribute('usemap').slice(1);
    const elAreas = document.querySelectorAll(
      `map[name="${mapName}"] area[shape][coords]`
    );

    Array.from(elAreas, elArea => {
      elArea.dataset.origCoords = elArea.getAttribute('coords');
    });

    window.addEventListener('resize', () => {
      updateAreaSize(elImg, elAreas);
    });

    updateAreaSize(elImg, elAreas);
  });
};
