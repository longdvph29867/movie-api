import errorMessage from "../config/error.js";

class CountriesCotroller {
  async getAll(req, res) {
    try {
      const response = await fetch(
        "https://countrycode.org/api/countryCode/countryMenu"
      );
      const data = await response.json();
      res.send(data);
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }
}

export default new CountriesCotroller();
