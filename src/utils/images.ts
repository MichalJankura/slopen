/**
 * Utility functions for handling venue images locally
 */

/**
 * Converts any image path/URL to a local path
 * @param imagePath - Original image path (could be URL or local path)
 * @param venueId - Venue ID to generate a fallback image name
 * @returns Local image path relative to public directory
 */
export const getLocalImagePath = (imagePath: string | undefined, venueId: string): string => {
  // If no image provided, use a default placeholder
  if (!imagePath) {
    return `/images/placeholder-venue.svg`;
  }

  // If already a local path (starts with / or ./), return as-is
  if (imagePath.startsWith('/') || imagePath.startsWith('./')) {
    return imagePath;
  }

  // If it's a remote URL, convert to local path
  if (imagePath.startsWith('http') || imagePath.startsWith('https')) {
    // Extract filename from URL or generate from venue ID
    const urlParts = imagePath.split('/');
    const filename = urlParts[urlParts.length - 1];
    
    // If we can extract a valid filename, use it
    if (filename && filename.includes('.')) {
      return `/images/${filename}`;
    }
    
    // Otherwise generate a filename from venue ID
    return `/images/${venueId}_image.webp`;
  }

  // If it's just a filename, prepend /images/
  if (!imagePath.includes('/')) {
    return `/images/${imagePath}`;
  }

  // Fallback: assume it's already correct
  return imagePath;
};

/**
 * Ensures all venue images use local paths
 * @param venues - Array of venues
 * @returns Array of venues with local image paths
 */
export const normalizeVenueImages = <T extends { id: string; image?: string }>(venues: T[]): T[] => {
  return venues.map(venue => ({
    ...venue,
    image: getLocalImagePath(venue.image, venue.id)
  }));
};