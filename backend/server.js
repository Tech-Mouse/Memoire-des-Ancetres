const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const dotenv = require('dotenv');
const { rateLimit } = require('express-rate-limit');

dotenv.config();

const app = express();
const PORT = process.env.port || 3000;

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 1 * 1000, // 1 second
  max: 5 // Limit each IP to 5 requests per window (1 second) per IP
});

app.use(limiter);

app.use(express.json({ limit: "1kb" })); // limit request body to 1kb 


const dbPromise = open({
    filename: './db.sqlite',
    driver: sqlite3.Database
});

app.get('/api/people', async (req, res) => {
    const db = await dbPromise;
    const people = await db.all('SELECT * FROM person');
    if ( Object.keys(people).length === 0 ) {
        return res.status(404).json({ error: "People not found" });
    }
    res.json(people);
});

app.get('/api/people/:id', async (req, res) => {
    const db = await dbPromise;
    const person = await db.get('SELECT * FROM person WHERE person_id=?', [req.params.id]);
    if ( ! person ) {
        return res.status(404).json({ error: "Person not found" });
    }
    res.json(person);
});

app.get('/api/categories', async (req, res) => {
    const db = await dbPromise;
    const categories = await db.all('SELECT * FROM category');
    if ( categories.length === 0 ) {
        return res.status(404).json({ error: "Categories not found" });
    }
    res.json(categories);
});


app.get('/api/categories/:id', async (req, res) => {
    const db = await dbPromise;
    const category = await db.get('SELECT * FROM category WHERE category_id=?', [req.params.id]);
    if ( ! category ) {
        return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
});

app.get('/api/categories/:name', async (req, res) => {
    const db = await dbPromise;
    const categories = await db.all('SELECT * FROM category WHERE name=?', [req.params.name]);
    if ( categories.length === 0 ) {
        return res.status(404).json({ error: "Categories not found" });
    }
    res.json(categories);
});


app.get('/api/people/:id/categories', async (req, res) => {
    const db = await dbPromise;
    const categories = await db.all('SELECT category.name, person.person_id, has_category.text FROM category JOIN has_category USING(category_id) JOIN person USING(person_id) WHERE person.person_id=?', [req.params.id]);
    if ( categories.length === 0 ) {
        return res.status(200).json([]);
    }
    res.json(categories);
});


app.get('/api/people/:id/parents', async (req, res) => {
    const db = await dbPromise;
    const parents = await db.all('SELECT parent.* FROM person AS child JOIN is_parent_of ON(child.person_id = child_id) JOIN person AS parent ON(parent.person_id = parent_id) WHERE child.person_id=?', [req.params.id]);
    if ( parents.length === 0 ) {
        return res.status(200).json([]);
    }
    res.json(parents);
});


app.get('/api/people/:id/children', async (req, res) => {
    const db = await dbPromise;
    const children = await db.all('SELECT child.* FROM person AS parent JOIN is_parent_of ON(parent.person_id = parent_id) JOIN person AS child ON(child.person_id = child_id) WHERE parent.person_id=?', [req.params.id]);
    if ( children.length === 0 ) {
        return res.status(200).json(children);
    }
    res.json(children);
});


app.get('/api/people/:id/spouses', async (req, res) => {
    const db = await dbPromise;
    const spouses_as_wife = await db.all('SELECT husband.* FROM person AS wife JOIN is_spouse_of ON(wife.person_id = wife_id) JOIN person AS husband ON(husband.person_id = husband_id) WHERE wife.person_id=?', [req.params.id]);

    const spouses_as_husband = await db.all('SELECT wife.* FROM person AS husband JOIN is_spouse_of ON(husband.person_id = husband_id) JOIN person AS wife ON(wife.person_id = wife_id) WHERE husband.person_id=?', [req.params.id]);

    if ( spouses_as_husband.length === 0 && spouses_as_wife.length === 0 ) {
        return res.status(200).json([]);
    }

    const spouses = spouses_as_wife.concat(spouses_as_husband);

    res.json(
        Array.from(
            new Map(spouses.map(spouse => [spouse.person_id, spouse])).values()
        )
    );
});

app.get('/api/cemeteries', async (req, res) => {
    const db = await dbPromise;
    const cemeteries = db.all('SELECT * from cemetery');
    if ( Object.keys(cemeteries).length === 0 ) {
        return res.status(404).json({ error: "Cemeteries not found" });
    }
    res.json(cemeteries);
})

app.get('/api/cemeteries/:id', async (req, res) => {
    const db = await dbPromise;
    const cemetery = await db.get('SELECT * FROM cemetery WHERE cemetery_id=?', [req.params.id]);
    if ( ! cemetery ) {
        return res.status(404).json({ error: "Cemetery not found" });
    }
    res.json(cemetery);
});

app.get('/api/cemeteries/:id/people', async (req, res) => {
    const db = await dbPromise;
    const people = await db.all('SELECT p.* FROM person p JOIN is_buried_at USING(person_id) WHERE cemetery_id=?', [req.params.id]);
    if ( Object.keys(people).length === 0 ) {
        return res.status(404).json({ error: "People not found" });
    }
    res.json(people);
});







app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});