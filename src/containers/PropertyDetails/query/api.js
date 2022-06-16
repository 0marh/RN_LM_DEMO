import Axios from 'axios';

export async function getPropertyDetails(propertyId) {
  try {
    const propertyDetails = await Axios.get(
      `https://api.limehome.com/properties/v1/public/properties/${propertyId}`,
    );

    console.log('@getPropertyDetails => ', {propertyDetails});

    if (propertyDetails?.data?.success) {
      return propertyDetails.data.payload;
    }

    return propertyDetails;
  } catch (error) {
    console.log('@getPropertyDetails error => ', {error});
    return error;
  }
}
