import { BhOccupancyRequests, OccupancyState } from "./occupancy";
import { setupServer } from "msw/node";
import { rest } from "msw";

// data used in the responses/tests below

const occupancyPageData = {
  items: [
    {
      id: "3ee4cfab-dbbd-423a-bb94-4c46c538eb2e",
      eggs: 2,
      birds: 0,
      created_at: "2022-10-31T16:37:26.406Z",
    },
    {
      id: "a1e8be73-3783-46bb-9d71-97da1eb0c974",
      eggs: 2,
      birds: 1,
      created_at: "2022-10-30T07:03:42.406Z",
    },
    {
      id: "f27079fe-6708-4596-86b6-3f466480c3ed",
      eggs: 2,
      birds: 1,
      created_at: "2022-10-30T07:03:42.406Z",
    },
  ],
  meta: {
    totalItems: 20,
    itemCount: 3,
    itemsPerPage: 3,
    totalPages: 7,
    currentPage: 2,
  },
};

// msw setup

export const handlers = [
  rest.get(
    "http://localhost/house/e6aba016-ff46-4b7f-af3a-84a00c0e2e5f/occupancy",
    (req, res, ctx) => {
      if (
        req.url.searchParams.get("page") === "2" &&
        req.url.searchParams.get("limit") === "3"
      ) {
        return res(ctx.json(occupancyPageData));
      }
      return res(ctx.status(400));
    },
  ),
];

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// test cases

test("basic occupancy request", async () => {
  const api = new BhOccupancyRequests({
    apiBase: "http://localhost/",
  });

  const res = await api.getOccupancy(
    "e6aba016-ff46-4b7f-af3a-84a00c0e2e5f",
    2,
    3,
  );

  expect(res.meta).toEqual(occupancyPageData.meta);
  for (const [index, item] of res.items.entries()) {
    // we do this because the createdAt is a string in the request
    //  and a Date in the response
    const comparedItem: OccupancyState = {
      id: occupancyPageData.items[index].id,
      eggs: occupancyPageData.items[index].eggs,
      birds: occupancyPageData.items[index].birds,
      createdAt: new Date(occupancyPageData.items[index].created_at),
    };
    expect(item).toEqual(comparedItem);
  }
});
