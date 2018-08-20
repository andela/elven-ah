import httpClient from 'request-promise';
import { } from 'dotenv/config';

class Scan {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  /**
   * @description - This method uploads a text of about 5,000 characters to
   * copyleaks api for plagiarism checks
   * @param {String} scanText - The text to be scanned
   */
  uploadScan(scanText) {
    return new Promise((resolve, reject) => {
      httpClient({
        uri: 'https://api.copyleaks.com/v1/businesses/create-by-text',
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization: `Bearer ${this.accessToken}`,
        },
        body: scanText,
        json: true,
      })
        .then((response) => {
          setTimeout(() => {
            resolve(response.ProcessId);
          }, 20000);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @description - Checks the result of a scanning process
   * @param {Number} processId - The process id of a scan whose result is to be retrieved
   */
  checkResult(processId) {
    return new Promise((resolve, reject) => {
      httpClient({
        uri: `https://api.copyleaks.com/v2/businesses/${processId}/result`,
        method: 'GET',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization: `Bearer ${this.accessToken}`,
        },
        json: true,
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

export default Scan;
