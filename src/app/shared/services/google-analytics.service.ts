import { Injectable } from '@angular/core';
declare var gtag;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor() {}
  /**
   * @param {string} eventName
   * @param {Object} eventData
   * @memberof GoogleAnalyticsService
   * @description This function is used to send the event to google analytics
   */
  generateEvent(eventName: string, eventData: object): void {
    console.log('eventName ', eventName);
    gtag('event', eventName, eventData);
  }

  generateEventError(error) {
    console.log('error ', error);
    gtag('event', 'error', {
      event_category: 'error',
      event_label: error?.message ?? '',
      value: error?.status ?? '',
      ...Object.keys(error).reduce((acc, key) => {
        acc[key] =
          typeof error[key] !== 'object'
            ? error[key]
            : JSON.stringify(error[key]);
        return acc;
      }, {}),
    });
  }
}
