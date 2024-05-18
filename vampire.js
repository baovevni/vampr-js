class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires += 1;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {

    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.

  vampiresAncestor() {
    let ancestors = [];

    ancestors.push(this);
    if (this.creator) {
      ancestors = ancestors.concat(this.creator.vampiresAncestor());
    }
    return ancestors;
  }

  closestCommonAncestor(vampire) {
    const firstValue = this.vampiresAncestor();
    const secondValue = vampire.vampiresAncestor();

    let result = firstValue.filter((ele) => {
      if (secondValue.indexOf(ele) !== -1) {
        return ele;
      }
    });
    return result[0];
  }

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }
    for (const offspring of this.offspring) {
      const found = offspring.vampireWithName(name);
      if (found) {
        return found;
      }
    }
    return null;
  }
  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalDescendents = 0;

    for (const offspring of this.offspring) {
      totalDescendents += offspring.totalDescendents + 1;
    }
    return totalDescendents;
  }


  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let allMillennialVampires = [];

    if (this.yearConverted > 1980) {
      allMillennialVampires.push(this);
    }

    for (const offspring of this.offspring) {
      const millenialDescendants = offspring.allMillennialVampires;
      allMillennialVampires = allMillennialVampires.concat(millenialDescendants);
    }
    return allMillennialVampires;
  }
}

module.exports = Vampire;

