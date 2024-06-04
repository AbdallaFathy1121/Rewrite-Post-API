// Helper function to calculate the expiration date
const calculateExpirationDate = (expiresIn) => {
  // Extract the numeric part of the duration
  const durationValue = parseInt(expiresIn);

  // Extract the unit of time from the duration
  const durationUnit = expiresIn.slice(-1);

  // Calculate the expiration date based on the duration
  const currentDate = new Date();
  let expirationDate;

  switch (durationUnit) {
    case "d":
      expirationDate = new Date(
        currentDate.setDate(currentDate.getDate() + durationValue)
      );
      break;
    case "h":
      expirationDate = new Date(
        currentDate.setTime(
          currentDate.getTime() + durationValue * 60 * 60 * 1000
        )
      );
      break;
    case "m":
      expirationDate = new Date(
        currentDate.setTime(currentDate.getTime() + durationValue * 60 * 1000)
      );
      break;
    case "s":
      expirationDate = new Date(
        currentDate.setTime(currentDate.getTime() + durationValue * 1000)
      );
      break;
    default:
      throw new Error("Invalid duration unit");
  }

  return expirationDate;
};

module.exports = {
  calculateExpirationDate: calculateExpirationDate,
};
