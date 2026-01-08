import gpxParser from 'gpxparser';
import { supabase } from './supabase';

export interface ActivityStats {
    startTime: Date;
    endTime: Date;
    durationSeconds: number;
    maxAltitude: number;
    distanceKm: number;
    trackData: { lat: number; lng: number; alt: number }[];
    name: string;
}

export const parseGPX = (xmlString: string): ActivityStats => {
    const gpx = new gpxParser();
    gpx.parse(xmlString);

    const track = gpx.tracks[0];
    const points = track.points.map(p => ({
        lat: p.lat,
        lng: p.lon,
        alt: p.ele || 0,
        time: p.time
    }));

    // Calculate max altitude
    const maxAltitude = Math.max(...points.map(p => p.alt));

    // Get times
    const startTime = new Date(points[0]?.time || Date.now());
    const endTime = new Date(points[points.length - 1]?.time || Date.now());
    const durationSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

    return {
        startTime,
        endTime,
        durationSeconds,
        maxAltitude,
        distanceKm: track.distance.total / 1000,
        trackData: points,
        name: track.name || 'New Flight'
    };
};

export const uploadActivity = async (stats: ActivityStats, file: File) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // 1. Upload raw file to storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;
    const { error: storageError } = await supabase.storage
        .from('activities')
        .upload(fileName, file);

    if (storageError) throw storageError;

    const { data: publicUrlData } = supabase.storage
        .from('activities')
        .getPublicUrl(fileName);

    // 2. Insert record into DB
    const { error: dbError } = await supabase
        .from('activities')
        .insert({
            user_id: user.id,
            pilot_name: user.user_metadata?.full_name || 'Alex "The Eagle" Smith',
            activity_type: 'Paragliding',
            location: 'Swiss Alps',
            start_time: stats.startTime.toISOString(),
            end_time: stats.endTime.toISOString(),
            duration_seconds: stats.durationSeconds,
            max_altitude: stats.maxAltitude,
            distance_km: stats.distanceKm,
            track_data: stats.trackData,
            raw_gpx_url: publicUrlData.publicUrl
        });

    if (dbError) throw dbError;
};
