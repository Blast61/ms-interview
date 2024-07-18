export interface LoaderData{
    neighborhoods: NeighborhoodsData;
    tracts: TractsData;
}

export interface NeighborhoodFeature{
    type: 'Feature';
    properties: {
        id: number;
        shid: string;
        area: number;
        'pop-commute-drive_alone': number;
        'pop-commute-drive_carpool': number;
        'pop-commute-public_transit': number;
        'pop-commute-walk': number;

    }
    geometry: {
        type: 'Polygon';
        coordinates: number[][][];
    }
}

export interface TractFeature {
    type: 'Feature';
    properties: {
        id: number;
        shid: string;
        area: number;
        'pop-commute-drive_alone': number;
        'pop-commute-drive_carpool': number;
        'pop-commute-public_transit': number;
        'pop-commute-walk': number;
    };
    geometry: {
        type: 'Polygon';
        coordinates: number[][][];
    }
}

export interface TractsData {
    type: 'FeatureCollection';
    features: TractFeature[];
}

export interface NeighborhoodsData {
    type: 'FeatureCollection';
    features: NeighborhoodFeature[];
}