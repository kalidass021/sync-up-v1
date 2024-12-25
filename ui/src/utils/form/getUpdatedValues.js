const getUpdatedValues = (originalData, updatedData) => {
  // function to filter out unchanged values
  const changedValues = {};
  Object.keys(updatedData).forEach((key) => {
    if (updatedData[key] !== originalData[key] && updatedData[key] !== '') {
      changedValues[key] = updatedData[key];
    }
  });

  return changedValues;
};

export default getUpdatedValues;
