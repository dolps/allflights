
export const pilots = [
    {
        id: '1',
        name: 'Alex Honnold',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    },
    {
        id: '2',
        name: 'Sarah Connor',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    }
];

export const flights = [
    {
        id: 'f1',
        pilotId: '1',
        type: 'Paragliding',
        title: 'Morning Soaring at Point of the Mountain',
        date: '2023-10-15T09:30:00Z',
        duration: 5400, // seconds -> 1h 30m
        distance: 25.4, // km
        maxAltitude: 2100, // meters
        description: 'Great conditions, lift everywhere.',
        gpx: '/src/data/fly.gpx',
    },
    {
        id: 'f2',
        pilotId: '2',
        type: 'Speedflying',
        title: 'Fast lap down the narrow couloir',
        date: '2023-10-14T14:15:00Z',
        duration: 320, // seconds -> 5m 20s
        distance: 3.2, // km
        maxAltitude: 1800, // meters
        description: 'Sketchy launch but smooth flight.',
        gpx: '/src/data/hikeandfly.gpx',
    },
    {
        id: 'f3',
        pilotId: '1',
        type: 'Base Jump',
        title: 'Quick jump from the cliff',
        date: '2023-10-10T11:00:00Z',
        duration: 45, // seconds
        distance: 0.8, // km
        maxAltitude: 1200, // meters
        description: 'Deployment was on heading.',
        gpx: null,
    }
];

export const getPilot = (id) => pilots.find(p => p.id === id);
