import { useEffect, useState } from 'react';

import getDogImage from './api/getDogImage';
import { getAllBreeds, getImageByBreed } from './api/getDogByBreed';

import type { BreedOption } from './types/types';
import getBreedsOptions from './utils/formatBreeds';

function Dogs() {
  const [image, setImage] = useState<string>('https://placehold.co/600x400');
  const [breeds, setBreeds] = useState<BreedOption[]>([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await getDogImage();
        setImage(url);
      } catch (error) {
        console.error('Error fetching dog image:', error);
      }
    };

    fetchImage();
  }, []);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const breeds = await getAllBreeds();

        if (!breeds || Object.keys(breeds).length === 0) {
          return;
        }

        const breedMap: Map<string, string[]> = new Map(Object.entries(breeds));
        const formattedBreeds = getBreedsOptions(breedMap);

        setBreeds(formattedBreeds);
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };

    fetchBreeds();
  }, []);

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={(e) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const breed = form.breed.value;

        getImageByBreed(breed).then((url) => {
          setImage(url);
        });
      }}>
      <img
        src={image}
        alt="A Good Boy"
        width="400"
        height="500"
        className="h-[500px] w-[400px] mb-4 object-contain"
      />

      <select
        aria-label="Select a breed"
        name="breed"
        id="breed"
        onChange={async (e) => {
          const breed = e.target.value;

          if (!breed) {
            return;
          }

          try {
            const formattedBreed = breed.replace(/-/g, '/');

            const url = await getImageByBreed(formattedBreed);
            setImage(url);
          } catch (error) {
            console.error('Error fetching dog image:', error);
          }
        }}>
        {breeds && breeds.length > 0 ? (
          breeds.map((breed) => (
            <option key={breed.value} value={breed.value}>
              {breed.name}
            </option>
          ))
        ) : (
          <option value="loading">Loading...</option>
        )}
      </select>

      <button type="submit">Get good boy 🐕</button>
    </form>
  );
}

export default Dogs;
