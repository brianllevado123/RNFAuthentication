/**
 * @format
 */
import 'react-native-gesture-handler';
import {
    en,
    registerTranslation,
} from 'react-native-paper-dates'
registerTranslation('en', {
    save: 'Save',
    selectSingle: 'Select date',
    selectMultiple: 'Select dates',
    selectRange: 'Select period',
    notAccordingToDateFormat: (inputFormat) =>
        `Date format must be ${inputFormat}`,
    mustBeHigherThan: (date) => `Must be later then ${date}`,
    mustBeLowerThan: (date) => `Must be earlier then ${date}`,
    mustBeBetween: (startDate, endDate) =>
        `Must be between ${startDate} - ${endDate}`,
    dateIsDisabled: 'Day is not allowed',
    previous: 'Previous',
    next: 'Next',
    typeInDate: 'Type in date',
    pickDateFromCalendar: 'Pick date from calendar',
    close: 'Close',
});
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
