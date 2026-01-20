/**
 * Neighborhoods Data
 *
 * Well-known neighborhoods and districts for each city in the service area.
 * Used by NeighborhoodsSection component for local SEO optimization.
 */

// ============================================================================
// TypeScript Interfaces
// ============================================================================

/**
 * Mapping of city slugs to their neighborhoods
 */
export interface NeighborhoodsByCity {
  [citySlug: string]: string[];
}

// ============================================================================
// Neighborhood Data
// ============================================================================

export const neighborhoodsByCity: NeighborhoodsByCity = {
  guelph: [
    'Downtown Guelph',
    'The Ward',
    'Exhibition Park',
    'Westminster Woods',
    'Willow West',
    'University District',
    'East End',
    'West End',
    'Old University',
    'St. George\'s Park',
  ],
  cambridge: [
    'Preston',
    'Galt',
    'Hespeler',
    'Blair',
    'Silverheights',
    'Southwood',
    'Doon South',
    'Eagle',
    'Clemens Mill',
    'Shades Mills',
  ],
  kitchener: [
    'Downtown Kitchener',
    'Westmount',
    'Forest Heights',
    'Pioneer Park',
    'Huron Park',
    'Victoria Hills',
    'Doon',
    'Country Hills',
    'Laurentian Hills',
    'Bridgeport',
  ],
  waterloo: [
    'Uptown Waterloo',
    'Beechwood',
    'Lakeshore',
    'Eastside',
    'Westside',
    'Westvale',
    'Laurelwood',
    'University District',
    'Lincoln Heights',
    'Sunnydale',
  ],
  milton: [
    'Old Milton',
    'Dempsey',
    'Timberlea',
    'Hawthorne Village',
    'Willmott',
    'Clarke',
    'Harrison',
    'Coates',
    'Bronte Meadows',
    'Scott',
  ],
  'oakville-burlington': [
    'Downtown Oakville',
    'Old Oakville',
    'Bronte',
    'Glen Abbey',
    'River Oaks',
    'Downtown Burlington',
    'Aldershot',
    'Burlington Heights',
    'Orchard',
    'Millcroft',
  ],
  hamilton: [
    'Downtown Hamilton',
    'Dundas',
    'Ancaster',
    'Westdale',
    'Stinson',
    'Crown Point',
    'East Hamilton',
    'Mountain (Upper City)',
    'Waterdown',
    'Binbrook',
  ],
  brantford: [
    'Downtown Brantford',
    'West Brant',
    'Eagle Place',
    'Holmedale',
    'Echo Place',
    'North Ward',
    'East Ward',
    'Cainsville',
    'Tutela Heights',
    'West Brantford',
  ],
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get neighborhoods for a specific city
 *
 * @param citySlug - City slug (e.g., 'guelph', 'cambridge')
 * @returns Array of neighborhoods for the city, or empty array if city not found
 */
export function getNeighborhoodsByCity(citySlug: string): string[] {
  return neighborhoodsByCity[citySlug.toLowerCase()] || [];
}

/**
 * Get all neighborhoods across all cities
 *
 * @returns Flat array of all neighborhood names
 */
export function getAllNeighborhoods(): string[] {
  return Object.values(neighborhoodsByCity).flat();
}

/**
 * Find which city a neighborhood belongs to (reverse lookup)
 *
 * @param neighborhood - Neighborhood name to search for
 * @returns City slug if found, undefined otherwise
 */
export function getCityByNeighborhood(neighborhood: string): string | undefined {
  const normalizedSearch = neighborhood.toLowerCase().trim();

  for (const [citySlug, neighborhoods] of Object.entries(neighborhoodsByCity)) {
    const found = neighborhoods.some(
      n => n.toLowerCase() === normalizedSearch
    );
    if (found) {
      return citySlug;
    }
  }

  return undefined;
}

/**
 * Get the total number of neighborhoods across all cities
 *
 * @returns Total count of neighborhoods
 */
export function getTotalNeighborhoodCount(): number {
  return getAllNeighborhoods().length;
}

/**
 * Check if a city has neighborhood data
 *
 * @param citySlug - City slug to check
 * @returns True if city has neighborhoods, false otherwise
 */
export function hasCityNeighborhoods(citySlug: string): boolean {
  return citySlug.toLowerCase() in neighborhoodsByCity;
}
