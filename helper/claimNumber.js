const genrateClaimNumber = async (claimNumber) => {
  try {
    let date = Date.now();
    let currentDate = new Date(date);
    let localdatestring = currentDate.toLocaleDateString();
    currentDate = localdatestring.split("/");
    currentDate = currentDate.reverse();
    if (currentDate[1] < 10) {
      currentDate[1] = 0 + currentDate[1];
    }
    if (currentDate[2] < 10) {
      currentDate[2] = 0 + currentDate[2];
    }
    currentDate = currentDate.join("");
    if (claimNumber) {
      let splitdata = claimNumber.slice(8, 13);
      splitdata++;
      splitdata = splitdata.toString();
      splitdata = splitdata.padStart(5, "0");

      return currentDate + splitdata;
    } else {
      return currentDate + "00001";
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = genrateClaimNumber
