import { Card } from '../gameSlice'

// This function will shuffle an array of cards and return an array of pairs
export function shuffleCards<T extends Card>(array: T[], numItems: number): T[] {
  let currentIndex = array.length, temporaryValue, randomIndex;
  
  let copiedArray = [...array];

  // Perform initial shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element (from the back of the array)
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Swap the element with the current element
    temporaryValue = copiedArray[currentIndex];
    copiedArray[currentIndex] = copiedArray[randomIndex];
    copiedArray[randomIndex] = temporaryValue;
  }

  // We want pairs of cards for the memory game, so we slice the
  // first numItems elements from the shuffled array and duplicate them.
  // We also change the id of the cloned card to be unique.
  let pairsArray: T[] = copiedArray
    .slice(0, numItems)
    .flatMap((card, index) => {
      const cloneCard = { ...card, id: card.id + 100 }; // add 100 to id of duplicates
      return [card, cloneCard];
    });

  // Shuffle the pairsArray so that the pairs of cards aren't in order
  currentIndex = pairsArray.length;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = pairsArray[currentIndex];
    pairsArray[currentIndex] = pairsArray[randomIndex];
    pairsArray[randomIndex] = temporaryValue;
  }

  return pairsArray;
}
