import type { GetDogImage } from '../types/types';

// https://dog.ceo/dog-api/documentation/random
async function getDogImage(): Promise<string> {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data: GetDogImage = await response.json();
    return data.message;
  } catch {
    return 'https://placehold.co/600x400';
  }
}

export default getDogImage;
