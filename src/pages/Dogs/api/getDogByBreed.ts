async function getAllBreeds(): Promise<Record<string, string[]> | null> {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();
    return data.message;
  } catch (e) {
    console.error('Something went wrong retrieving the breeds', e);
    return null;
  }
}

async function getImageByBreed(breed: string): Promise<string> {
  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    return data.message;
  } catch (e) {
    console.error(`Something went wrong retrieving the image for ${breed}`, e);
    return 'https://placehold.co/600x400';
  }
}

export { getAllBreeds, getImageByBreed };
