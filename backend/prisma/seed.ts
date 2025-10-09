import { Priority, Prisma, PrismaClient, Status } from 'src/generated/prisma';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const TICKET_COUNT = 200;
const PRIORITIES: Priority[] = ['LOW', 'MEDIUM', 'HIGH'];
const STATUSES: Status[] = ['OPEN', 'IN_PROGRESS', 'RESOLVED'];

async function seed() {
  console.log('Delete all tickets...');
  await prisma.ticket.deleteMany();
  console.log('Deleted all tickets');

  console.log(`Seeding ${TICKET_COUNT} tickets...`);
  const tickets: Prisma.TicketCreateManyInput[] = [];
  for (let i = 0; i < TICKET_COUNT; i++) {
    tickets.push({
      title: faker.helpers.arrayElement([
        `Bug: ${faker.hacker.phrase()}`,
        `Feature Request: ${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
        `UI Issue: ${faker.word.adjective()} layout on ${faker.word.noun()}`,
        `Performance: ${faker.hacker.verb()} speed issue`,
        `Error: ${faker.hacker.noun()} failed to ${faker.hacker.verb()}`,
      ]),
      description: faker.lorem.paragraphs({
        min: 1,
        max: 3,
      }),
      priority: faker.helpers.arrayElement(PRIORITIES),
      status: faker.helpers.arrayElement(STATUSES),
      createdAt: faker.date.recent({ days: 90 }),
      updatedAt: faker.date.recent({ days: 10 }),
    });
  }
  await prisma.ticket.createMany({ data: tickets });
  console.log(`Seeded ${TICKET_COUNT} tickets`);
}

seed();
