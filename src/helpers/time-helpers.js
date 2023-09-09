function format(num) {
  return String(100 + num).substring(1);
}

export function hoursFromSeconds(seconds) {
  const h = format(Math.floor(seconds / 3600));
  const m = format(Math.round(seconds % 3600 / 60));
  return {
    h,
    m
  };
}