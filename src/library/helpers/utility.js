/**
 * Global GET Api Call Function
 * @param {* Api Url} endPoint
 */
export async function getApi(endPoint) {
  let finalEndPoint = endPoint ? endPoint : "";
  var apiResponse = await fetch(finalEndPoint, {
    method: "get",
  })
    .then(function (response) {
      return response.json();
    })
    .catch((err) => {
      console.error("Fetch Get ERROR:", err);
    });
  if (apiResponse) {
    //    console.log("finalEndPoint1111111", apiResponse);
    return apiResponse;
  } else {
    return {};
  }
}
