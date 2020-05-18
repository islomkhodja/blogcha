const faker = require('faker');

exports.seed = async function (knex) {
    // Deletes ALL existing entries \
    await knex('posts').del();

    const users = await knex.select(['id']).from('users');
    const userIds = users.map((user) => user.id);
    const categories = await knex.select(['id']).from('categories');
    const categoriesIds = categories.map((category) => category.id);

    // Inserts seed entries
    const posts = [];
    for (let i = 0; i < 50; i++) {
        const randomUser = userIds[Math.floor(Math.random() * userIds.length)];
        const randomCategory = categoriesIds[Math.floor(Math.random() * categoriesIds.length)];
        const post = {
            title: faker.random.words(),
            body: faker.lorem.paragraphs() + '\n' + faker.lorem.paragraphs(),
            category_id: randomCategory,
            created_by: randomUser,
        }
        posts.push(post);
    }

    await knex('posts').insert(posts);
};
