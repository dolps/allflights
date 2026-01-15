declare module 'gpxparser' {
    export default class gpxParser {
        constructor();
        parse(xml: string): void;
        tracks: {
            name: string;
            distance: {
                total: number;
            };
            points: {
                lat: number;
                lon: number;
                ele: number;
                time: Date;
            }[];
        }[];
    }
}
