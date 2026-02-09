import { useState, useEffect } from 'react';
import supabase from '../utils/supabase';
import { Venue } from '../types';
import { normalizeVenueImages } from '../utils/images';

export const useVenues = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        console.log('Starting to fetch venues...');
        setLoading(true);
        setError(null);

        // Test Supabase connection first
        const { data, error: dbError } = await supabase
          .from('venues')
          .select('*')
          .limit(1);

        console.log('Supabase test result:', { data, dbError });

        if (dbError) {
          console.error('Supabase error:', dbError);
          throw dbError;
        }

        // Get all venues with correct database column names matching actual table structure
        const { data: allVenues, error: allError } = await supabase
          .from('venues')
          .select('id, name, types, address, alt_names, rating, rating_count, restaurant_type, weekly_hours, weekly_kitchen_hours, website, facebook, instagram, image, menu, daily_menu');

        if (allError) throw allError;

        console.log('All venues fetched:', allVenues?.length || 0);

        if (allVenues) {
          // Transform database rows to Venue type and normalize image paths
          console.log('Raw venues from DB:', allVenues);
          console.log('Sample venue weekly_hours:', allVenues[0]?.weekly_hours);
          
          // Transform snake_case to camelCase
          const transformedVenues = allVenues.map((venue: any) => ({
            ...venue,
            ratingCount: venue.rating_count,
            altNames: venue.alt_names,
            weeklyHours: venue.weekly_hours,
            weeklyKitchenHours: venue.weekly_kitchen_hours,
            dailyMenu: venue.daily_menu,
            restaurantType: venue.restaurant_type,
            // Set default values for missing fields
            tiktok: undefined,
            reviews: undefined
          }));
          
          console.log('Transformed venues:', transformedVenues);
          console.log('Sample transformed weeklyHours:', transformedVenues[0]?.weeklyHours);
          
          const venuesWithLocalImages = normalizeVenueImages(transformedVenues as Venue[]);
          console.log('After normalization:', venuesWithLocalImages.length);
          setVenues(venuesWithLocalImages);
        } else {
          setVenues([]);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Chyba pri načítaní reštaurácií';
        console.error('useVenues error:', err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  return { venues, loading, error };
};
