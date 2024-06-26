import { DefaultBodyType, rest } from "msw";

import { Location, locations } from "./db";

interface LocationsResult {
  total_count: number;
  locations: Location[];
}

interface LocationsPathParams {
  page: string;
  location_name: string;
  robot_id: string;
  is_starred: string;
}

export const handlers = [
  rest.get<DefaultBodyType, LocationsPathParams, LocationsResult>(
    "/locations",
    (req, res, ctx) => {
      // console.log(req.url.searchParams.get("page"));
      const locationName = req.url.searchParams.get("location_name") || "";
      const robotId = req.url.searchParams.get("robot_id") || "";
      const is_starred = req.url.searchParams.get("is_starred") || false;

      // const starredIds: any[] = [];

      console.log(locations, locationName, robotId, is_starred);
      const resultLocations = locations.filter(
        (val) =>
          val.name.toLowerCase().includes(locationName.toLowerCase() || "") ||
          val.robot?.id.toLowerCase().includes(robotId.toLowerCase() || "")
      );

      // Please implement filtering feature here
      const result: LocationsResult = {
        total_count: resultLocations.length,
        locations: resultLocations,
      };

      return res(ctx.status(200), ctx.json(result));
    }
  ),

  rest.get("/starred_location_ids", (req, res, ctx) => {
    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]"
    );

    return res(
      ctx.status(200),
      ctx.json({
        location_ids,
      })
    );
  }),

  rest.put("/starred_location_ids", (req, res, ctx) => {
    if (!req.body) {
      return res(
        ctx.status(500),
        ctx.json({ error_msg: "Encountered unexpected error" })
      );
    }
    sessionStorage.setItem("starred_location_ids", JSON.stringify(req.body));

    return res(ctx.status(204));
  }),
];
