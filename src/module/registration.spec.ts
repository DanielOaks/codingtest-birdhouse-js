import { BhRegistrationRequests } from "./registration";
import { setupServer } from "msw/node";
import { rest } from "msw";

// data used in the responses/tests below

const registrationPageData = {
  items: [
    {
      value: "4336686c-ea77-46e6-ad72-fa38d8dacdeb",
      birdhouse: {
        ubidValue: "4336686c-ea77-46e6-ad72-fa38d8dacdeb",
        name: "George's Birdhouse",
        longitude: 5.46548,
        latitude: -30.8491,
        lastOccupationUpdate: "2022-08-26T21:48:18.000Z",
      },
    },
    {
      value: "75c0a167-ebdf-4654-95bb-ac44cda5f9ad",
      birdhouse: {
        ubidValue: "75c0a167-ebdf-4654-95bb-ac44cda5f9ad",
        name: "Kelly's Birdhouse",
        longitude: -46.1464,
        latitude: 180.4654,
        lastOccupationUpdate: "2022-10-05T21:48:25.000Z",
      },
    },
  ],
  meta: {
    totalItems: 4,
    itemCount: 2,
    itemsPerPage: 2,
    totalPages: 2,
    currentPage: 1,
  },
};

// msw setup

export const handlers = [
  rest.get("http://localhost/registration", (req, res, ctx) => {
    if (
      req.url.searchParams.get("page") === "1" &&
      req.url.searchParams.get("limit") === "2"
    ) {
      return res(ctx.json(registrationPageData));
    }
    return res(ctx.status(400));
  }),

  rest.get(
    "http://localhost/registration/4336686c-ea77-46e6-ad72-fa38d8dacdeb",
    (req, res, ctx) => {
      return res(ctx.json(registrationPageData.items[0]));
    },
  ),
];

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// test cases

test("basic pages request", async () => {
  const api = new BhRegistrationRequests({
    apiBase: "http://localhost/",
  });

  const res = await api.getRegistrationPage(1, 2);

  expect(res.meta).toEqual(registrationPageData.meta);
  expect(res.items).toEqual(registrationPageData.items);
});

test("basic registration request", async () => {
  const api = new BhRegistrationRequests({
    apiBase: "http://localhost/",
  });

  const res = await api.getRegistration(registrationPageData.items[0].value);

  expect(res).toEqual(registrationPageData.items[0]);
});
