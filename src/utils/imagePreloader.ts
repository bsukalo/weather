export const imageUrls = Object.values(
  import.meta.glob("/src/assets/**/*.png", { eager: true, as: "url" }),
) as string[];

export const preloadImages = (urls: string[]): Promise<void[]> => {
  const promises = urls.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });

  return Promise.all(promises);
};
