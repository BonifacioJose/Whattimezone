import axios from 'axios'
import X2JS from 'x2js'

var x2js = new X2JS();
const API_KEY = "ISZ7QC8KV9KB";
const timezonedb = axios.create({
    baseURL: 'http://api.timezonedb.com/v2'
})

export default {

    getTimezones(callback) {
        timezonedb.get('/list-time-zone', {
            params: {
              key: API_KEY
            }
          })
          .then(function (response) {
            return callback(x2js.xml2js(response.data).result.zones.zone);
          })
          .catch(function (error) {
            return callback(error)
          })
    },
    getTimezoneByFieldAndValue({field, value}, callback) {
        timezonedb.get('/get-time-zone', {
            params: {
              key: API_KEY,
              by: field,
              [field]: value
            }
          })
          .then(function (response) {
            return callback(x2js.xml2js(response.data).result);
          })
          .catch(function (error) {
            return callback(error)
          })
    }

}