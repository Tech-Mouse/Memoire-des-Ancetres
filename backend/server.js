export async function getAllPeople() {
    const people = await fetch("/Memoire-des-Ancetres/db/person.json")
    .then(res => res.json())
    .catch(e => { console.error(e)});
    return people;
}

export async function getPersonById(id) {
    const people = await getAllPeople();
    return people.find(person => person.person_id == id);
}

async function getCategories() {
    const categories = await fetch("/Memoire-des-Ancetres/db/category.json")
    .then(res => res.json())
    .catch(e => {console.error(e)});
    return categories;
    
}

async function getCategoryById(id) {
    const categories = await getCategories();
    return categories.find(category => category.category_id == id);
}

async function getCategoryByName(name) {
    const categories = await getCategories();
    return categories.find(category => category.name == name);
}

async function getHasCategories() {
    const hasCategories = await fetch("/Memoire-des-Ancetres/db/has_category.json")
    .then(res => res.json())
    .catch(e => { console.error(e)});
    return hasCategories;
}

async function getPersonHasCategories(personId) {
    const hasCategories = await getHasCategories();
    return hasCategories.filter(entry => entry.person_id == personId);
}

export async function getPersonCategories(personId) {
    const personCategories = await getPersonHasCategories(personId);
    const categories = await getCategories();

    let validCategories = [];

    for (const category of categories) {
        for (const personCategory of personCategories) {
            if (category.category_id == personCategory.category_id) {
                validCategories.push({"category_id" : category.category_id, "name" : category.name, "text" : personCategory.text});
            }
        }
    }
    return validCategories;
}

async function getIsParentOf() {
    const isParentOf = await fetch("/Memoire-des-Ancetres/db/is_parent_of.json")
    .then(res => res.json())
    .catch(e => { console.error(e)});
    return isParentOf;
}

async function getIsParentOfPerson(personId) {
    const personParents = await getIsParentOf();
    return personParents.filter(entry => entry.child_id == personId);
}

export async function getParents(personId) {
    const parentEntries = await getIsParentOfPerson(personId);
    const people = await getAllPeople();

    let parents = [];

    for (const parentEntry of parentEntries) {
        for (const person of people) {
            if (parentEntry.parent_id == person.person_id) {
                parents.push(person);
            }
        }
    }

    return parents;
}

async function getIsChildOfPerson(personId) {
    const isParent = await getIsParentOf();
    return isParent.filter(entry => entry.parent_id == personId);
}

export async function getChildren(personId) {
    const childrenEntries = await getIsChildOfPerson(personId);
    const people = await getAllPeople();

    let children = [];

    for (const childrenEntry of childrenEntries) {
        for (const person of people) {
            if (childrenEntry.child_id == person.person_id) {
                children.push(person);
            }
        }
    }
    return children;
}

async function getIsSpouseOf() {
    const isSpouses = await fetch("/Memoire-des-Ancetres/db/is_spouse_of.json")
    .then(res => res.json())
    .catch(e => { console.error(e)});
    return isSpouses;
}

async function getSpouseEntriesAsWife(personId) {
    const allSpouses = await getIsSpouseOf();
    return allSpouses.filter(entry => entry.wife_id == personId);
}

async function getSpouseEntriesAsHusband(personId) {
    const allSpouses = await getIsSpouseOf();
    return allSpouses.filter(entry => entry.husband_id == personId);
}


export async function getSpouses(personId) {
    const spousesAsWife = await getSpouseEntriesAsWife(personId);
    const spousesAsHusband = await getSpouseEntriesAsHusband(personId);

    const spouseIds = Array.from(spousesAsWife.map(entry => entry.husband_id));

    spouseIds.push(...spousesAsHusband.map(entry => entry.wife_id));

    const uniqueIds = [...new Set(spouseIds)];

    const allSpouses = [];

    for (const id of uniqueIds) {
        const person = await getPersonById(id);
        if (person) {
            allSpouses.push(person);
        }
    }

    return allSpouses;
}

export async function getAllCemeteries() {
    const cemeteries = await fetch("/Memoire-des-Ancetres/db/cemetery.json")
    .then(res => res.json())
    .catch(e => { console.error(e)});
    return cemeteries;
}

export async function getCemeteryById(id) {
    const cemeteries = await getAllCemeteries();
    return cemeteries.find(cemetery => cemetery.cemetery_id == id);
}

async function getIsBuriedAt() {
    const isBuriedAt = await fetch("/Memoire-des-Ancetres/db/is_buried_at.json")
    .then(res => res.json())
    .catch(e => { console.error(e)});
    return isBuriedAt;
}

async function getIsBuriedOnCemetery(cemeteryId) {
    const allEntries = await getIsBuriedAt();
    return allEntries.filter(entry => entry.cemetery_id == cemeteryId);
}

export async function getPeopleAtCemetery(cemeteryId) {
    const people = await getAllPeople();
    const peopleCemeteryEntries = await getIsBuriedAtCemetery();

    const buriedPeople = [];

    for (const burialEntry of peopleCemeteryEntries) {
        for (const person of people) {
            if (burialEntry.person_id == person.person_id) {
                buriedPeople.push(person);
            }
        }
    }

    return buriedPeople;
}
