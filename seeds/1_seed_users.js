const faker = require('faker');

exports.seed = async function (knex) {
    // Deletes ALL existing entries \
    await knex('users').del();
    // Inserts seed entries
    const users = [];
    for (let i = 0; i < 30; i++) {
        const user = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            bio: faker.lorem.paragraphs(),
        }

        users.push(user);
    }

    await knex('users').insert(users);
};
