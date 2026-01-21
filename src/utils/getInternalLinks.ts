import { getCollection } from 'astro:content';

/**
 * Return type for internal link functions
 */
export interface InternalLink {
  title: string;
  href: string;
  slug: string;
}

/**
 * Extended InternalLink with description (for services)
 */
export interface ServiceLink extends InternalLink {
  description: string;
}

/**
 * Get related services in the same category
 * @param currentServiceSlug - The current service slug to exclude
 * @param category - The category to filter by
 * @param limit - Maximum number of results (default: 3)
 * @returns Array of related service links
 */
export async function getRelatedServices(
  currentServiceSlug: string,
  category: string,
  limit: number = 3
): Promise<ServiceLink[]> {
  try {
    const services = await getCollection('services');

    return services
      .filter((service) =>
        service.data.category === category &&
        service.slug !== currentServiceSlug &&
        service.data.status === 'live'
      )
      .slice(0, limit)
      .map((service) => ({
        title: service.data.title,
        href: `/services/${service.slug}`,
        slug: service.slug,
        description: service.data.description,
      }));
  } catch (error) {
    console.error('Error fetching related services:', error);
    return [];
  }
}

/**
 * Get all location links for a specific service
 * @param serviceSlug - The service slug
 * @returns Array of service-city page links
 */
export async function getServiceCityLinks(serviceSlug: string): Promise<InternalLink[]> {
  try {
    const locations = await getCollection('locations');

    return locations
      .filter((location) => location.data.workflowStatus === 'published')
      .map((location) => ({
        title: `${location.data.title}`,
        href: `/services/${serviceSlug}-${location.slug}-on`,
        slug: location.slug,
      }));
  } catch (error) {
    console.error('Error fetching service-city links:', error);
    return [];
  }
}

/**
 * Get all service links for a specific location
 * @param locationSlug - The location slug
 * @returns Array of service-city page links
 */
export async function getLocationServiceLinks(locationSlug: string): Promise<InternalLink[]> {
  try {
    const services = await getCollection('services');

    return services
      .filter((service) => service.data.status === 'live')
      .map((service) => ({
        title: service.data.title,
        href: `/services/${service.slug}-${locationSlug}-on`,
        slug: service.slug,
      }));
  } catch (error) {
    console.error('Error fetching location-service links:', error);
    return [];
  }
}

/**
 * Get sibling locations in the same region
 * @param regionName - The region name
 * @param currentLocationSlug - The current location slug to exclude
 * @returns Array of sibling location links
 */
export async function getSiblingLocations(
  regionName: string,
  currentLocationSlug: string
): Promise<InternalLink[]> {
  try {
    const locations = await getCollection('locations');

    return locations
      .filter((location) =>
        location.data.region === regionName &&
        location.slug !== currentLocationSlug &&
        location.data.workflowStatus === 'published'
      )
      .map((location) => ({
        title: location.data.title,
        href: `/locations/${location.slug}`,
        slug: location.slug,
      }));
  } catch (error) {
    console.error('Error fetching sibling locations:', error);
    return [];
  }
}
