import Axios from 'axios';

export async function getCityProperties(cityId) {
  try {
    const cityPropertiesList = await Axios.get(
      `https://api.limehome.com/properties/v1/public/properties/?cityId=${cityId}`,
    );

    if (cityPropertiesList?.data?.success) {
      return cityPropertiesList.data.payload;
    }

    return cityPropertiesList;
  } catch (error) {
    console.log('@getCityProperties error => ', {error});
    return error;
  }
}
