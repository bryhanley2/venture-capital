// Public Second Layer Map — no auth token; the endpoint only returns
// publish-safe fields from the pipeline's "Second Layer Map" tab.

export interface MapCompany {
  name: string;
  blurb: string;
  stage: string;
  website: string;
}

export interface MapLayer {
  id: string;
  name: string;
  problem: string;
  order: number;
  companies: MapCompany[];
}

export interface SecondLayerMap {
  trend: string;
  trend_blurb: string;
  updated: string;
  layers: MapLayer[];
}

export async function getSecondLayerMap(): Promise<SecondLayerMap> {
  const r = await fetch('/api/second-layer-map');
  const j = await r.json();
  if (!r.ok) throw new Error(j.error || `map ${r.status}`);
  return j as SecondLayerMap;
}
