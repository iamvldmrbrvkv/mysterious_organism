// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G'];
    return dnaBases[Math.floor(Math.random() * 4)];
  };
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase());
    }
    return newStrand;
  };
  
  // pAequor factory
  const pAequorFactory = (specimenNum, dna) => {
    return {
      specimenNum,
      dna,
      mutate() {
        let thisDnaIndex = Math.floor(Math.random() * this.dna.length);
        let newBase = returnRandBase();
        while (this.dna[thisDnaIndex] === newBase) {
          newBase = returnRandBase();
        }
        this.dna[thisDnaIndex] = newBase;
        return this.dna
      },
      compareDNA(pAequor) {
        let compareArr = [];
        for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === pAequor.dna[i]) {
            compareArr.push(this.dna[i]);
            //console.log('identical bases is', compareArr);
          }
        };
        /* forEach
        this.dna.forEach((item, index) => {
          if (this.dna[index] === pAequor.dna[index]) {
            compareArr.push(item);
            console.log('identical bases is', compareArr);
          }
        });*/
        let differense = (compareArr.length / 15 * 100).toFixed(11);
        //console.log('differense', differense);
        console.log(`specimen #${pAequor1.specimenNum} and specimen #${pAequor2.specimenNum} have ${differense}% DNA in common.`);
      },
      willLikelySurvive() {
        let count = 0;
        for (let i = 0; i < this.dna.length; i++) {
          if (this.dna[i] === 'C' || this.dna[i] === 'G') {
            count++;
            //console.log('count', count)
          }
        };
        let survive = (count / 15 * 100);
        //console.log('survive', survive);
        return survive >= 60 ? true : false;
        // or return survive >= 60;
      },
    }
  }
  
  let pAequor1 = pAequorFactory(1, mockUpStrand());
  pAequor1.mutate();
  console.log('original dna', pAequor1.dna);
  
  let pAequor2 = pAequorFactory(2, mockUpStrand());
  console.log('dna to compare', pAequor2.dna);
  
  pAequor1.compareDNA(pAequor2);
  
  pAequor1.willLikelySurvive();
  console.log(pAequor1.willLikelySurvive());
  
  const pAequorCopies = () => {
    let copies = [];
    for (let i = 1; i <= 30; i++) {
      let copy = pAequorFactory(i, mockUpStrand());
      while (copy.willLikelySurvive() === false) {
        copy.dna = mockUpStrand();
      }
      copies.push(copy);
      console.log(`pAequor #${copy.specimenNum} have [${copy.dna.join('-')}] DNA`);
    }
    //console.log(copies);
    return copies;
  };
  
  pAequorCopies();