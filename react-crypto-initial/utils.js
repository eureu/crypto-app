export function percentDifference(assetPrice, coinPrice) {
  return (
    (100 * Math.abs(assetPrice - coinPrice)) /
    ((coinPrice + assetPrice) / 2)
  ).toFixed(2);
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}
