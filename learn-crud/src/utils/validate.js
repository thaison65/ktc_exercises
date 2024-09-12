const validationValueTypeofString = (value) => {
  if (!!value) {
    throw new Error("Value cannot be empty");
  }
};

const validationPhoneNumber = (phone) => {
  if (phone.length > 8 || phone.length < 12) {
    throw new Error("Phone number should be between 8 and 12 digits");
  }
};

export { validationValueTypeofString, validationPhoneNumber };
