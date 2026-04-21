// src/data/sampleInvoices.js
export const sampleInvoices = [
  {
    id: 'RT3080',
    clientName: 'Jensen Huang',
    clientEmail: 'jensenh@mail.com',
    invoiceDate: '2021-08-18',
    paymentDue: '2021-08-19',
    description: 'Re-branding',
    paymentTerms: 'Net 1 Day',
    status: 'paid',
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '106 Kendell Street',
      city: 'Sharborough',
      postCode: 'NE1 0PQ',
      country: 'United Kingdom'
    },
    items: [
      { name: 'Brand Guidelines', qty: 1, price: 1800.90, total: 1800.90 }
    ],
    total: 1800.90
  },
  {
    id: 'XM9141',
    clientName: 'Alex Grim',
    clientEmail: 'alexgrim@mail.com',
    invoiceDate: '2021-08-21',
    paymentDue: '2021-09-20',
    description: 'Graphic Design',
    paymentTerms: 'Net 30 Days',
    status: 'pending',
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '84 Church Way',
      city: 'Bradford',
      postCode: 'BD1 9PB',
      country: 'United Kingdom'
    },
    items: [
      { name: 'Banner Design', qty: 1, price: 156.00, total: 156.00 },
      { name: 'Email Design', qty: 2, price: 200.00, total: 400.00 }
    ],
    total: 556.00
  },
  {
    id: 'FV2353',
    clientName: 'Anita Wainwright',
    clientEmail: 'anita@mail.com',
    invoiceDate: '2021-11-12',
    paymentDue: '2021-11-12',
    description: 'Logo Redesign',
    paymentTerms: 'Net 7 Days',
    status: 'draft',
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '2 Stratford Drive',
      city: 'Bowerham',
      postCode: 'LA1 4AX',
      country: 'United Kingdom'
    },
    items: [
      { name: 'Logo Design', qty: 1, price: 3102.04, total: 3102.04 }
    ],
    total: 3102.04
  }
]