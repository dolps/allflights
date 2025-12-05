import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Viewer, Entity } from 'resium';
import * as Cesium from 'cesium';
import { ArrowLeft, Clock as ClockIcon, Ruler, Mountain } from 'lucide-react';
import { flights, getPilot } from '../data/mockData';

const ActivityDetail = () => {
    const { id } = useParams();
    const flight = flights.find(f => f.id === id);
    const pilot = flight ? getPilot(flight.pilotId) : null;
    const [flightData, setFlightData] = useState(null);
    const viewerRef = useRef(null);

    useEffect(() => {
        if (flight && flight.gpx) {
            fetch(flight.gpx)
                .then(response => response.text())
                .then(str => {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(str, "text/xml");
                    const trkpts = xmlDoc.getElementsByTagName("trkpt");

                    const property = new Cesium.SampledPositionProperty();
                    const positions = [];
                    let start, stop;

                    for (let i = 0; i < trkpts.length; i++) {
                        const pt = trkpts[i];
                        const timeNode = pt.getElementsByTagName("time")[0];
                        const eleNode = pt.getElementsByTagName("ele")[0];

                        if (!timeNode || !eleNode) continue;

                        const time = Cesium.JulianDate.fromIso8601(timeNode.textContent);
                        const lat = parseFloat(pt.getAttribute("lat"));
                        const lon = parseFloat(pt.getAttribute("lon"));
                        const ele = parseFloat(eleNode.textContent);

                        const position = Cesium.Cartesian3.fromDegrees(lon, lat, ele);
                        property.addSample(time, position);
                        positions.push(position);

                        if (i === 0) start = time;
                        stop = time;
                    }

                    if (start && stop && positions.length > 0) {
                        const boundingSphere = Cesium.BoundingSphere.fromPoints(positions);
                        setFlightData({
                            start,
                            stop,
                            position: property,
                            boundingSphere
                        });
                    }
                })
                .catch(err => console.error("Error loading GPX:", err));
        }
    }, [flight]);

    useEffect(() => {
        if (flightData && viewerRef.current?.cesiumElement) {
            const viewer = viewerRef.current.cesiumElement;

            // Set up clock
            viewer.clock.startTime = flightData.start.clone();
            viewer.clock.stopTime = flightData.stop.clone();
            viewer.clock.currentTime = flightData.start.clone();
            viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
            viewer.clock.multiplier = 10;
            viewer.clock.shouldAnimate = false; // Let user hit play

            // Fly to track with padding
            if (flightData.boundingSphere) {
                viewer.camera.flyToBoundingSphere(flightData.boundingSphere, {
                    offset: new Cesium.HeadingPitchRange(
                        0,
                        Cesium.Math.toRadians(-45),
                        flightData.boundingSphere.radius * 4.0 // 4x radius ensures "more away" view
                    )
                });
            } else {
                viewer.flyTo(viewer.entities);
            }
        }
    }, [flightData]);

    if (!flight) return <div className="p-8 text-center">Flight not found</div>;

    return (
        <div className="activity-detail-page h-screen flex flex-col">
            {/* Header */}
            <div className="bg-card border-b border-border p-4 flex items-center gap-4 z-10 relative shadow-md">
                <Link to="/" className="p-2 hover:bg-hover rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-xl font-bold">{flight.title}</h1>
                    <p className="text-sm text-text-muted">{pilot?.name} • {new Date(flight.date).toLocaleDateString()}</p>
                </div>
            </div>

            {/* Main Content - Map & Stats Overlay */}
            <div className="flex-1 relative overflow-hidden">
                {!flightData && !flight.gpx && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted text-text-muted">
                        No GPS track available for this activity.
                    </div>
                )}

                <Viewer full ref={viewerRef}>
                    {flightData && (
                        <Entity
                            name="Flight Path"
                            availability={new Cesium.TimeIntervalCollection([
                                new Cesium.TimeInterval({ start: flightData.start, stop: flightData.stop })
                            ])}
                            position={flightData.position}
                            point={{ pixelSize: 10, color: Cesium.Color.RED }}
                            path={{
                                width: 5,
                                material: new Cesium.PolylineGlowMaterialProperty({
                                    glowPower: 0.1,
                                    color: Cesium.Color.ORANGE
                                }),
                                leadTime: 0,
                                trailTime: 6000 // Show long trail
                            }}
                            tracked // Camera follows the point
                        />
                    )}
                </Viewer>

                {/* Floating Stats Card */}
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-border w-64 z-20">
                    <h3 className="font-semibold mb-3 border-b border-border/50 pb-2">Flight Stats</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-text-muted flex items-center gap-2"><ClockIcon size={16} /> Duration</span>
                            <span className="font-mono">{(flight.duration / 60).toFixed(0)}m</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-text-muted flex items-center gap-2"><Ruler size={16} /> Distance</span>
                            <span className="font-mono">{flight.distance} km</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-text-muted flex items-center gap-2"><Mountain size={16} /> Max Alt</span>
                            <span className="font-mono">{flight.maxAltitude} m</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityDetail;
