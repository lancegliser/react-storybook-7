export const getTriangularNumber = (seed: number) => (seed * (seed + 1)) / 2;

export const delayForCanvas = async (canvasElement: HTMLElement) => {
  let backOff = 0;
  while (!canvasElement.innerHTML) {
    backOff += 1;
    if (backOff > 100) {
      throw new Error(
        "canvasElement.innerHTML did not populate after 100 increasing delays"
      );
    }
    // eslint-disable-next-line no-loop-func
    await new Promise((resolve) =>
      setTimeout(resolve, getTriangularNumber(backOff))
    );
  }
};
