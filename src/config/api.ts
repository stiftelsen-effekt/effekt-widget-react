let apiUrl;

switch (process.env.NODE_ENV) {
  case "development":
    apiUrl = "https://dev.data.gieffektivt.no";
    break;
  case "stage":
    apiUrl = "https://stage.data.gieffektivt.no";
    break;
  case "production":
    apiUrl = "https://data.gieffektivt.no";
    break;
  default:
    apiUrl = "https://dev.data.gieffektivt.no";
    break;
}

export const API_URL = apiUrl;
