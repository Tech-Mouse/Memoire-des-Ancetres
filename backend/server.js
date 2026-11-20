let allPeopleLength = 0;


export async function getAllPeople() {
  const people = await fetch("/Memoire-des-Ancetres/db/person.json")
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
    });
  return people;
}

export async function getAllPeopleLength() {
  if (allPeopleLength > 0) {
    return allPeopleLength;
  }
  return await getAllPeople().then((people) => {
    allPeopleLength = people.length;
    return allPeopleLength;
  });
}

export async function getLimitedPeopleWithCemeteries(people) {
  const allCemeteries = await getAllCemeteries();
  const isBuriedAt = await getIsBuriedAt();

  const modifiedPeople = [];

  for (const person of people) {
    const buriedAt = isBuriedAt.find((entry) => entry.person_id == person.person_id);
    const cemetery = allCemeteries?.find((cemetery) => cemetery.cemetery_id == buriedAt.cemetery_id);
    person.cemetery = cemetery;
    modifiedPeople.push(person);
  }

  return modifiedPeople;
}

export async function getPeopleWithCemeteries() {
  const people = await getAllPeople();
  const allCemeteries = await getAllCemeteries();
  const isBuriedAt = await getIsBuriedAt();

  const modifiedPeople = [];

  for (const person of people) {
    const buriedAt = isBuriedAt.find((entry) => entry.person_id == person.person_id);
    const cemetery = allCemeteries?.find((cemetery) => cemetery.cemetery_id == buriedAt.cemetery_id);
    person.cemetery = cemetery;
    modifiedPeople.push(person);
  }

  return modifiedPeople;
}

export async function getSortedPeopleByCemeteryId(cemeteryId, people) {
  return people.toSorted(function(a, b){
    const aMatches = a.cemetery.cemetery_id == cemeteryId ? 1 : 0;
    const bMatches = b.cemetery.cemetery_id == cemeteryId ? 1 : 0;
    return bMatches - aMatches; // descending order: matches first
  });
}

export async function getPersonById(id) {
  const people = await getAllPeople();
  return people.find((person) => person.person_id == id);
}

async function getCategories() {
  const categories = await fetch("/Memoire-des-Ancetres/db/category.json")
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
    });
  return categories;
}

async function getCategoryById(id) {
  const categories = await getCategories();
  return categories.find((category) => category.category_id == id);
}

async function getCategoryByName(name) {
  const categories = await getCategories();
  return categories.find((category) => category.name == name);
}

async function getHasCategories() {
  const hasCategories = await fetch(
    "/Memoire-des-Ancetres/db/has_category.json"
  )
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
    });
  return hasCategories;
}

async function getPersonHasCategories(personId) {
  const hasCategories = await getHasCategories();
  return hasCategories.filter((entry) => entry.person_id == personId);
}

export async function getPersonCategories(personId) {
  const personCategories = await getPersonHasCategories(personId);
  const categories = await getCategories();

  let validCategories = [];

  for (const category of categories) {
    for (const personCategory of personCategories) {
      if (category.category_id == personCategory.category_id) {
        validCategories.push({
          category_id: category.category_id,
          name: category.name,
          text: personCategory.text,
        });
      }
    }
  }
  return validCategories;
}

async function getIsParentOf() {
  const isParentOf = await fetch("/Memoire-des-Ancetres/db/is_parent_of.json")
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
    });
  return isParentOf;
}

async function getIsParentOfPerson(personId) {
  const personParents = await getIsParentOf();
  return personParents.filter((entry) => entry.child_id == personId);
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
  return isParent.filter((entry) => entry.parent_id == personId);
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
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
    });
  return isSpouses;
}

async function getSpouseEntriesAsWife(personId) {
  const allSpouses = await getIsSpouseOf();
  return allSpouses.filter((entry) => entry.wife_id == personId);
}

async function getSpouseEntriesAsHusband(personId) {
  const allSpouses = await getIsSpouseOf();
  return allSpouses.filter((entry) => entry.husband_id == personId);
}

