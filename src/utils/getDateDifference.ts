const rtf = new Intl.RelativeTimeFormat("en", {
  localeMatcher: "best fit",
  numeric: "always",
  style: "long",
});

// Return the difference in hours or days
function getDateDifference(fromDate, toDate) {
  let diff = Math.floor((fromDate - toDate) / (1000 * 60 * 60 * 24));
  if (diff > 1) return rtf.format(diff, "day");

  diff = Math.floor((fromDate - toDate) / (1000 * 60 * 60));
  return rtf.format(diff, "hours");
}

export default getDateDifference;
