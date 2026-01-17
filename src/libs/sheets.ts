import { google } from 'googleapis';

const target = ['https://www.googleapis.com/auth/spreadsheets'];
const jwt = new google.auth.JWT({
  email: import.meta.env.VITE_SERVER_GOOGLE_SHEETS_CLIENT_EMAIL,
  key: (import.meta.env.VITE_SERVER_GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  scopes: target,
});
const SheetsService = google.sheets({ version: 'v4', auth: jwt });

const SheetTarget = {
  spreadsheetId: import.meta.env.VITE_SERVER_GOOGLE_SHEETS_SPREADSHEET_ID,
  range: import.meta.env.VITE_SERVER_GOOGLE_SHEETS_SHEET_NAME,
};

export interface Sheet {
  id?: any;
  fullName?: any;
  phoneNumber?: any;
  invitedTime?: any;
  partyDay?: any;
  partyName?: any;
  accepted?: any;
  createdAt?: any;
  updatedAt?: any;
}

export class SheetsMethods {
  constructor() {}

  async findAll() {
    try {
      const response = await SheetsService.spreadsheets.values.get(SheetTarget);
      const resRows = response.data.values;
      if (resRows?.length) {
        return resRows.slice(1).map((row) => {
          const [id, fullName, phoneNumber, invitedTime, partyDay, partyName, accepted, createdAt, updatedAt] = row;
          return {
            id,
            fullName,
            phoneNumber,
            invitedTime,
            partyDay,
            partyName,
            accepted,
            createdAt,
            updatedAt,
          };
        });
      }
    } catch (err) {
      console.log(err);
    }
    return [];
  }

  async findById(id: string) {
    const rows = await this.findAll();
    const foundItem = rows.find((item) => item?.id === id);
    return foundItem;
  }

  async updateRow(values: Sheet) {
    try {
      const rows = await this.findAll();
      const foundIndex = rows.findIndex((item) => item.id === values?.id);
      if (foundIndex === -1) throw new Error('No item found with ID: ' + values?.id);
      const { id, fullName, phoneNumber, invitedTime, partyDay, partyName, accepted } = values;
      console.log('updateRow ~ values:', values);

      const result = await SheetsService.spreadsheets.values.update({
        ...SheetTarget,
        valueInputOption: 'USER_ENTERED',
        range: `${SheetTarget.range}!D${foundIndex + 2}:G${foundIndex + 2}`,
        requestBody: { values: [[invitedTime, partyDay, partyName, accepted]] },
      });
      return result;
    } catch (err) {
      console.log('updateRow ~ err:', err);
      throw err;
    }
  }

  async appendRow(values: Sheet) {
    try {
      const rows = await this.findAll();
      const foundIndex = rows.findIndex((item) => !item?.fullName);
      const { id, fullName, phoneNumber, invitedTime, partyDay, partyName, accepted } = values;
      console.log('appendRow ~ values:', values);

      const result = await SheetsService.spreadsheets.values.update({
        ...SheetTarget,
        valueInputOption: 'USER_ENTERED',
        range: `${SheetTarget.range}!B${foundIndex + 2}:G${foundIndex + 2}`,
        requestBody: { values: [[fullName, phoneNumber, invitedTime, partyDay, partyName, accepted]] },
      });
      return rows[foundIndex];
    } catch (err) {
      console.log('appendRow ~ err:', err);
      throw err;
    }
  }
}
