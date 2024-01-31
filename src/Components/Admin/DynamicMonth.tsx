type propsType = {
  totalPreviousMonthsIncCurrent: number;
};


export const DynamicMonthNew = ({
  totalPreviousMonthsIncCurrent,
}: propsType) => {
  const Allmonths = [
    "January", // 0
    "February", // 1
    "March", // 2
    "April", // 3
    "May", // 4
    "June", // 5
    "July", // 6
    "August", // 7
    "September", // 8
    "October", // 9
    "November", // 10
    "December", // 11
  ];

  const dynamicMonthData = [];
  let currentMonth = new Date();
  let monthDiff = currentMonth.getMonth() - (totalPreviousMonthsIncCurrent - 1);
  if (monthDiff < 0) {
    monthDiff = monthDiff + 12;
  }

  for (let i = 0; i < totalPreviousMonthsIncCurrent; i++) {
    if (monthDiff >= 12) {
      monthDiff = 0;
    }
    dynamicMonthData.push(Allmonths[monthDiff]);
    monthDiff++;
  }

 return dynamicMonthData;
};