export async function getSpouses(personId) {
  const spousesAsWife = await getSpouseEntriesAsWife(personId);
  const spousesAsHusband = await getSpouseEntriesAsHusband(personId);

  const spouseIds = Array.from(spousesAsWife.map((entry) => entry.husband_id));

  spouseIds.push(...spousesAsHusband.map((entry) => entry.wife_id));

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
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
    });
  return cemeteries;
}

export async function getCemeteryById(id) {
  const cemeteries = await getAllCemeteries();
  return cemeteries.find((cemetery) => cemetery.cemetery_id == id);
}

async function getIsBuriedAt() {
  const isBuriedAt = await fetch("/Memoire-des-Ancetres/db/is_buried_at.json")
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
    });
  return isBuriedAt;
}

async function getIsBuriedOnCemetery(cemeteryId) {
  const allEntries = await getIsBuriedAt();
  return allEntries.filter((entry) => entry.cemetery_id == cemeteryId);
}

export async function getPeopleAtCemetery(cemeteryId) {
  const people = await getAllPeople();
  const peopleCemeteryEntries = await getIsBuriedOnCemetery(cemeteryId);

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

export async function getCemeteryByPerson(personId) {
  const isBuriedAt = await getIsBuriedAt();
  const cemeteryId = isBuriedAt
    .filter((entry) => entry.person_id == personId)
    .at(0).cemetery_id;
  return getCemeteryById(cemeteryId);
}

export async function getAllFamilies() {
  const families = await fetch("/Memoire-des-Ancetres/db/family.json")
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
    });
  return families;
}

export async function getIsMemberOf() {
  const isMemberOf = await fetch("/Memoire-des-Ancetres/db/is_member_of.json")
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
    });
    return isMemberOf;
}

export async function getPeopleByFamilyId(familyId) {
  const isMemberOf = await getIsMemberOf();
  const people = await getAllPeople();

  const familyMembers = [];

  for (const memberEntry of isMemberOf) {
    for (const person of people) {
      if (memberEntry.family_id == familyId && memberEntry.person_id == person.person_id) {
        familyMembers.push(person);
      }
    }
  }
  return familyMembers;
}

export async function getFamiliesByPerson(personId) {
  const isMemberOf = await getIsMemberOf();
  const families = isMemberOf.filter((entry) => entry.person_id == personId);
  return families.map((entry) => getFamilyById(entry.family_id));
}


export async function getFamilyById(familyId) {
  const families = await getAllFamilies();
  return families.find((family) => family.family_id == familyId);
}

export async function getCemeteriesOfFamilies() {
  const cemeteriesOfFamilies = await fetch("/Memoire-des-Ancetres/db/cemetery_of_family.json")
    .then((res) => res.json())
    .catch((e) => {
      console.error(e);
    });
  return cemeteriesOfFamilies;
}

export async function getCemeteriesByFamilyId(familyId) {
  const cemeteries = await getAllCemeteries();
  const cemeteryOfFamily = await getCemeteriesOfFamilies();

  const familyCemeteries = cemeteryOfFamily.filter((entry) => entry.family_id == familyId);
  return cemeteries.filter((cemetery) => familyCemeteries.some((entry) => entry.cemetery_id == cemetery.cemetery_id));
}



export async function getAllPeopleUltimateInfo() {
  const people = await getAllPeople();
  const allCemeteries = await getAllCemeteries();
  const isBuriedAt = await getIsBuriedAt();
  const allFamilies = await getAllFamilies();
  const isMemberOf = await getIsMemberOf();

  let modifiedPeople = [];

  for (const person of people) {
    const buriedAt = isBuriedAt.find((entry) => entry.person_id == person.person_id);
    const cemetery = allCemeteries?.find((cemetery) => cemetery.cemetery_id == buriedAt.cemetery_id);
    const isMember = isMemberOf.find((entry) => entry.person_id == person.person_id);
    const family = allFamilies?.find((family) => family.family_id == isMember.family_id);

    person.cemetery = cemetery;
    person.family = family;
    modifiedPeople.push(person);
  }
  return modifiedPeople;
}
