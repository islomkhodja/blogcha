const faker = require('faker');

exports.seed = async function (knex) {
    // Deletes ALL existing entries \
    await knex('categories').del();

    const users = await knex.select(['id']).from('users');
    const user_ids = users.map((user) => user.id);


    // Inserts seed entries
    const categories = [];
    for (let i = 0; i < 7; i++) {
        const randomUser = user_ids[Math.floor(Math.random() * user_ids.length)];

        const category = {
            title: faker.address.country(),
            created_by: randomUser,
        }

        categories.push(category);
    }

    await knex('categories').insert(categories);
};
