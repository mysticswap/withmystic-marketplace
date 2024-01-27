export const crateVideoCache = (url: string) => {
  caches.open("video-cache").then((cache) => {
    cache.match(url).then((res) => {
      if (!res) {
        cache.add(url); //add = fetch + put
      }
    });
  });
};

export const getVideoCache = async (url: string) => {
  //search for files in caches
  // cache.match() cache.matchAll()
  // caches.match() - look in all caches
  const cacheUrl = await caches.open("video-cache").then((cache) => {
    return cache
      .match(url)
      .then((cacheResponse) => {
        if (
          cacheResponse &&
          cacheResponse.status < 400 &&
          cacheResponse.headers.has("content-type")
        ) {
          //not an error if not found
          return cacheResponse;
        } else {
          return;
        }
      })
      .then((response) => {
        if (response) {
          return response.blob();
        }
      })
      .then((blob) => {
        if (blob) {
          const cacheUrl = URL.createObjectURL(blob);
          return cacheUrl;
        }
      });
  });

  return cacheUrl;
};
