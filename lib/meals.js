import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export const getMeals = () => db.prepare("SELECT * FROM meals").all();

export const getMeal = (slug) => db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);

export const saveMeal = async (meal) => {
    meal.slug = slugify(meal.title, { lower: true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    // creates a stream for us to write data to a file
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed!');
        }
    });

    // removing "public" because the content of the public folder
    // will be served as if it were served on the root level of the server
    // so it won't be included when requesting the image later 
    meal.image = `/images/${fileName}`;

    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal);
};
