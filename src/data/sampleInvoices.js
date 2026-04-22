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
    senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    clientAddress: { street: '106 Kendell Street', city: 'Sharborough', postCode: 'NE1 0PQ', country: 'United Kingdom' },
    items: [{ name: 'Brand Guidelines', qty: 1, price: 1800.90, total: 1800.90 }],
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
    senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    clientAddress: { street: '84 Church Way', city: 'Bradford', postCode: 'BD1 9PB', country: 'United Kingdom' },
    items: [
      { name: 'Banner Design', qty: 1, price: 156.00, total: 156.00 },
      { name: 'Email Design', qty: 2, price: 200.00, total: 400.00 }
    ],
    total: 556.00
  },
  {
    id: 'RG0314',
    clientName: 'John Morrison',
    clientEmail: 'john@mail.com',
    invoiceDate: '2021-09-24',
    paymentDue: '2021-10-01',
    description: 'Website Redesign',
    paymentTerms: 'Net 7 Days',
    status: 'paid',
    senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    clientAddress: { street: '48 Hart Street', city: 'Kibworth', postCode: 'LE8 0FQ', country: 'United Kingdom' },
    items: [{ name: 'Website Redesign', qty: 1, price: 14002.33, total: 14002.33 }],
    total: 14002.33
  },
  {
    id: 'RT2080',
    clientName: 'Alysa Werner',
    clientEmail: 'alysa@mail.com',
    invoiceDate: '2021-10-11',
    paymentDue: '2021-10-12',
    description: 'Logo Concept',
    paymentTerms: 'Net 1 Day',
    status: 'pending',
    senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    clientAddress: { street: '25 Stokes Isle Apt. 556', city: 'Kernersville', postCode: '84025', country: 'United States' },
    items: [{ name: 'Logo Concept', qty: 1, price: 102.04, total: 102.04 }],
    total: 102.04
  },
  {
    id: 'AA1449',
    clientName: 'Mellisa Clarke',
    clientEmail: 'mellisa@mail.com',
    invoiceDate: '2021-10-13',
    paymentDue: '2021-10-14',
    description: 'Re-branding',
    paymentTerms: 'Net 1 Day',
    status: 'pending',
    senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    clientAddress: { street: '68 Torrance Isle Apt. 340', city: 'Clarcberg', postCode: '33Rich', country: 'United States' },
    items: [
      { name: 'New Branding', qty: 3, price: 1000.00, total: 3000.00 },
      { name: 'Stationery', qty: 2, price: 10.00, total: 20.00 },
      { name: 'Thank You Cards', qty: 4, price: 15.00, total: 60.00 }
    ],
    total: 4032.33
  },
  {
    id: 'TY9141',
    clientName: 'Thomas Wayne',
    clientEmail: 'thomas@mail.com',
    invoiceDate: '2021-10-30',
    paymentDue: '2021-10-31',
    description: 'Landing Page Design',
    paymentTerms: 'Net 1 Day',
    status: 'pending',
    senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    clientAddress: { street: '3 Marvell Ave', city: 'Gotham', postCode: 'GT1 1AA', country: 'United Kingdom' },
    items: [{ name: 'Landing Page Design', qty: 1, price: 6155.91, total: 6155.91 }],
    total: 6155.91
  },
  {
    id: 'FV2353',
    clientName: 'Anita Wainwright',
    clientEmail: 'anita@mail.com',
    invoiceDate: '2021-11-12',
    paymentDue: '2021-11-19',
    description: 'Logo Redesign',
    paymentTerms: 'Net 7 Days',
    status: 'draft',
    senderAddress: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    clientAddress: { street: '2 Stratford Drive', city: 'Bowerham', postCode: 'LA1 4AX', country: 'United Kingdom' },
    items: [{ name: 'Logo Redesign', qty: 1, price: 3102.04, total: 3102.04 }],
    total: 3102.04
  }
]