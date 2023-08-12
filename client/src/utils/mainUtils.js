export function calculateTimeAgo(dateFromAPI) {
  const now = new Date();
  const datefromAPITimeStamp = new Date(dateFromAPI).getTime();
  const nowTimeStamp = now.getTime();

  const microSecondsDiff = Math.abs(datefromAPITimeStamp - nowTimeStamp);

  // Math.round is used instead of Math.floor to account for certain DST cases
  // Number of milliseconds per day =
  //   24 hrs/day * 60 minutes/hour * 60 seconds/minute * 1000 ms/second
  const daysDiff = Math.round(microSecondsDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (microSecondsDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (microSecondsDiff % (1000 * 60 * 60)) / (1000 * 60)
  );
  return { days: daysDiff, hours: hours, minutes: minutes };
}
